"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { IconSun, IconMoon } from "@tabler/icons-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Previne hidratação incompatível
  useEffect(() => {
    setMounted(true);
  }, []);

  // Aplicar estilos da scrollbar baseados no tema
  useEffect(() => {
    if (!mounted) return;
    
    const isDark = theme === "dark";
    
    // Criar um estilo para a scrollbar
    const styleElement = document.createElement('style');
    styleElement.id = 'scrollbar-style';
    
    // Remover estilo anterior se existir
    const existingStyle = document.getElementById('scrollbar-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    if (isDark) {
      styleElement.textContent = `
        ::-webkit-scrollbar {
          width: 6px !important;
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: #FF5733 !important;
          border-radius: 9999px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background-color: #FF8A50 !important;
        }
        
        * {
          scrollbar-width: thin !important;
          scrollbar-color: #FF5733 transparent !important;
        }
      `;
    } else {
      styleElement.textContent = `
        ::-webkit-scrollbar {
          width: 6px !important;
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: #3A6DF0 !important;
          border-radius: 9999px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background-color: #1E3FA3 !important;
        }
        
        * {
          scrollbar-width: thin !important;
          scrollbar-color: #3A6DF0 transparent !important;
        }
      `;
    }
    
    document.head.appendChild(styleElement);
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  const handleToggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={handleToggleTheme}
      className="relative w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center overflow-hidden transition-colors bg-card hover:bg-muted"
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
      tabIndex={0}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 0 : 180,
          opacity: isDark ? 1 : 0
        }}
        transition={{ duration: 0.5 }}
        className="absolute"
      >
        <IconMoon className="h-5 w-5 theme-icon" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? -180 : 0,
          opacity: isDark ? 0 : 1
        }}
        transition={{ duration: 0.5 }}
        className="absolute"
      >
        <IconSun className="h-5 w-5 theme-icon" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 