import React from "react";
import type { Section } from "@/data/funnels";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import OptIn from "./sections/OptIn";

export default function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, idx) => {
        try {
          switch (section.type) {
            case "hero":
              return (
                <Hero
                  key={idx}
                  {...(section.data as {
                    eyebrow?: string;
                    title: string;
                    subtitle?: string;
                    ctaPrimary?: { label: string; href?: string; onClick?: () => void };
                    ctaSecondary?: { label: string; href?: string; onClick?: () => void };
                  })}
                />
              );
            case "features":
              return <Features key={idx} items={section.data.items || []} />;
            case "testimonials":
              return <Testimonials key={idx} items={section.data.items || []} />;
            case "pricing":
              return <Pricing key={idx} plans={section.data.plans || []} />;
            case "optin":
              return <OptIn key={idx} {...(section.data as { headline: string; subheadline?: string; action?: { label: string; href?: string; onClick?: () => void } })} />;
            default:
              console.warn(`Unknown section type: ${section.type}`);
              return null;
          }
        } catch (error) {
          console.error(`Error rendering section ${section.type}:`, error);
          return (
            <div key={idx} className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Error rendering {section.type} section</p>
            </div>
          );
        }
      })}
    </>
  );
}
