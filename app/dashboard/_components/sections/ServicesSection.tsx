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

type Draft = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  ctaText: string;
};

function toDraft(row: Doc<"services">): Draft {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    deliverables: row.deliverables,
    ctaText: row.ctaText,
  };
}

export function ServicesSection() {
  const rows = useQuery(api.admin.listServicesAdmin);
  const createService = useMutation(api.portfolio.createService);
  const reorderServices = useMutation(api.portfolio.reorderServices);

  if (!rows) {
    return (
      <SectionCard title="Services">
        <p className="text-sm text-muted">Loading…</p>
      </SectionCard>
    );
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (!rows || target < 0 || target >= rows.length) return;
    const orderedIds = rows.map((r) => r._id);
    [orderedIds[index], orderedIds[target]] = [orderedIds[target], orderedIds[index]];
    await reorderServices({ orderedIds });
    await revalidatePortfolio();
  }

  return (
    <SectionCard title="Services" description="Service offering cards.">
      <div className="space-y-4">
        {rows.map((row, i) => (
          <ServiceRow
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
          createService({
            id: String(rows.length + 1).padStart(2, "0"),
            title: "",
            description: "",
            deliverables: [],
            ctaText: "",
          })
        }
      >
        Add service
      </Button>
    </SectionCard>
  );
}

function ServiceRow({
  row,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: {
  row: Doc<"services">;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [draft, setDraft] = useState<Draft>(() => toDraft(row));
  const [state, setState] = useState<SaveState>("idle");
  const updateService = useMutation(api.portfolio.updateService);
  const removeService = useMutation(api.portfolio.removeService);

  function patch(fields: Partial<Draft>) {
    setDraft({ ...draft, ...fields });
    setState("idle");
  }

  async function save() {
    setState("saving");
    try {
      const deliverables = draft.deliverables
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      await updateService({ docId: row._id, ...draft, deliverables });
      await revalidatePortfolio();
      setState("saved");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  async function remove() {
    await removeService({ docId: row._id });
    await revalidatePortfolio();
  }

  return (
    <div className="flex items-start gap-2 border border-hairline rounded-md p-3">
      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <TextInput
            placeholder="ID (e.g. 01)"
            value={draft.id}
            className="w-20"
            onChange={(e) => patch({ id: e.target.value })}
          />
          <TextInput
            placeholder="Title"
            value={draft.title}
            className="flex-1"
            onChange={(e) => patch({ title: e.target.value })}
          />
        </div>
        <TextArea
          placeholder="Description"
          value={draft.description}
          onChange={(e) => patch({ description: e.target.value })}
        />
        <TextArea
          placeholder="Deliverables, one per line"
          value={draft.deliverables.join("\n")}
          onChange={(e) => patch({ deliverables: e.target.value.split("\n") })}
        />
        <TextInput
          placeholder="CTA text"
          value={draft.ctaText}
          onChange={(e) => patch({ ctaText: e.target.value })}
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
