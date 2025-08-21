"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Rocket } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
};

export default function Pricing({ plans = [] }: { plans: Plan[] }) {
  // Handle plan selection - conversion focused action
  const handlePlanSelect = (planName: string) => {
    // Smooth scroll to contact form with offset for sticky nav
    const element = document.getElementById("optin");
    const offset = 80;
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    
    // Optional: Store selected plan in localStorage for form pre-filling
    localStorage.setItem("selectedPlan", planName);
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200/50 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700">Choose Your Plan</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Pricing that scales with you
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((pack, index) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {pack.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </motion.div>
              )}

              <div className={`relative backdrop-blur-md bg-white/70 border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full ${
                pack.popular ? "ring-2 ring-blue-500/20" : ""
              }`}>
                <div className="relative z-10">
                  <h3 className={`text-2xl font-bold text-center mb-4 ${
                    pack.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      : "text-gray-900"
                  }`}>
                    {pack.name}
                  </h3>

                  <div className="text-center mb-6">
                    <div className={`text-4xl font-bold mb-2 ${
                      pack.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        : "text-gray-900"
                    }`}>
                      {pack.price}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {pack.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => handlePlanSelect(pack.name)}
                    className={`w-full py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                      pack.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white animate-pulse"
                        : "bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-900 hover:bg-blue-50"
                    }`}
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Choose {pack.name}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
