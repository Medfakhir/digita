"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Phone, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll for sticky nav styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "backdrop-blur-md bg-white/95 border-b border-gray-200/50 shadow-lg" 
        : "backdrop-blur-md bg-white/80 border-b border-white/20"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DigitalPro
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium hover:scale-105 transform duration-200"
            >
              Home
            </a>
            <a
              href="/#about"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium hover:scale-105 transform duration-200"
            >
              About
            </a>
            <a
              href="/#services"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium hover:scale-105 transform duration-200"
            >
              Services
            </a>
            <a
              href="/#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium hover:scale-105 transform duration-200"
            >
              Contact
            </a>
            <Button 
              onClick={() => window.location.href = '/#contact'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="mr-2 h-4 w-4" />
              Get Quote
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center">
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
              className="relative p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:border-blue-200 transition-all duration-200 shadow-sm"
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>
        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
            <div className="py-2">
              <a
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                Home
              </a>
              <a
                href="/#about"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                About
              </a>
              <a
                href="/#services"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                Services
              </a>
              <a
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                Contact
              </a>
              <div className="px-4 py-3 border-t border-gray-200">
                <Button 
                  onClick={() => { 
                    window.location.href = '/#contact';
                    setMobileOpen(false); 
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        )}
    </nav>
  );
}
