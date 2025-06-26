"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const AboutSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Efeito para garantir renderização no lado do cliente
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Determinar qual imagem usar com base no tema
  const currentTheme = resolvedTheme || theme;
  const isLightTheme = currentTheme === 'light';
  
  // Importante: As imagens precisam ser salvas manualmente nas seguintes pastas:
  // - /public/images/escritorio-azul.png (para tema claro)
  // - /public/images/escritorio-laranja.png (para tema escuro)
  const imageSrc = !mounted ? "/placeholder-about-team.jpg" : 
                  isLightTheme ? "/images/escritorio-azul.png" : "/images/escritorio-laranja.png";

  return (
    <section 
      id="sobre" 
      ref={ref}
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Sem padrão de fundo */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative w-full h-[400px] overflow-hidden rounded-xl glassmorphism">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-3 w-full h-full">
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt="Escritório Lucidium"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sobre a <span className="text-gradient">Lucidium.ai</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6">
              Somos especialistas em criar automações sob medida com tecnologia de ponta 
              que economizam seu tempo e aumentam a produtividade da sua empresa. 
              Transformamos processos manuais em fluxos automáticos usando a 
              plataforma n8n.
            </p>
            
            <ul className="space-y-4 mb-8">
              {aboutItems.map((item, index) => (
                <AboutItem 
                  key={index}
                  title={item.title}
                  description={item.description}
                  index={index}
                  inView={inView}
                />
              ))}
            </ul>
            
            <a 
              href="#contato"
              className="inline-flex items-center text-primary-500 hover:text-primary-400 font-medium transition-colors group"
            >
              <span>Fale com nossa equipe</span>
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
        
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nossos <span className="text-gradient">Valores</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Princípios que guiam nosso trabalho e nosso compromisso com nossos clientes.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard 
                key={index}
                title={value.title}
                description={value.description}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface AboutItemProps {
  title: string;
  description: string;
  index: number;
  inView: boolean;
}

const AboutItem = ({ title, description, index, inView }: AboutItemProps) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="flex items-start"
    >
      <div className="h-6 w-6 rounded-full bg-card flex items-center justify-center mt-1 mr-3 flex-shrink-0">
        <div className="h-2 w-2 rounded-full bg-primary-500"></div>
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.li>
  );
};

interface ValueCardProps {
  title: string;
  description: string;
  index: number;
  inView: boolean;
}

const ValueCard = ({ title, description, index, inView }: ValueCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 * index }}
      className={cn(
        "glassmorphism rounded-xl p-6 text-center h-full",
      )}
    >
      <div className="mx-auto bg-card w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <span className="text-xl font-bold text-primary-500">{index + 1}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const aboutItems = [
  {
    title: "Especialistas em automação",
    description: "Nossa equipe é especializada em criar automações personalizadas usando a plataforma n8n."
  },
  {
    title: "Foco em resultados",
    description: "Desenvolvemos soluções que trazem resultados reais e mensuráveis para nossos clientes."
  },
  {
    title: "Atendimento personalizado",
    description: "Cada cliente recebe um atendimento único, com soluções criadas especificamente para suas necessidades."
  },
  {
    title: "Suporte contínuo",
    description: "Oferecemos suporte e manutenção para garantir que suas automações funcionem perfeitamente."
  }
];

const values = [
  {
    title: "Simplicidade",
    description: "Transformamos processos complexos em soluções simples e fáceis de entender, sem complicações desnecessárias."
  },
  {
    title: "Eficiência",
    description: "Buscamos sempre a melhor forma de automatizar tarefas, economizando tempo e dinheiro dos nossos clientes."
  },
  {
    title: "Confiabilidade",
    description: "Criamos automações robustas e confiáveis, que funcionam consistentemente e geram resultados previsíveis."
  }
];

export default AboutSection; 