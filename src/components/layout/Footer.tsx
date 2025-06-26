"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { siteConfig } from "@/lib/config";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
      },
    }),
  };
  
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 relative">
      {/* Fundo gradiente */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <motion.div 
            className="md:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
            variants={fadeInUpVariants}
          >
            <div className="flex items-center mb-6">
              <div className="relative mr-2 w-8 h-8 text-gradient-image">
                <Image 
                  src="/images/logo.svg" 
                  alt="Lucidium Logo" 
                  width={32} 
                  height={32}
                />
              </div>
              <span className="text-gradient font-bold text-xl">Lucidium.ai</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Transforme sua empresa com automações personalizadas. Economize tempo, reduza erros e aumente a produtividade.
            </p>
            <div className="flex space-x-4">
              <Link 
                href={siteConfig.links.github} 
                className="h-10 w-10 rounded-lg glassmorphism flex items-center justify-center hover:border-primary-500/50 transition-all"
                aria-label="GitHub"
                target="_blank"
              >
                <Github className="h-5 w-5 text-foreground" />
              </Link>
              <Link 
                href={siteConfig.links.twitter} 
                className="h-10 w-10 rounded-lg glassmorphism flex items-center justify-center hover:border-primary-500/50 transition-all"
                aria-label="Twitter"
                target="_blank"
              >
                <Twitter className="h-5 w-5 text-foreground" />
              </Link>
              <Link 
                href={siteConfig.links.linkedin} 
                className="h-10 w-10 rounded-lg glassmorphism flex items-center justify-center hover:border-primary-500/50 transition-all"
                aria-label="LinkedIn"
                target="_blank"
              >
                <Linkedin className="h-5 w-5 text-foreground" />
              </Link>
              <Link 
                href={siteConfig.links.instagram} 
                className="h-10 w-10 rounded-lg glassmorphism flex items-center justify-center hover:border-primary-500/50 transition-all"
                aria-label="Instagram"
                target="_blank"
              >
                <Instagram className="h-5 w-5 text-foreground" />
              </Link>
            </div>
          </motion.div>

          {/* Links Rápidos */}
          <motion.div 
            className="md:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={1}
            variants={fadeInUpVariants}
          >
            <h3 className="text-foreground font-bold mb-6 text-lg">Links Rápidos</h3>
            <ul className="space-y-3">
              {siteConfig.mainNav.map((item) => (
                <li key={item.section}>
                  <a 
                    href={item.href} 
                    className="text-muted-foreground hover:text-primary-500 transition-colors"
                    onClick={(e) => handleNavClick(e, item.section)}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Serviços */}
          <motion.div 
            className="md:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={2}
            variants={fadeInUpVariants}
          >
            <h3 className="text-foreground font-bold mb-6 text-lg">Nossas Soluções</h3>
            <ul className="space-y-3">
              {siteConfig.features.slice(0, 4).map((feature, index) => (
                <li key={index}>
                  <a 
                    href="/#servicos" 
                    className="text-muted-foreground hover:text-primary-500 transition-colors"
                    onClick={(e) => handleNavClick(e, "servicos")}
                  >
                    {feature.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contato */}
          <motion.div 
            className="md:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={3}
            variants={fadeInUpVariants}
          >
            <h3 className="text-foreground font-bold mb-6 text-lg">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-primary-500/20 flex items-center justify-center mr-3 mt-0.5">
                  <Mail className="h-3.5 w-3.5 text-primary-400" />
                </div>
                <span className="text-muted-foreground">{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-primary-500/20 flex items-center justify-center mr-3 mt-0.5">
                  <Phone className="h-3.5 w-3.5 text-primary-400" />
                </div>
                <span className="text-muted-foreground">{siteConfig.contact.phone}</span>
              </li>

            </ul>
          </motion.div>
        </div>
        
        {/* Linha de separação */}
        <div className="h-px bg-border my-10"></div>
        
        {/* Copyright e Links de Política */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {currentYear} Lucidium.ai. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary-500 text-sm transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary-500 text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary-500 text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 