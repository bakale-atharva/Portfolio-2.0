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
      className="flex flex-col gap-1.5 font-mono text-xs uppercase tracking-wider text-muted"
    >
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "font-sans normal-case tracking-normal text-sm bg-canvas border border-hairline rounded-md px-3 py-2 text-ink focus:outline-none focus:border-accent";

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
      "border border-hairline hover:bg-surface text-ink",
    primary: "bg-accent text-on-accent hover:bg-accent/90",
    danger:
      "border border-hairline text-ink hover:border-red-400 hover:text-red-500",
  };
  return (
    <button
      {...props}
      className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors disabled:opacity-40 disabled:pointer-events-none touch-target ${variants[variant]} ${className}`}
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
    <section className="border border-hairline rounded-lg bg-surface/60 p-5 space-y-4">
      <div>
        <h2 className="text-lg font-display font-bold">{title}</h2>
        {description && (
          <p className="text-xs text-muted mt-0.5">{description}</p>
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
  const color =
    state === "error" ? "text-red-500" : state === "saved" ? "text-accent" : "text-muted";
  return (
    <span className={`font-mono text-xs uppercase tracking-wider ${color}`}>
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
