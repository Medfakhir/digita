"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Rocket, Play } from "lucide-react";

type CTA = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export default function Hero({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
}) {
  const handleClick = (cta?: CTA) => {
    if (cta?.onClick) return cta.onClick();
    if (!cta?.href) return;
    if (cta.href.startsWith("#")) {
      document.querySelector(cta.href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(cta.href, "_blank");
    }
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            {eyebrow && (
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200/50 mb-6">
                <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-700">{eyebrow}</span>
              </div>
            )}

            <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            {subtitle && (
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            {ctaPrimary && (
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => handleClick(ctaPrimary)}
              >
                <Rocket className="mr-2 h-5 w-5" />
                {ctaPrimary.label}
              </Button>
            )}

            {ctaSecondary && (
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-all duration-300"
                onClick={() => handleClick(ctaSecondary)}
              >
                <Play className="mr-2 h-5 w-5" />
                {ctaSecondary.label}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
