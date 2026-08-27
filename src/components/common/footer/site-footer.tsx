// 📖 Docs: obsidian/frontend/components/common.md

/**
 * Site footer — the page's closing band, mounted outside `<main>`.
 *
 * The only dark surface on an otherwise white/mint page. It uses the existing
 * `action-primary` pair (brand green + white) rather than a new dark token, so
 * the closing block is a colour the palette already ships with a checked
 * contrast ratio (~5.9:1) instead of an invented one.
 *
 * Static markup on purpose: this is chrome, not content. A footer that reveals
 * itself on scroll keeps the page feeling unfinished at the very moment it
 * should settle, so there is no `<Inview>`/`<Spring>` wrapper here.
 *
 * Server Component — no state, no handlers, no browser API.
 */

import type { FooterContent } from "@/data/mocks/karriere";
import { siteConfig } from "@/lib/site";

export interface SiteFooterProps {
  content: FooterContent;
}

const { legal } = siteConfig;

/**
 * Not page copy, so it does not belong in `home.ts`: it is a screen-reader-only
 * affordance that exists because the legal links leave the site in a new tab.
 * Sighted users get no visible string from it.
 */
const NEW_TAB_HINT = "Öffnet in einem neuen Tab";

/**
 * `min-h-11` is the 44px touch target; the negative inline margin lets the
 * padded hit area sit flush with the column edge, so the links stay optically
 * left-aligned with the address above them. Hover repaints the plate in
 * `action-primary-border` — the same darker green the primary button uses,
 * which raises the white-on-green contrast rather than lowering it.
 */
const LINK_CLASSES =
  "-mx-3 inline-flex min-h-11 items-center rounded-panel px-3 leading-body font-light underline underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-primary-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary-foreground";

export const SiteFooter = ({ content }: SiteFooterProps) => (
  <footer className="bg-action-primary px-5 py-16 text-action-primary-foreground md:px-10 lg:py-20">
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-10 lg:gap-12">
      <div className="flex flex-col items-start gap-4">
        <p className="text-base leading-body font-medium">{legal.name}</p>

        <address className="text-base leading-body font-light not-italic">
          {legal.street}
          <br />
          {legal.postalCode} {legal.city}
        </address>

        <ul className="flex flex-col items-start gap-1 lg:flex-row lg:gap-8">
          <li>
            <a
              href={`tel:${legal.phone.replace(/\s+/g, "")}`}
              className={`${LINK_CLASSES} text-base`}
            >
              {legal.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${legal.email}`}
              className={`${LINK_CLASSES} text-base`}
            >
              {legal.email}
            </a>
          </li>
        </ul>
      </div>

      {/* Mandatory Meta advertising disclaimer — the wording is legally fixed
          and must stay verbatim. It is set back by size and measure only, never
          by fading the ink: dropping white to 80% on this green lands at 4.45:1
          and misses AA, so it keeps the full `action-primary-foreground`. */}
      <p className="max-w-[48rem] text-sm leading-body font-light">
        {content.disclaimer}
      </p>

      <div className="flex flex-col items-start gap-4 border-t border-action-primary-border pt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <p className="text-sm leading-body font-light">{content.legalLine}</p>

        <ul className="flex flex-col items-start gap-1 lg:flex-row lg:items-center lg:gap-8">
          {content.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${LINK_CLASSES} text-sm`}
              >
                {link.label}
                <span className="sr-only"> ({NEW_TAB_HINT})</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
