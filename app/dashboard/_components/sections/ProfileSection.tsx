"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { revalidatePortfolio } from "@/app/actions";
import { useFileUpload } from "../useFileUpload";
import {
  Button,
  Field,
  SaveStatus,
  SectionCard,
  TextArea,
  TextInput,
  type SaveState,
} from "../ui";

type ProfileFormState = {
  name: string;
  monogram: string;
  role: string;
  tagline: string;
  bio: string;
  availability: string;
  location: string;
  email: string;
  resumeUrl: string;
};

function toDraft(doc: Doc<"profile">): ProfileFormState {
  return {
    name: doc.name,
    monogram: doc.monogram,
    role: doc.role,
    tagline: doc.tagline,
    bio: doc.bio,
    availability: doc.availability,
    location: doc.location,
    email: doc.email,
    resumeUrl: doc.resumeUrl,
  };
}

export function ProfileSection() {
  const doc = useQuery(api.admin.getProfileDoc);

  if (!doc) {
    return (
      <SectionCard title="Profile">
        <p className="text-sm text-muted">Loading…</p>
      </SectionCard>
    );
  }

  // Keyed by _id so the form's local state initializes fresh only when the
  // underlying document identity changes (never, for a singleton) — not on
  // every reactive update, which would otherwise clobber in-progress edits.
  return <ProfileForm key={doc._id} doc={doc} />;
}

function ProfileForm({ doc }: { doc: Doc<"profile"> }) {
  const [form, setForm] = useState<ProfileFormState>(() => toDraft(doc));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [resumeState, setResumeState] = useState<SaveState>("idle");

  const upsertProfile = useMutation(api.portfolio.upsertProfile);
  const setResumeStorageId = useMutation(api.portfolio.setProfileResumeStorageId);
  const uploadFile = useFileUpload();

  const isAvailable = form.availability.toLowerCase().startsWith("available");

  async function handleSave() {
    setSaveState("saving");
    try {
      await upsertProfile(form);
      await revalidatePortfolio();
      setSaveState("saved");
    } catch (error) {
      console.error(error);
      setSaveState("error");
    }
  }

  async function handleResumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setResumeState("saving");
    try {
      const storageId = await uploadFile(file);
      await setResumeStorageId({ storageId });
      await revalidatePortfolio();
      setResumeState("saved");
    } catch (error) {
      console.error(error);
      setResumeState("error");
    }
  }

  return (
    <SectionCard title="Profile" description="Identity, tagline, contact and résumé.">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name">
          <TextInput
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field label="Monogram">
          <TextInput
            value={form.monogram}
            onChange={(e) => setForm({ ...form, monogram: e.target.value })}
          />
        </Field>
        <Field label="Role">
          <TextInput
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
        </Field>
        <Field label="Location">
          <TextInput
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </Field>
        <Field label="Email">
          <TextInput
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>
        <Field label="Availability">
          <Button
            type="button"
            variant={isAvailable ? "primary" : "default"}
            onClick={() =>
              setForm({
                ...form,
                availability: isAvailable ? "Not available" : "Available",
              })
            }
            className="w-fit"
          >
            {form.availability}
          </Button>
        </Field>
      </div>
      <Field label="Tagline">
        <TextInput
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
        />
      </Field>
      <Field label="Bio">
        <TextArea
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
      </Field>

      <Field label="Résumé">
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={doc.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display normal-case tracking-normal text-sm text-ink underline decoration-2 underline-offset-4"
          >
            View current résumé
          </a>
          <label>
            <Button type="button" variant="default" className="cursor-pointer">
              <span>Upload PDF</span>
            </Button>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleResumeChange}
            />
          </label>
          <SaveStatus state={resumeState} />
        </div>
      </Field>

      <div className="flex items-center gap-3 pt-2 border-t border-hairline">
        <Button type="button" variant="primary" onClick={handleSave}>
          Save profile
        </Button>
        <SaveStatus state={saveState} />
      </div>
    </SectionCard>
  );
}
