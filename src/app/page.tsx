"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Code, 
  Smartphone, 
  Globe, 
  Shield, 
  Rocket, 
  Users, 
  Award, 
  TrendingUp,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Play,
  Sparkles,
  Target,
  Layers,
  Palette,
  Database,
  Clock
} from "lucide-react";

interface ServicePack {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const servicePacks: ServicePack[] = [
  {
    id: "basic",
    name: "Basic",
    price: "$299",
    description: "Perfect for small businesses getting started",
    features: [
      "Website Design & Development",
      "Mobile Responsive",
      "Basic SEO Setup",
      "Contact Form Integration",
      "1 Month Support",
    ],
    icon: <Star className="h-6 w-6" />,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$599",
    description: "Ideal for growing businesses with advanced needs",
    features: [
      "Everything in Basic",
      "E-commerce Integration",
      "Advanced SEO Optimization",
      "Analytics Setup",
      "Social Media Integration",
      "3 Months Support",
    ],
    icon: <Zap className="h-6 w-6" />,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$999",
    description: "Complete solution for established businesses",
    features: [
      "Everything in Pro",
      "Custom Web Application",
      "Database Integration",
      "API Development",
      "Performance Optimization",
      "6 Months Support",
    ],
    icon: <Crown className="h-6 w-6" />,
  },
];

export default function Home() {
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Smooth scroll with offset to account for fixed nav
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    const offset = 80;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Formspree for form submission
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          selectedPack: selectedPack?.name,
          price: selectedPack?.price,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setShowSuccess(false);
          setSelectedPack(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DigitalPro
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); scrollToId('services'); }}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >Services</a>
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToId('about'); }}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >About</a>
              <a
                href="#testimonials"
                onClick={(e) => { e.preventDefault(); scrollToId('testimonials'); }}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >Reviews</a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >Contact</a>
              <Button
                onClick={() => { scrollToId('services'); setTimeout(() => scrollToId('contact'), 800); }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
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
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToId("about"); setMobileOpen(false); }}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                About
              </a>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); scrollToId("services"); setMobileOpen(false); }}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                Services
              </a>
              <a
                href="#testimonials"
                onClick={(e) => { e.preventDefault(); scrollToId("testimonials"); setMobileOpen(false); }}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                Reviews
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToId("contact"); setMobileOpen(false); }}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                Contact
              </a>
              <div className="px-4 py-3 border-t border-gray-200">
                <Button 
                  onClick={() => { scrollToId('services'); setMobileOpen(false); setTimeout(() => scrollToId('contact'), 800); }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Animated Moving Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50"></div>
          
          {/* Moving gradient orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s'}}></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400/25 to-blue-400/25 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-2xl animate-spin" style={{animationDuration: '20s'}}></div>
          
          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/40 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/40 rounded-full animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-cyan-400/40 rounded-full animate-ping" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 right-20 w-3 h-3 bg-pink-400/40 rounded-full animate-ping" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" style={{animationDuration: '8s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200/50 mb-6">
                <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-700">Premium Digital Solutions</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  Elevate Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Digital Presence
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Transform your business with cutting-edge digital solutions. We craft exceptional 
                websites, applications, and digital experiences that drive growth and captivate audiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Phone className="mr-3 h-6 w-6" />
                Get FREE Quote Now
              </Button>
              
              {/* Offer text below button */}
              <div className="text-red-600 font-bold text-lg mb-30">
                Limited Time: 50% Off Setup Fee
              </div>
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: <Target className="h-6 w-6" />, title: "Strategy First", desc: "Data-driven approach" },
                { icon: <Layers className="h-6 w-6" />, title: "Modern Design", desc: "Cutting-edge aesthetics" },
                { icon: <Database className="h-6 w-6" />, title: "Scalable Tech", desc: "Future-proof solutions" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="backdrop-blur-md bg-white/60 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200/50 mb-6">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">Premium Features</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get 3X More Customers in 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                30 Days or Less
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Professional websites that convert visitors into paying customers. Our proven system has generated over <strong className="text-blue-600">$2.5M in revenue</strong> for 500+ businesses.
            </p>
            
            {/* Social Proof */}
            <div className="flex items-center justify-center mb-8 space-x-6">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
                <span className="ml-2 text-gray-700 font-semibold">4.9/5 (127 reviews)</span>
              </div>
              <div className="text-gray-600">
                <span className="font-bold text-green-600">500+</span> Happy Clients
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-8 w-8" />,
                title: "Custom Development",
                description: "Tailored solutions built from scratch to meet your unique business requirements and goals.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Smartphone className="h-8 w-8" />,
                title: "Mobile-First Design",
                description: "Responsive designs that look perfect and function flawlessly on all devices and screen sizes.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Rocket className="h-8 w-8" />,
                title: "Performance Optimized",
                description: "Lightning-fast loading times and optimized performance for better user experience and SEO.",
                gradient: "from-green-500 to-teal-500"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Secure & Reliable",
                description: "Enterprise-grade security measures and reliable hosting to keep your business protected.",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "SEO Optimized",
                description: "Built-in SEO best practices to help your business rank higher in search results.",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "24/7 Support",
                description: "Dedicated support team available around the clock to assist with any questions or issues.",
                gradient: "from-pink-500 to-rose-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="relative backdrop-blur-md bg-white/70 border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl p-[1px]">
                    <div className={`w-full h-full bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-20`}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <Award className="h-4 w-4 text-white mr-2" />
              <span className="text-sm font-medium text-white">Proven Results</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Numbers That Speak
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our track record of success speaks for itself. Here's what we've achieved together with our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 500, suffix: "+", label: "Projects Completed", icon: <Rocket className="h-6 w-6" /> },
              { number: 98, suffix: "%", label: "Client Satisfaction", icon: <Users className="h-6 w-6" /> },
              { number: 50, suffix: "+", label: "Team Members", icon: <Award className="h-6 w-6" /> },
              { number: 5, suffix: "+", label: "Years Experience", icon: <TrendingUp className="h-6 w-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  
                  {/* Animated Counter */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-2"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 2, 
                        delay: index * 0.2,
                        ease: "easeOut"
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.span>
                    <span className="text-cyan-300">{stat.suffix}</span>
                  </motion.div>
                  
                  <div className="text-blue-100 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Premium Elements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center space-x-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-8 py-4 mb-20">
              <div className="flex items-center space-x-2 text-white">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Active Projects: 25+</span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center space-x-2 text-white">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <span className="text-sm font-medium">Global Clients: 15+ Countries</span>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                company: "TechStart Inc.",
                image: "SJ",
                testimonial: "Increased our leads by 400% in just 2 months! ROI was incredible - paid for itself in the first week.",
                result: "+400% Leads"
              },
              {
                name: "Michael Chen",
                company: "Global Solutions",
                image: "MC",
                testimonial: "Revenue jumped from $50k to $180k monthly after launch. Best investment we ever made!",
                result: "+260% Revenue"
              },
              {
                name: "Emily Rodriguez",
                company: "Creative Agency",
                image: "ER",
                testimonial: "Went from 5 clients to 25 clients in 3 months. The website converts like crazy!",
                result: "+500% Clients"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-green-200 bg-gradient-to-br from-white to-green-50">
                  <CardContent className="p-6">
                    {/* Result Badge */}
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                      {testimonial.result}
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.image}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{testimonial.company}</p>
                        <p className="text-gray-700 italic font-medium">"{testimonial.testimonial}"</p>
                        
                        {/* Star Rating */}
                        <div className="flex items-center mt-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to the most common questions about our services.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How long does it take to complete a project?",
                answer: "Project timelines vary depending on complexity. Basic websites typically take 2-3 weeks, while custom applications can take 6-12 weeks. We'll provide a detailed timeline during our initial consultation."
              },
              {
                question: "Do you provide ongoing support and maintenance?",
                answer: "Yes! All our packages include ongoing support. We offer different levels of support depending on your chosen package, from basic maintenance to comprehensive technical support."
              },
              {
                question: "Can you help with SEO and digital marketing?",
                answer: "Absolutely! Our Pro and Premium packages include advanced SEO optimization, and we can also provide additional digital marketing services to help grow your online presence."
              },
              {
                question: "What if I need changes after the project is completed?",
                answer: "We offer revision periods with all our packages, and we're always available for additional updates and improvements. We believe in building long-term partnerships with our clients."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Service Packs Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200/50 mb-6">
              <Crown className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">Premium Packages</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Choose Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Digital Solution
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed ">
              <strong className="text-red-600">⚡ LIMITED TIME: 50% OFF Setup Fees</strong> - Only 3 spots left this month!
              <br />Select your package now and lock in these exclusive savings.
            </p>
            
            {/* Urgency Timer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto mt-6">
              <div className="flex items-center justify-center space-x-2 text-red-700">
                <Clock className="h-5 w-5" />
                <span className="font-bold">Offer expires in: 2 days, 14 hours</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicePacks.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
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
                      <Sparkles className="inline h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </motion.div>
                )}
                
                <div className={`relative backdrop-blur-md bg-white/70 border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full ${
                  pack.popular ? 'ring-2 ring-blue-500/20' : ''
                }`}>
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl p-[1px]">
                    <div className={`w-full h-full bg-gradient-to-r ${
                      pack.popular 
                        ? 'from-blue-500 to-purple-500' 
                        : 'from-gray-400 to-gray-600'
                    } rounded-3xl opacity-20`}></div>
                  </div>
                  
                  <div className="relative z-10">
                    {/* Scarcity Badge */}
                    {pack.popular && (
                      <div className="bg-red-100 border border-red-300 rounded-lg p-2 mb-4 text-center">
                        <span className="text-red-700 text-sm font-bold">🔥 Only 2 spots left!</span>
                      </div>
                    )}
                    
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                        pack.popular
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                      }`}>
                        {pack.icon}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-2xl font-bold text-center mb-4 ${
                      pack.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                        : 'text-gray-900'
                    }`}>
                      {pack.name}
                    </h3>
                    
                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className={`text-4xl font-bold mb-2 ${
                        pack.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                          : 'text-gray-900'
                      }`}>
                        {pack.price}
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {pack.description}
                      </p>
                    </div>
                    
                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {pack.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center"
                        >
                          <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* CTA Button */}
                    <Button
                      className={`w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group ${
                        pack.popular
                          ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white border-2 border-transparent'
                          : 'bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-purple-50 border-2 border-gray-300 hover:border-blue-400 text-gray-900 hover:text-blue-700'
                      }`}
                      onClick={() => {
                        setSelectedPack(pack);
                        setShowPackageModal(true);
                      }}
                    >
                      {/* Animated background for popular packages */}
                      {pack.popular && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      )}
                      
                      {/* Button content */}
                      <div className="relative flex items-center justify-center">
                        <div className={`p-2 rounded-full mr-3 ${
                          pack.popular 
                            ? 'bg-white/20 text-white' 
                            : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                        }`}>
                          <Rocket className="h-5 w-5" />
                        </div>
                        <span className="font-bold">
                          {pack.popular ? 'Choose Popular' : 'Get Started'}
                        </span>
                        <div className={`ml-3 transition-transform duration-300 group-hover:translate-x-1 ${
                          pack.popular ? 'text-white' : 'text-blue-600'
                        }`}>
                          →
                        </div>
                      </div>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Selection Modal */}
      {showPackageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Get Started</h3>
                  <p className="text-blue-100 text-sm">Selected: {selectedPack?.name}</p>
                </div>
                <button
                  onClick={() => setShowPackageModal(false)}
                  className="text-white hover:text-gray-200 p-1"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Package Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedPack?.name}</h4>
                    <p className="text-blue-600 font-bold text-lg">{selectedPack?.price}</p>
                  </div>
                  <div className="text-blue-600">
                    {selectedPack?.icon}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="modal-name">Full Name *</Label>
                  <Input
                    id="modal-name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-email">Email Address *</Label>
                  <Input
                    id="modal-email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-message">Project Notes</Label>
                  <Textarea
                    id="modal-message"
                    placeholder="Tell us about your project requirements, timeline, or any questions..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPackageModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={(e) => {
                      e.preventDefault();
                      
                      if (!formData.name || !formData.email) {
                        alert('Please fill in your name and email address.');
                        return;
                      }
                      
                      // Success alert with all details
                      alert(`🎉 Request Sent Successfully!\n\nPackage: ${selectedPack?.name} (${selectedPack?.price})\nName: ${formData.name}\nEmail: ${formData.email}\nNotes: ${formData.message || 'None'}\n\nWe'll contact you within 24 hours to discuss your project!`);
                      
                      // Reset and close
                      setFormData({ name: "", email: "", message: "" });
                      setShowPackageModal(false);
                      setSelectedPack(null);
                    }}
                  >
                    Send Request
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Let's Start Your Project Today
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to transform your digital presence? Get in touch with our team for a free consultation and custom quote.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email Us</div>
                    <div className="text-gray-600">hello@digitalservices.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Call Us</div>
                    <div className="text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Visit Us</div>
                    <div className="text-gray-600">123 Business Ave, Suite 100<br />New York, NY 10001</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Free Consultation</h4>
                <p className="text-gray-600 mb-4">
                  Schedule a free 30-minute consultation to discuss your project requirements and get expert advice.
                </p>
                <Button className="w-full">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Send Us a Message</h3>
                  
                  {/* Trust Signals */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2 text-blue-700">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">SSL Secured</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-700">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">24hr Response</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-700">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">No Spam Guarantee</span>
                      </div>
                    </div>
                  </div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">First Name</Label>
                        <Input id="contact-name" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-lastname">Last Name</Label>
                        <Input id="contact-lastname" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email Address</Label>
                      <Input id="contact-email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Phone Number</Label>
                      <Input id="contact-phone" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-service">Select Package</Label>
                      <select 
                        id="contact-service"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedPack ? `${selectedPack.name} - ${selectedPack.price}` : ""}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (selectedValue) {
                            const pack = servicePacks.find((p: ServicePack) => `${p.name} - ${p.price}` === selectedValue);
                            setSelectedPack(pack || null);
                          } else {
                            setSelectedPack(null);
                          }
                        }}
                      >
                        <option value="">Choose a package (optional)</option>
                        {servicePacks.map((pack: ServicePack) => (
                          <option key={pack.name} value={`${pack.name} - ${pack.price}`}>
                            {pack.name} - {pack.price}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Project Details</Label>
                      <Textarea 
                        id="contact-message" 
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                        rows={4}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        const form = (e.target as HTMLElement).closest('form');
                        if (!form) return;
                        const formData = new FormData(form);
                        const firstName = (document.getElementById('contact-name') as HTMLInputElement)?.value;
                        const lastName = (document.getElementById('contact-lastname') as HTMLInputElement)?.value;
                        const email = (document.getElementById('contact-email') as HTMLInputElement)?.value;
                        const phone = (document.getElementById('contact-phone') as HTMLInputElement)?.value;
                        const message = (document.getElementById('contact-message') as HTMLTextAreaElement)?.value;
                        
                        if (!firstName || !email) {
                          alert('Please fill in your name and email address.');
                          return;
                        }
                        
                        const packageInfo = selectedPack ? `\n\nSelected Package: ${selectedPack.name} - ${selectedPack.price}` : '';
                        
                        alert(`Message sent successfully!\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}${packageInfo}\n\nWe'll get back to you within 24 hours!`);
                        
                        // Reset form
                        form.reset();
                        setSelectedPack(null);
                      }}
                    >
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-cyan-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  DigitalPro
                </h3>
              </div>
              <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
                We're a team of passionate developers and designers dedicated to creating exceptional digital experiences that drive business growth and exceed expectations.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Globe className="h-5 w-5" />, label: "Website" },
                  { icon: <Mail className="h-5 w-5" />, label: "Email" },
                  { icon: <Phone className="h-5 w-5" />, label: "Phone" }
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                {[
                  "Web Development",
                  "E-commerce Solutions", 
                  "Web Applications",
                  "SEO Optimization",
                  "Digital Marketing"
                ].map((service, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="text-gray-300 hover:text-white cursor-pointer transition-all duration-300 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "Our Team",
                  "Careers",
                  "Contact",
                  "Blog"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="text-gray-300 hover:text-white cursor-pointer transition-all duration-300 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Premium CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 mb-12"
          >
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50/10 to-purple-50/10 rounded-full border border-white/20 mb-6">
                <Rocket className="h-4 w-4 text-white mr-2" />
                <span className="text-sm font-medium text-white">Ready to Start?</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  Transform Your Digital Vision
                </span>
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Ready to elevate your digital presence? Contact us for a free consultation and discover how we can help your business reach new heights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Crown className="mr-2 h-5 w-5" />
                  View Pricing Plans
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 hover:border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-8 text-center"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                &copy; 2024 DigitalPro. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Sticky CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-4 rounded-full shadow-2xl animate-pulse"
        >
          <span className="font-bold"> 50% OFF - Act Now!</span>
        </Button>
      </motion.div>
    </div>
  );
}
