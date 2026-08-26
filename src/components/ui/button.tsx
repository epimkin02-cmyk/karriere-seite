// 📖 Docs: obsidian/frontend/components/ui.md

/**
 * Pill action — the design's only button shape.
 *
 * Figma nodes `1546:199` (primary), `1546:201` (secondary) and `1572:533`
 * (primary with the trailing arrow disc). Renders a real `<a>` when `href` is
 * given and a real `<button>` otherwise, so the element always matches what it
 * does ([[html-semantics]]).
 */

import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowUpRightIcon } from "@/components/ui/icons";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  /** Renders an `<a>`; omit for a `<button>`. */
  href?: string;
  /** Trailing arrow disc, as on the header's "Contact Us". */
  withArrow?: boolean;
  /** Only meaningful without `href`. */
  type?: "button" | "submit";
  /** Only meaningful without `href` — a link does not take a click handler. */
  onClick?: () => void;
  className?: string;
}

/**
 * The template pinned this at `text-xl` and `whitespace-nowrap` because the
 * mockup's labels were two short English words ("Book a visit"). This page's
 * one action reads "Jetzt Schnellbewerbung starten" — 30 characters that at
 * 20px plus the 64px of horizontal padding measure wider than a 390px phone,
 * so the label rendered *outside* its own pill on every small screen.
 *
 * Below `lg` the label therefore drops to `text-base`, the padding tightens,
 * and wrapping is allowed with the height going auto (the `min-h-12` keeps the
 * touch target at 48px either way). From `lg` up, the Figma geometry is
 * restored exactly — nowrap, 20px, 48px tall.
 */
const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-action border text-center text-base leading-body font-light whitespace-normal transition-colors duration-[var(--duration-fast)] ease-entrance lg:text-xl lg:whitespace-nowrap";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-action-primary border-action-primary-border text-action-primary-foreground hover:bg-action-primary-border",
  secondary:
    "bg-action-secondary border-action-secondary-border text-action-secondary-foreground hover:bg-action-secondary-border",
};

// Heights come straight from the mockup's frames — 48 for a plain pill
// (`1546:199`), 54 for the arrow variant (`1572:533`), where the 48px disc sits
// with only 3px either side. Driving height by padding instead lands at 80 and
// throws the header off by half its height.
const SIZE_CLASSES = {
  plain: "min-h-12 px-6 py-3 lg:h-12 lg:px-8 lg:py-0",
  arrow: "min-h-[3.375rem] gap-2.5 py-1.5 pr-1.5 pl-6 lg:h-[3.375rem] lg:py-0 lg:pr-0.5 lg:pl-8",
};

export const Button = ({
  children,
  variant = "primary",
  href,
  withArrow = false,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) => {
  const classes = [
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    withArrow ? SIZE_CLASSES.arrow : SIZE_CLASSES.plain,
    className,
  ].join(" ");

  const content = (
    <>
      <span className="text-trim">{children}</span>
      {withArrow && (
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-action-secondary text-action-secondary-foreground">
          <ArrowUpRightIcon className="size-4" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
};
