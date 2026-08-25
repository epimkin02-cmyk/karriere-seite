import { SiteFooter } from "@/components/common/footer/site-footer";
import { SiteHeader } from "@/components/common/header/site-header";
import {
  ABOUT_CONTENT,
  BRAND_NAME,
  CONTACT_CONTENT,
  FOOTER_CONTENT,
  HEADER_CTA,
  HERO_CONTENT,
  JOBS_CONTENT,
  LOCATION_CONTENT,
  PROCESS_CONTENT,
  REASONS_CONTENT,
  ROLE_CONTENT,
  SERVICE_CARDS,
  SERVICES_INTRO,
  SITE_NAV,
  TESTIMONIAL_CONTENT,
  WHY_CONTENT,
} from "@/data/mocks/home";

import { siteConfig } from "@/lib/site";

import { About } from "./sections/about";
import { Ablauf } from "./sections/ablauf";
import { Aufgaben } from "./sections/aufgaben";
import { Bewerbung } from "./sections/bewerbung";
import { Gruende } from "./sections/gruende";
import { Hero } from "./sections/hero";
import { Services } from "./sections/services";
import { Standort } from "./sections/standort";
import { Stellen } from "./sections/stellen";
import { Stimmen } from "./sections/stimmen";
import { WhyDantora } from "./sections/why-dantora";

/**
 * Home view — a Server Component assembling the careers page.
 *
 * Every section takes its copy through props from `src/data/mocks/home.ts`, so
 * no component contains text. The order follows the original funnel's argument
 * rather than the template's: what the job offers, who the firm is, which
 * positions are open, what the work actually involves, who already works there,
 * where it is, the full list of benefits, how applying works, and then the form.
 *
 * ONE overlay reveal survives from the template, and it is a matched pair: the
 * Services runway pins for four viewports while its cards scrub sideways, and
 * About rides up over it via `-mt-[100lvh]`. Disabling either one alone drags
 * About over the wrong block — see obsidian pitfall #6.
 *
 * The template's second overlay (a sticky Team panel with Contact riding over
 * it) was deliberately dismantled. It made the order of everything after Team
 * fragile — any section inserted between them scrolls *under* the sticky panel
 * unless it carries its own background and z-index — and it bought a transition
 * that barely reads on a phone, which is where 90% of this page's traffic is.
 */
export const HomeView = () => {
  return (
    <>
      <SiteHeader brandName={BRAND_NAME} navLinks={SITE_NAV} cta={HEADER_CTA} />
      <main id="main">
        <Hero content={HERO_CONTENT} />
        <WhyDantora content={WHY_CONTENT} />
        <Services intro={SERVICES_INTRO} cards={SERVICE_CARDS} />
        <About content={ABOUT_CONTENT} />
        <Stellen content={JOBS_CONTENT} />
        <Aufgaben content={ROLE_CONTENT} />
        <Stimmen content={TESTIMONIAL_CONTENT} />
        <Standort content={LOCATION_CONTENT} />
        <Gruende content={REASONS_CONTENT} />
        <Ablauf content={PROCESS_CONTENT} />
        {/* The privacy statement lives on the firm's main site — the careers
            page has no route of its own, which is also why the consent link
            opens in a new tab instead of dropping the applicant out of a
            half-filled form. */}
        <Bewerbung
          content={CONTACT_CONTENT}
          privacyHref={siteConfig.legal.privacy}
        />
      </main>
      <SiteFooter content={FOOTER_CONTENT} />
    </>
  );
};
