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
  TextInput,
  type SaveState,
} from "../ui";

type Draft = { name: string; url: string };

export function SocialLinksSection() {
  const rows = useQuery(api.admin.listSocialLinksAdmin);
  const createSocialLink = useMutation(api.portfolio.createSocialLink);
  const reorderSocialLinks = useMutation(api.portfolio.reorderSocialLinks);

  if (!rows) {
    return (
      <SectionCard title="Social links">
        <p className="text-sm text-muted">Loading…</p>
      </SectionCard>
    );
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (!rows || target < 0 || target >= rows.length) return;
    const orderedIds = rows.map((r) => r._id);
    [orderedIds[index], orderedIds[target]] = [orderedIds[target], orderedIds[index]];
    await reorderSocialLinks({ orderedIds });
    await revalidatePortfolio();
  }

  return (
    <SectionCard title="Social links" description="Contact section links.">
      <div className="space-y-3">
        {rows.map((row, i) => (
          <SocialLinkRow
            key={row._id}
            row={row}
            canMoveUp={i > 0}
            canMoveDown={i < rows.length - 1}
            onMoveUp={() => move(i, -1)}
            onMoveDown={() => move(i, 1)}
          />
        ))}
      </div>
      <Button type="button" onClick={() => createSocialLink({ name: "", url: "" })}>
        Add social link
      </Button>
    </SectionCard>
  );
}

function SocialLinkRow({
  row,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: {
  row: Doc<"socialLinks">;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [draft, setDraft] = useState<Draft>(() => ({ name: row.name, url: row.url }));
  const [state, setState] = useState<SaveState>("idle");
  const updateSocialLink = useMutation(api.portfolio.updateSocialLink);
  const removeSocialLink = useMutation(api.portfolio.removeSocialLink);

  async function save() {
    setState("saving");
    try {
      await updateSocialLink({ id: row._id, ...draft });
      await revalidatePortfolio();
      setState("saved");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  async function remove() {
    await removeSocialLink({ id: row._id });
    await revalidatePortfolio();
  }

  return (
    <div className="flex items-center gap-2">
      <TextInput
        placeholder="Name"
        value={draft.name}
        className="w-32"
        onChange={(e) => {
          setDraft({ ...draft, name: e.target.value });
          setState("idle");
        }}
      />
      <TextInput
        placeholder="URL"
        value={draft.url}
        className="flex-1"
        onChange={(e) => {
          setDraft({ ...draft, url: e.target.value });
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
