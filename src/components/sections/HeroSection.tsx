"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import TypewriterEffect from "@/components/animations/TypewriterEffect";
import ProcessorAnimation from "@/components/animations/ProcessorAnimation";

const HeroSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      ref={ref} 
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Padrão de grid */}
      <div className="absolute inset-0 grid-pattern z-0"></div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Automações</span>{" "}
              <br />
              <TypewriterEffect 
                text="que economizam seu tempo" 
                delay={500}
                className="text-foreground"
              />
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground text-balance">
              Transformamos tarefas repetitivas em automações inteligentes que funcionam 24/7.
              Enquanto você foca no que realmente importa, nossas soluções cuidam do restante
              com agilidade, precisão e inteligência artificial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contato")}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-adaptive font-medium transition-all flex items-center justify-center group"
              >
                <span>Solicitar Orçamento</span>
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("servicos")}
                className="px-8 py-4 rounded-lg bg-background text-foreground font-medium border border-border hover:border-primary-500 transition-all flex items-center justify-center"
              >
                Ver Soluções
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative h-[450px] sm:h-[500px] w-full max-w-[550px] mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full max-w-[400px] max-h-[400px]">
                  <ProcessorAnimation />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsItems.map((item, index) => (
            <StatsCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente para os cards de estatísticas
const StatsCard = ({ item, index }: { item: StatItem; index: number }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="glassmorphism rounded-xl p-6 text-center backdrop-blur-sm transition-all duration-300"
    >
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-card border border-primary-500/30 flex items-center justify-center">
          {item.icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
      <p className="text-muted-foreground">{item.description}</p>
    </motion.div>
  );
};

// Dados de estatísticas
interface StatItem {
  title: string;
  description: string;
  icon: JSX.Element;
}

const statsItems: StatItem[] = [
  {
    title: "85%",
    description: "Tempo economizado em tarefas repetitivas",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary-500"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
  },
  {
    title: "60%",
    description: "Redução de erros operacionais",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary-500"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
  },
  {
    title: "100+",
    description: "Automações personalizadas implantadas com sucesso",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary-500"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
];

export default HeroSection; 