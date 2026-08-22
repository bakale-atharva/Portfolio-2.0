"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { revalidatePortfolio } from "@/app/actions";
import {
  Button,
  ListRowControls,
  SaveStatus,
  SectionCard,
  TextInput,
  type SaveState,
} from "../ui";

type Draft = { value: string; label: string; description: string };

export function MetricsSection() {
  const rows = useQuery(api.admin.listMetricsAdmin);
  const createMetric = useMutation(api.portfolio.createMetric);
  const reorderMetrics = useMutation(api.portfolio.reorderMetrics);

  if (!rows) {
    return (
      <SectionCard title="Metrics">
        <p className="text-sm text-muted">Loading…</p>
      </SectionCard>
    );
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (!rows || target < 0 || target >= rows.length) return;
    const orderedIds = rows.map((r) => r._id);
    [orderedIds[index], orderedIds[target]] = [orderedIds[target], orderedIds[index]];
    await reorderMetrics({ orderedIds });
    await revalidatePortfolio();
  }

  return (
    <SectionCard title="Metrics" description="The proof-rail stat tiles.">
      <div className="space-y-3">
        {rows.map((row, i) => (
          <MetricRow
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
        onClick={() => createMetric({ value: "", label: "", description: "" })}
      >
        Add metric
      </Button>
    </SectionCard>
  );
}

function MetricRow({
  row,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: {
  row: Doc<"metrics">;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [draft, setDraft] = useState<Draft>(() => ({
    value: row.value,
    label: row.label,
    description: row.description,
  }));
  const [state, setState] = useState<SaveState>("idle");
  const updateMetric = useMutation(api.portfolio.updateMetric);
  const removeMetric = useMutation(api.portfolio.removeMetric);

  async function save() {
    setState("saving");
    try {
      await updateMetric({ id: row._id, ...draft });
      await revalidatePortfolio();
      setState("saved");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  async function remove() {
    await removeMetric({ id: row._id });
    await revalidatePortfolio();
  }

  return (
    <div className="flex items-center gap-2">
      <TextInput
        placeholder="Value"
        value={draft.value}
        className="w-24"
        onChange={(e) => {
          setDraft({ ...draft, value: e.target.value });
          setState("idle");
        }}
      />
      <TextInput
        placeholder="Label"
        value={draft.label}
        className="flex-1"
        onChange={(e) => {
          setDraft({ ...draft, label: e.target.value });
          setState("idle");
        }}
      />
      <TextInput
        placeholder="Description"
        value={draft.description}
        className="flex-1"
        onChange={(e) => {
          setDraft({ ...draft, description: e.target.value });
          setState("idle");
        }}
      />
      <Button type="button" onClick={save}>
        Save
      </Button>
      <SaveStatus state={state} />
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
