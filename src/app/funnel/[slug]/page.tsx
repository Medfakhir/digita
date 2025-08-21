import { notFound } from "next/navigation";
import { getFunnel } from "@/data/funnels";
import SectionRenderer from "@/components/funnel/SectionRenderer";
import Navigation from "@/components/funnel/Navigation";

export default async function FunnelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const funnel = getFunnel(slug);
  
  if (!funnel) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Navigation />
      <SectionRenderer sections={funnel.sections} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const funnel = getFunnel(slug);
  
  if (!funnel) {
    return {
      title: "Funnel Not Found",
    };
  }

  return {
    title: funnel.meta.title,
    description: funnel.meta.description,
  };
}
