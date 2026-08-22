"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { revalidatePortfolio } from "@/app/actions";
import { useFileUpload } from "../useFileUpload";
import {
  Button,
  ListRowControls,
  SaveStatus,
  SectionCard,
  TextInput,
  type SaveState,
} from "../ui";

type Draft = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  layout: "standard" | "showcase";
};

function toDraft(row: Doc<"projects">): Draft {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    role: row.role,
    year: row.year,
    technologies: row.technologies,
    image: row.image,
    liveUrl: row.liveUrl,
    githubUrl: row.githubUrl ?? "",
    layout: row.layout,
  };
}

export function ProjectsSection() {
  const rows = useQuery(api.admin.listProjectsAdmin);
  const createProject = useMutation(api.portfolio.createProject);
  const reorderProjects = useMutation(api.portfolio.reorderProjects);

  if (!rows) {
    return (
      <SectionCard title="Projects">
        <p className="text-sm text-muted">Loading…</p>
      </SectionCard>
    );
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (!rows || target < 0 || target >= rows.length) return;
    const orderedIds = rows.map((r) => r._id);
    [orderedIds[index], orderedIds[target]] = [orderedIds[target], orderedIds[index]];
    await reorderProjects({ orderedIds });
    await revalidatePortfolio();
  }

  return (
    <SectionCard
      title="Projects"
      description="New projects start unpublished — stage them, then publish when ready."
    >
      <div className="space-y-4">
        {rows.map((row, i) => (
          <ProjectRow
            key={row._id}
            row={row}
            canMoveUp={i > 0}
            canMoveDown={i < rows.length - 1}
            onMoveUp={() => move(i, -1)}
            onMoveDown={() => move(i, 1)}
          />
        ))}
      </div>
      <Button
        type="button"
        onClick={() =>
          createProject({
            slug: `project-${rows.length + 1}`,
            title: "",
            summary: "",
            role: "",
            year: String(new Date().getFullYear()),
            technologies: [],
            image: "",
            liveUrl: "",
            githubUrl: null,
            layout: "standard",
          })
        }
      >
        Add project
      </Button>
    </SectionCard>
  );
}

function ProjectRow({
  row,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: {
  row: Doc<"projects">;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [draft, setDraft] = useState<Draft>(() => toDraft(row));
  const [state, setState] = useState<SaveState>("idle");
  const [imageState, setImageState] = useState<SaveState>("idle");

  const updateProject = useMutation(api.portfolio.updateProject);
  const removeProject = useMutation(api.portfolio.removeProject);
  const setProjectPublished = useMutation(api.portfolio.setProjectPublished);
  const setProjectImageStorageId = useMutation(api.portfolio.setProjectImageStorageId);
  const uploadFile = useFileUpload();

  function patch(fields: Partial<Draft>) {
    setDraft({ ...draft, ...fields });
    setState("idle");
  }

  async function save() {
    setState("saving");
    try {
      const technologies = draft.technologies
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
      await updateProject({
        id: row._id,
        ...draft,
        technologies,
        githubUrl: draft.githubUrl.trim() || null,
      });
      await revalidatePortfolio();
      setState("saved");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  async function remove() {
    await removeProject({ id: row._id });
    await revalidatePortfolio();
  }

  async function togglePublished() {
    await setProjectPublished({ id: row._id, published: !row.published });
    await revalidatePortfolio();
  }

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setImageState("saving");
    try {
      const storageId = await uploadFile(file);
      await setProjectImageStorageId({ id: row._id, storageId });
      await revalidatePortfolio();
      setImageState("saved");
    } catch (error) {
      console.error(error);
      setImageState("error");
    }
  }

  return (
    <div className="flex items-start gap-2 border border-hairline rounded-md p-3">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            type="button"
            variant={row.published ? "primary" : "default"}
            onClick={togglePublished}
          >
            {row.published ? "Published" : "Unpublished"}
          </Button>
          <TextInput
            placeholder="Slug"
            value={draft.slug}
            className="w-40"
            onChange={(e) => patch({ slug: e.target.value })}
          />
          <TextInput
            placeholder="Year"
            value={draft.year}
            className="w-20"
            onChange={(e) => patch({ year: e.target.value })}
          />
          <select
            value={draft.layout}
            onChange={(e) => patch({ layout: e.target.value as "standard" | "showcase" })}
            className="font-sans text-sm bg-canvas border border-hairline rounded-md px-2 py-2 text-ink"
          >
            <option value="standard">Standard</option>
            <option value="showcase">Showcase</option>
          </select>
        </div>
        <TextInput
          placeholder="Title"
          value={draft.title}
          onChange={(e) => patch({ title: e.target.value })}
        />
        <TextInput
          placeholder="Summary"
          value={draft.summary}
          onChange={(e) => patch({ summary: e.target.value })}
        />
        <div className="flex gap-2">
          <TextInput
            placeholder="Role"
            value={draft.role}
            className="flex-1"
            onChange={(e) => patch({ role: e.target.value })}
          />
          <TextInput
            placeholder="Technologies, comma-separated"
            value={draft.technologies.join(", ")}
            className="flex-1"
            onChange={(e) => patch({ technologies: e.target.value.split(",") })}
          />
        </div>
        <div className="flex gap-2">
          <TextInput
            placeholder="Live URL"
            value={draft.liveUrl}
            className="flex-1"
            onChange={(e) => patch({ liveUrl: e.target.value })}
          />
          <TextInput
            placeholder="GitHub URL (optional)"
            value={draft.githubUrl}
            className="flex-1"
            onChange={(e) => patch({ githubUrl: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element -- storage/public-path preview, dimensions unknown */}
          <img
            src={draft.image}
            alt=""
            className="h-12 w-16 object-cover rounded border border-hairline bg-canvas"
          />
          <label>
            <Button type="button" className="cursor-pointer">
              Upload image
            </Button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <SaveStatus state={imageState} />
        </div>

        <div className="flex items-center gap-3">
          <Button type="button" variant="primary" onClick={save}>
            Save project
          </Button>
          <SaveStatus state={state} />
        </div>
      </div>
      <ListRowControls
        canMoveUp={canMoveUp}
        canMoveDown={canMoveDown}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onRemove={remove}
      />
    </div>
  );
}
