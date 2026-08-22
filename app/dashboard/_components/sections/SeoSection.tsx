"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { revalidatePortfolio } from "@/app/actions";
import { Button, Field, SaveStatus, SectionCard, TextArea, TextInput, type SaveState } from "../ui";

type SeoFormState = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
};

function toDraft(doc: Doc<"seo">): SeoFormState {
  return {
    title: doc.title,
    description: doc.description,
    canonicalUrl: doc.canonicalUrl,
    ogImage: doc.ogImage,
  };
}

export function SeoSection() {
  const doc = useQuery(api.admin.getSeoDoc);

  if (!doc) {
    return (
      <SectionCard title="SEO">
        <p className="text-sm text-muted">Loading…</p>
      </SectionCard>
    );
  }

  return <SeoForm key={doc._id} doc={doc} />;
}

function SeoForm({ doc }: { doc: Doc<"seo"> }) {
  const [form, setForm] = useState<SeoFormState>(() => toDraft(doc));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const upsertSeo = useMutation(api.portfolio.upsertSeo);

  async function handleSave() {
    setSaveState("saving");
    try {
      await upsertSeo(form);
      await revalidatePortfolio();
      setSaveState("saved");
    } catch (error) {
      console.error(error);
      setSaveState("error");
    }
  }

  return (
    <SectionCard
      title="SEO"
      description="Metadata title, description and canonical URL. Buying the real domain? Update canonicalUrl here — no redeploy needed."
    >
      <Field label="Title">
        <TextInput
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </Field>
      <Field label="Description">
        <TextArea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Canonical URL">
          <TextInput
            value={form.canonicalUrl}
            onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
          />
        </Field>
        <Field label="OG image path">
          <TextInput
            value={form.ogImage}
            onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
          />
        </Field>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-hairline">
        <Button type="button" variant="primary" onClick={handleSave}>
          Save SEO
        </Button>
        <SaveStatus state={saveState} />
      </div>
    </SectionCard>
  );
}
