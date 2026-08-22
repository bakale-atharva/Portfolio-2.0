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
  TextInput,
  type SaveState,
} from "../ui";

type Stat = { label: string; value: string; progress: number };
type Badge = { label: string; value: string; emphasis: boolean };

type HeroFormState = {
  headlineLead: string;
  headlineAccent: string;
  headlineTrail: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  panel: {
    signal: string;
    roleLabel: string;
    roleStatus: string;
    stats: Stat[];
    badges: Badge[];
  };
};

function moveItem<T>(items: T[], from: number, to: number): T[] {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function toDraft(doc: Doc<"hero">): HeroFormState {
  return {
    headlineLead: doc.headlineLead,
    headlineAccent: doc.headlineAccent,
    headlineTrail: doc.headlineTrail,
    primaryCta: doc.primaryCta,
    secondaryCta: doc.secondaryCta,
    panel: doc.panel,
  };
}

export function HeroSection() {
  const doc = useQuery(api.admin.getHeroDoc);

  if (!doc) {
    return (
      <SectionCard title="Hero">
        <p className="text-sm text-muted">Loading…</p>
      </SectionCard>
    );
  }

  return <HeroForm key={doc._id} doc={doc} />;
}

function HeroForm({ doc }: { doc: Doc<"hero"> }) {
  const [form, setForm] = useState<HeroFormState>(() => toDraft(doc));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const upsertHero = useMutation(api.portfolio.upsertHero);

  async function handleSave() {
    setSaveState("saving");
    try {
      await upsertHero(form);
      await revalidatePortfolio();
      setSaveState("saved");
    } catch (error) {
      console.error(error);
      setSaveState("error");
    }
  }

  return (
    <SectionCard title="Hero" description="The headline, CTAs and the live-signal panel.">
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Headline lead">
          <TextInput
            value={form.headlineLead}
            onChange={(e) => setForm({ ...form, headlineLead: e.target.value })}
          />
        </Field>
        <Field label="Headline accent">
          <TextInput
            value={form.headlineAccent}
            onChange={(e) => setForm({ ...form, headlineAccent: e.target.value })}
          />
        </Field>
        <Field label="Headline trail">
          <TextInput
            value={form.headlineTrail}
            onChange={(e) => setForm({ ...form, headlineTrail: e.target.value })}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <fieldset className="flex flex-col gap-2 border border-hairline rounded-md p-3">
          <legend className="font-mono text-xs uppercase tracking-wider text-muted px-1">
            Primary CTA
          </legend>
          <TextInput
            placeholder="Label"
            value={form.primaryCta.label}
            onChange={(e) =>
              setForm({ ...form, primaryCta: { ...form.primaryCta, label: e.target.value } })
            }
          />
          <TextInput
            placeholder="Href"
            value={form.primaryCta.href}
            onChange={(e) =>
              setForm({ ...form, primaryCta: { ...form.primaryCta, href: e.target.value } })
            }
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2 border border-hairline rounded-md p-3">
          <legend className="font-mono text-xs uppercase tracking-wider text-muted px-1">
            Secondary CTA
          </legend>
          <TextInput
            placeholder="Label"
            value={form.secondaryCta.label}
            onChange={(e) =>
              setForm({
                ...form,
                secondaryCta: { ...form.secondaryCta, label: e.target.value },
              })
            }
          />
          <TextInput
            placeholder="Href"
            value={form.secondaryCta.href}
            onChange={(e) =>
              setForm({
                ...form,
                secondaryCta: { ...form.secondaryCta, href: e.target.value },
              })
            }
          />
        </fieldset>
      </div>

      <fieldset className="flex flex-col gap-3 border border-hairline rounded-md p-3">
        <legend className="font-mono text-xs uppercase tracking-wider text-muted px-1">
          Panel
        </legend>
        <div className="grid sm:grid-cols-3 gap-3">
          <TextInput
            placeholder="Signal"
            value={form.panel.signal}
            onChange={(e) =>
              setForm({ ...form, panel: { ...form.panel, signal: e.target.value } })
            }
          />
          <TextInput
            placeholder="Role label"
            value={form.panel.roleLabel}
            onChange={(e) =>
              setForm({ ...form, panel: { ...form.panel, roleLabel: e.target.value } })
            }
          />
          <TextInput
            placeholder="Role status"
            value={form.panel.roleStatus}
            onChange={(e) =>
              setForm({ ...form, panel: { ...form.panel, roleStatus: e.target.value } })
            }
          />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">Stats</p>
          {form.panel.stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              <TextInput
                placeholder="Label"
                value={stat.label}
                className="flex-1"
                onChange={(e) => {
                  const stats = [...form.panel.stats];
                  stats[i] = { ...stat, label: e.target.value };
                  setForm({ ...form, panel: { ...form.panel, stats } });
                }}
              />
              <TextInput
                placeholder="Value"
                value={stat.value}
                className="flex-1"
                onChange={(e) => {
                  const stats = [...form.panel.stats];
                  stats[i] = { ...stat, value: e.target.value };
                  setForm({ ...form, panel: { ...form.panel, stats } });
                }}
              />
              <TextInput
                type="number"
                placeholder="0-100"
                value={stat.progress}
                className="w-20"
                onChange={(e) => {
                  const stats = [...form.panel.stats];
                  stats[i] = { ...stat, progress: Number(e.target.value) };
                  setForm({ ...form, panel: { ...form.panel, stats } });
                }}
              />
              <ListRowControls
                canMoveUp={i > 0}
                canMoveDown={i < form.panel.stats.length - 1}
                onMoveUp={() =>
                  setForm({
                    ...form,
                    panel: { ...form.panel, stats: moveItem(form.panel.stats, i, i - 1) },
                  })
                }
                onMoveDown={() =>
                  setForm({
                    ...form,
                    panel: { ...form.panel, stats: moveItem(form.panel.stats, i, i + 1) },
                  })
                }
                onRemove={() =>
                  setForm({
                    ...form,
                    panel: {
                      ...form.panel,
                      stats: form.panel.stats.filter((_, j) => j !== i),
                    },
                  })
                }
              />
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                panel: {
                  ...form.panel,
                  stats: [...form.panel.stats, { label: "", value: "", progress: 0 }],
                },
              })
            }
          >
            Add stat
          </Button>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">Badges</p>
          {form.panel.badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <TextInput
                placeholder="Label"
                value={badge.label}
                className="flex-1"
                onChange={(e) => {
                  const badges = [...form.panel.badges];
                  badges[i] = { ...badge, label: e.target.value };
                  setForm({ ...form, panel: { ...form.panel, badges } });
                }}
              />
              <TextInput
                placeholder="Value"
                value={badge.value}
                className="flex-1"
                onChange={(e) => {
                  const badges = [...form.panel.badges];
                  badges[i] = { ...badge, value: e.target.value };
                  setForm({ ...form, panel: { ...form.panel, badges } });
                }}
              />
              <label className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted shrink-0">
                <input
                  type="checkbox"
                  checked={badge.emphasis}
                  onChange={(e) => {
                    const badges = [...form.panel.badges];
                    badges[i] = { ...badge, emphasis: e.target.checked };
                    setForm({ ...form, panel: { ...form.panel, badges } });
                  }}
                />
                Emphasis
              </label>
              <ListRowControls
                canMoveUp={i > 0}
                canMoveDown={i < form.panel.badges.length - 1}
                onMoveUp={() =>
                  setForm({
                    ...form,
                    panel: { ...form.panel, badges: moveItem(form.panel.badges, i, i - 1) },
                  })
                }
                onMoveDown={() =>
                  setForm({
                    ...form,
                    panel: { ...form.panel, badges: moveItem(form.panel.badges, i, i + 1) },
                  })
                }
                onRemove={() =>
                  setForm({
                    ...form,
                    panel: {
                      ...form.panel,
                      badges: form.panel.badges.filter((_, j) => j !== i),
                    },
                  })
                }
              />
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                panel: {
                  ...form.panel,
                  badges: [...form.panel.badges, { label: "", value: "", emphasis: false }],
                },
              })
            }
          >
            Add badge
          </Button>
        </div>
      </fieldset>

      <div className="flex items-center gap-3 pt-2 border-t border-hairline">
        <Button type="button" variant="primary" onClick={handleSave}>
          Save hero
        </Button>
        <SaveStatus state={saveState} />
      </div>
    </SectionCard>
  );
}
