"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { revalidatePortfolio } from "@/app/actions";
import {
  Button,
  ListRowControls,
  SaveStatus,
  SectionCard,
  TextArea,
  TextInput,
  type SaveState,
} from "../ui";

type Draft = { category: string; skills: string[] };

export function SkillGroupsSection() {
  const rows = useQuery(api.admin.listSkillGroupsAdmin);
  const createSkillGroup = useMutation(api.portfolio.createSkillGroup);
  const reorderSkillGroups = useMutation(api.portfolio.reorderSkillGroups);

  if (!rows) {
    return (
      <SectionCard title="Skill groups">
        <p className="text-sm text-muted">Loading…</p>
      </SectionCard>
    );
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (!rows || target < 0 || target >= rows.length) return;
    const orderedIds = rows.map((r) => r._id);
    [orderedIds[index], orderedIds[target]] = [orderedIds[target], orderedIds[index]];
    await reorderSkillGroups({ orderedIds });
    await revalidatePortfolio();
  }

  return (
    <SectionCard title="Skill groups" description="Categorized skill chips.">
      <div className="space-y-3">
        {rows.map((row, i) => (
          <SkillGroupRow
            key={row._id}
            row={row}
            canMoveUp={i > 0}
            canMoveDown={i < rows.length - 1}
            onMoveUp={() => move(i, -1)}
            onMoveDown={() => move(i, 1)}
          />
        ))}
      </div>
      <Button type="button" onClick={() => createSkillGroup({ category: "", skills: [] })}>
        Add skill group
      </Button>
    </SectionCard>
  );
}

function SkillGroupRow({
  row,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: {
  row: Doc<"skillGroups">;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [draft, setDraft] = useState<Draft>(() => ({
    category: row.category,
    skills: row.skills,
  }));
  const [state, setState] = useState<SaveState>("idle");
  const updateSkillGroup = useMutation(api.portfolio.updateSkillGroup);
  const removeSkillGroup = useMutation(api.portfolio.removeSkillGroup);

  async function save() {
    setState("saving");
    try {
      const skills = draft.skills.map((s) => s.trim()).filter((s) => s.length > 0);
      await updateSkillGroup({ id: row._id, category: draft.category, skills });
      await revalidatePortfolio();
      setState("saved");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  async function remove() {
    await removeSkillGroup({ id: row._id });
    await revalidatePortfolio();
  }

  return (
    <div className="flex items-start gap-2 border border-hairline rounded-md p-3">
      <div className="flex-1 space-y-2">
        <TextInput
          placeholder="Category"
          value={draft.category}
          onChange={(e) => {
            setDraft({ ...draft, category: e.target.value });
            setState("idle");
          }}
        />
        <TextArea
          placeholder="Skills, one per line"
          value={draft.skills.join("\n")}
          onChange={(e) => {
            setDraft({ ...draft, skills: e.target.value.split("\n") });
            setState("idle");
          }}
        />
        <div className="flex items-center gap-3">
          <Button type="button" onClick={save}>
            Save
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
