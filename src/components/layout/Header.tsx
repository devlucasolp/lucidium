"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import ThemeToggle from "@/components/ui/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
      
      // Foco no elemento para acessibilidade
      element.setAttribute("tabindex", "-1");
      element.focus({ preventScroll: true });
      
      // Anunciar para leitores de tela
      const announcer = document.createElement("div");
      announcer.setAttribute("aria-live", "polite");
      announcer.setAttribute("aria-atomic", "true");
      announcer.classList.add("sr-only");
      announcer.textContent = `Navegou para a seção ${target}`;
      document.body.appendChild(announcer);
      
      setTimeout(() => {
        document.body.removeChild(announcer);
        element.removeAttribute("tabindex");
      }, 1000);
    }
  };

  const handleKeyNavigation = (e: React.KeyboardEvent<HTMLAnchorElement>, target: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
        
        // Foco no elemento para acessibilidade
        element.setAttribute("tabindex", "-1");
        element.focus({ preventScroll: true });
        
        setTimeout(() => {
          element.removeAttribute("tabindex");
        }, 1000);
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm" 
          : "bg-transparent"
      )}
      role="banner"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/#hero"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
            aria-label="Lucidium.ai - Ir para página inicial"
            onClick={(e) => handleNavClick(e, "hero")}
            onKeyDown={(e) => handleKeyNavigation(e, "hero")}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="relative mr-2 w-8 h-8 text-gradient-image">
                <Image 
                  src="/images/logo.svg" 
                  alt="Lucidium Logo" 
                  width={32} 
                  height={32}
                />
              </div>
              <span className="text-gradient font-bold text-xl">Lucidium.ai</span>
            </motion.div>
          </Link>

          {/* Menu desktop */}
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Menu principal">
            {siteConfig.mainNav.map((item, index) => (
              <motion.div
                key={item.section}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <a
                  href={item.href}
                  className="text-foreground hover:text-primary-500 dark:hover:text-secondary-500 transition-colors font-medium relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md px-2 py-1"
                  onClick={(e) => handleNavClick(e, item.section)}
                  onKeyDown={(e) => handleKeyNavigation(e, item.section)}
                  aria-label={`Navegar para ${item.title}`}
                  role="menuitem"
                  tabIndex={0}
                >
                  {item.title}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-500 dark:bg-secondary-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                onClick={(e) => handleNavClick(e as any, "contato")}
                className="relative px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-adaptive font-medium transition-all hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label="Solicitar demonstração"
              >
                <span className="relative z-10">Solicitar Demo</span>
              </button>
            </motion.div>
          </div>

          {/* Menu mobile button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              className="text-foreground hover:text-primary-500 dark:hover:text-secondary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md p-2"
              onClick={handleToggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-controls="mobile-menu"
              tabIndex={0}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
          id="mobile-menu"
          role="menu"
          aria-labelledby="mobile-menu-button"
          aria-hidden={!isMenuOpen}
        >
          <nav className="flex flex-col space-y-4 pt-4 pb-6">
            {siteConfig.mainNav.map((item) => (
              <a
                key={item.section}
                href={item.href}
                className="text-foreground hover:text-primary-500 dark:hover:text-secondary-500 transition-colors font-medium py-2 border-b border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md px-2"
                onClick={(e) => handleNavClick(e, item.section)}
                onKeyDown={(e) => handleKeyNavigation(e, item.section)}
                role="menuitem"
                tabIndex={isMenuOpen ? 0 : -1}
                aria-label={`Navegar para ${item.title}`}
              >
                {item.title}
              </a>
            ))}
            <button
              onClick={(e) => handleNavClick(e as any, "contato")}
              className="mt-2 w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-adaptive font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              tabIndex={isMenuOpen ? 0 : -1}
              aria-label="Solicitar demonstração"
            >
              Solicitar Demo
            </button>
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header; 