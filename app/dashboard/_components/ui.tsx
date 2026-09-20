"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex flex-col gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-ink"
    >
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "font-display normal-case font-normal tracking-normal text-sm bg-surface border-2 border-ink px-3 py-2 text-ink placeholder:text-muted focus-visible:bg-canvas";

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={`${inputClass} resize-y min-h-20 ${props.className ?? ""}`}
    />
  );
}

export function Button({
  variant = "default",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "danger";
}) {
  const variants = {
    default:
      "border-2 border-ink bg-canvas text-ink hover:bg-accent hover:text-on-accent",
    primary:
      "border-2 border-ink bg-accent text-on-accent hover:bg-ink hover:text-canvas",
    danger:
      "border-2 border-ink bg-canvas text-ink hover:bg-danger hover:text-canvas hover:border-danger",
  };
  return (
    <button
      {...props}
      className={`font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5 transition-colors disabled:opacity-40 disabled:pointer-events-none touch-target ${variants[variant]} ${className}`}
    />
  );
}

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-2 border-ink bg-surface p-5 space-y-4">
      <div className="border-b-2 border-ink pb-3">
        <h2 className="text-xl font-display font-black uppercase tracking-[-0.02em]">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted mt-1">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export type SaveState = "idle" | "saving" | "saved" | "error";

export function SaveStatus({ state }: { state: SaveState }) {
  if (state === "idle") return null;
  const label =
    state === "saving" ? "Saving…" : state === "saved" ? "Saved" : "Failed to save";
  // Yellow is a fill in this system, never text: "saved" gets a yellow chip.
  const tone =
    state === "error"
      ? "text-danger"
      : state === "saved"
        ? "bg-accent text-on-accent border-2 border-ink px-2 py-0.5"
        : "text-muted";
  return (
    <span
      role="status"
      className={`font-mono text-xs font-bold uppercase tracking-wider ${tone}`}
    >
      {label}
    </span>
  );
}

/** Up/down/delete controls for one row in an ordered list — keyboard-reachable, no drag required. */
export function ListRowControls({
  onMoveUp,
  onMoveDown,
  onRemove,
  canMoveUp,
  canMoveDown,
}: {
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <Button
        type="button"
        aria-label="Move up"
        onClick={onMoveUp}
        disabled={!canMoveUp}
        className="!px-2"
      >
        ↑
      </Button>
      <Button
        type="button"
        aria-label="Move down"
        onClick={onMoveDown}
        disabled={!canMoveDown}
        className="!px-2"
      >
        ↓
      </Button>
      <Button
        type="button"
        variant="danger"
        aria-label="Remove"
        onClick={onRemove}
        className="!px-2"
      >
        ✕
      </Button>
    </div>
  );
}
