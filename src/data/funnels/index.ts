import type { ReactNode } from "react";

export type SectionType =
  | "hero"
  | "features"
  | "testimonials"
  | "pricing"
  | "optin";

export type Section = {
  type: SectionType;
  // generic payload so each section can shape its own props
  data: Record<string, any>;
};

export type FunnelConfig = {
  slug: string;
  meta: {
    title: string;
    description?: string;
  };
  sections: Section[];
};

// Example funnel converted from a typical ClickFunnels structure
export const funnels: Record<string, FunnelConfig> = {
  "digital-pro-default": {
    slug: "digital-pro-default",
    meta: {
      title: "DigitalPro — High-Converting Landing",
      description: "Proven layout with hero, features, social proof, pricing and opt-in",
    },
    sections: [
      {
        type: "hero",
        data: {
          eyebrow: "Premium Digital Solutions",
          title: "Transform Your Digital Presence",
          subtitle:
            "Launch high‑converting pages in minutes. Beautiful design, solid performance, and battle‑tested copy blocks.",
          ctaPrimary: { label: "Get Started", href: "#pricing" },
          ctaSecondary: { label: "See How It Works", href: "#testimonials" },
        },
      },
      {
        type: "features",
        data: {
          items: [
            { title: "Custom Development", description: "Tailored web & app builds.", icon: "code" },
            { title: "Mobile‑First", description: "Looks perfect on any device.", icon: "smartphone" },
            { title: "Performance", description: "Fast, optimized, SEO‑ready.", icon: "rocket" },
          ],
        },
      },
      {
        type: "testimonials",
        data: {
          items: [
            { name: "Sarah Johnson", quote: "Exceeded our expectations.", company: "TechStart" },
            { name: "Michael Chen", quote: "Modern, conversion‑focused.", company: "Global Solutions" },
          ],
        },
      },
      {
        type: "pricing",
        data: {
          plans: [
            {
              name: "Basic",
              price: "$299",
              features: ["Responsive site", "Basic SEO", "Contact form"],
              popular: false,
            },
            {
              name: "Pro",
              price: "$599",
              features: ["Everything in Basic", "E‑commerce", "Analytics"],
              popular: true,
            },
            {
              name: "Premium",
              price: "$999",
              features: ["Everything in Pro", "Custom app", "API integration"],
              popular: false,
            },
          ],
        },
      },
      {
        type: "optin",
        data: {
          headline: "Get the Free Strategy Call",
          subheadline: "Book a 15‑minute call to map your funnel in detail.",
          action: { label: "Book Now", href: "#contact" },
        },
      },
    ],
  },
};

export function getFunnel(slug: string): FunnelConfig | null {
  return funnels[slug] ?? null;
}
