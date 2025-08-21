"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Rocket } from "lucide-react";

type FeatureItem = {
  title: string;
  description: string;
  icon?: "code" | "smartphone" | "rocket";
};

const iconMap = {
  code: <Code className="h-8 w-8" />,
  smartphone: <Smartphone className="h-8 w-8" />,
  rocket: <Rocket className="h-8 w-8" />,
} as const;

export default function Features({ items }: { items: FeatureItem[] }) {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Powerful Features
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="relative backdrop-blur-md bg-white/70 border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 text-white shadow-lg">
                {f.icon ? iconMap[f.icon] : iconMap.code}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
