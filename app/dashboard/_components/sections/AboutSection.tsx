"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { revalidatePortfolio } from "@/app/actions";
import {
  Button,
  Field,
  ListRowControls,
  SaveStatus,
  SectionCard,
  TextArea,
  TextInput,
  type SaveState,
} from "../ui";

type Strength = { title: string; description: string };

type AboutFormState = {
  sectionLabel: string;
  heading: string;
  intro: string;
  cardHeading: string;
  philosophyLabel: string;
  philosophy: string;
  strengthsLabel: string;
  strengths: Strength[];
  statusLabel: string;
  availabilityNote: string;
  resumeCtaLabel: string;
  resumeNote: string;
};

function moveItem<T>(items: T[], from: number, to: number): T[] {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function toDraft(doc: Doc<"about">): AboutFormState {
  return {
    sectionLabel: doc.sectionLabel,
    heading: doc.heading,
    intro: doc.intro,
    cardHeading: doc.cardHeading,
    philosophyLabel: doc.philosophyLabel,
    philosophy: doc.philosophy,
    strengthsLabel: doc.strengthsLabel,
    strengths: doc.strengths,
    statusLabel: doc.statusLabel,
    availabilityNote: doc.availabilityNote,
    resumeCtaLabel: doc.resumeCtaLabel,
    resumeNote: doc.resumeNote,
  };
}

export function AboutSection() {
  const doc = useQuery(api.admin.getAboutDoc);

  if (!doc) {
    return (
      <SectionCard title="About">
        <p className="text-sm text-muted">Loading…</p>
      </SectionCard>
    );
  }

  return <AboutForm key={doc._id} doc={doc} />;
}

function AboutForm({ doc }: { doc: Doc<"about"> }) {
  const [form, setForm] = useState<AboutFormState>(() => toDraft(doc));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const upsertAbout = useMutation(api.portfolio.upsertAbout);

  async function handleSave() {
    setSaveState("saving");
    try {
      await upsertAbout(form);
      await revalidatePortfolio();
      setSaveState("saved");
    } catch (error) {
      console.error(error);
      setSaveState("error");
    }
  }

  return (
    <SectionCard title="About" description="The assessment section and engineering strengths.">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Section label">
          <TextInput
            value={form.sectionLabel}
            onChange={(e) => setForm({ ...form, sectionLabel: e.target.value })}
          />
        </Field>
        <Field label="Heading">
          <TextInput
            value={form.heading}
            onChange={(e) => setForm({ ...form, heading: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Intro">
        <TextArea
          value={form.intro}
          onChange={(e) => setForm({ ...form, intro: e.target.value })}
        />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Card heading">
          <TextInput
            value={form.cardHeading}
            onChange={(e) => setForm({ ...form, cardHeading: e.target.value })}
          />
        </Field>
        <Field label="Philosophy label">
          <TextInput
            value={form.philosophyLabel}
            onChange={(e) => setForm({ ...form, philosophyLabel: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Philosophy">
        <TextArea
          value={form.philosophy}
          onChange={(e) => setForm({ ...form, philosophy: e.target.value })}
        />
      </Field>

      <fieldset className="flex flex-col gap-3 border border-hairline rounded-md p-3">
        <legend className="font-mono text-xs uppercase tracking-wider text-muted px-1">
          Strengths
        </legend>
        <TextInput
          placeholder="Strengths label"
          value={form.strengthsLabel}
          onChange={(e) => setForm({ ...form, strengthsLabel: e.target.value })}
        />
        {form.strengths.map((strength, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <TextInput
                placeholder="Title"
                value={strength.title}
                onChange={(e) => {
                  const strengths = [...form.strengths];
                  strengths[i] = { ...strength, title: e.target.value };
                  setForm({ ...form, strengths });
                }}
              />
              <TextArea
                placeholder="Description"
                value={strength.description}
                onChange={(e) => {
                  const strengths = [...form.strengths];
                  strengths[i] = { ...strength, description: e.target.value };
                  setForm({ ...form, strengths });
                }}
              />
            </div>
            <ListRowControls
              canMoveUp={i > 0}
              canMoveDown={i < form.strengths.length - 1}
              onMoveUp={() => setForm({ ...form, strengths: moveItem(form.strengths, i, i - 1) })}
              onMoveDown={() =>
                setForm({ ...form, strengths: moveItem(form.strengths, i, i + 1) })
              }
              onRemove={() =>
                setForm({ ...form, strengths: form.strengths.filter((_, j) => j !== i) })
              }
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              strengths: [...form.strengths, { title: "", description: "" }],
            })
          }
        >
          Add strength
        </Button>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Status label">
          <TextInput
            value={form.statusLabel}
            onChange={(e) => setForm({ ...form, statusLabel: e.target.value })}
          />
        </Field>
        <Field label="Resume CTA label">
          <TextInput
            value={form.resumeCtaLabel}
            onChange={(e) => setForm({ ...form, resumeCtaLabel: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Availability note">
        <TextArea
          value={form.availabilityNote}
          onChange={(e) => setForm({ ...form, availabilityNote: e.target.value })}
        />
      </Field>
      <Field label="Résumé note">
        <TextInput
          value={form.resumeNote}
          onChange={(e) => setForm({ ...form, resumeNote: e.target.value })}
        />
      </Field>

      <div className="flex items-center gap-3 pt-2 border-t border-hairline">
        <Button type="button" variant="primary" onClick={handleSave}>
          Save about
        </Button>
        <SaveStatus state={saveState} />
      </div>
    </SectionCard>
  );
}
