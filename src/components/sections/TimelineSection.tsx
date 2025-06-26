"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Bot, FileSpreadsheet, LucideIcon, MessageCircle, Settings, Upload, Users } from "lucide-react";

const TimelineSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="timeline"
      ref={ref}
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Padrão de grid */}
      <div className="absolute inset-0 grid-pattern z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Processo de <span className="text-gradient">Implementação</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Conheça o passo a passo para implantar nossa solução de automação na sua empresa,
              de forma rápida e com resultados imediatos.
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Linha central vertical (desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 theme-gradient-vertical z-10 md:block hidden"></div>
          
          {/* Linha central vertical (mobile) */}
          <div className="absolute left-4 top-0 bottom-0 w-1 theme-gradient-vertical z-10 md:hidden"></div>
          
          {/* Timeline Items */}
          <div className="relative">
            {timelineItems.map((item, index) => (
              <TimelineItem 
                key={index}
                item={item}
                index={index}
                inView={inView}
                isLast={index === timelineItems.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  item: TimelineStep;
  index: number;
  inView: boolean;
  isLast: boolean;
}

const TimelineItem = ({ item, index, inView, isLast }: TimelineItemProps) => {
  // Invertemos a lógica para corresponder à imagem
  // Agora os itens ímpares (0, 2, 4) ficam à direita e os pares (1, 3, 5) à esquerda
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative ${isLast ? '' : 'mb-32 md:mb-32 mb-16'} min-h-[180px]`}>
      {/* Ícone central na linha do tempo (desktop) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 + 0.1 * index }}
          className="relative"
        >
          {/* Círculo principal */}
          <div className="relative w-14 h-14 rounded-full theme-gradient-bg flex items-center justify-center shadow-lg">
            <div className="w-12 h-12 rounded-full theme-gradient-bg flex items-center justify-center">
              <item.icon className="h-6 w-6 text-adaptive" />
            </div>
            
            {/* Número da etapa */}
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-primary-500/50 flex items-center justify-center">
              <span className="text-xs font-bold">{index + 1}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Layout para desktop */}
      <div className="hidden md:block">
        {isEven ? (
          // Item ímpar (0, 2, 4) - Conteúdo à direita
          <div className="grid grid-cols-2">
            <div></div> {/* Espaço vazio à esquerda */}
            <div className="pl-16">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="glassmorphism rounded-xl p-6 border border-primary-500/20 max-w-sm">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                <div className="mt-4">
                  <div className="inline-block glassmorphism rounded-lg px-4 py-2 border border-primary-500/20">
                    <span className="text-sm font-medium text-primary-400">{item.time}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          // Item par (1, 3, 5) - Conteúdo à esquerda
          <div className="grid grid-cols-2">
            <div className="pr-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex flex-col items-end"
              >
                <div className="glassmorphism rounded-xl p-6 border border-primary-500/20 text-right max-w-sm ml-auto">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                <div className="mt-4">
                  <div className="inline-block glassmorphism rounded-lg px-4 py-2 border border-primary-500/20">
                    <span className="text-sm font-medium text-primary-400">{item.time}</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div></div> {/* Espaço vazio à direita */}
          </div>
        )}
      </div>

      {/* Layout para mobile - sem ícones, apenas cards */}
      <div className="md:hidden flex">
        {/* Marcador simples na linha do tempo */}
        <div className="w-2 h-2 rounded-full bg-primary-500 absolute left-4 top-6 -translate-x-1/2 z-20"></div>
        
        {/* Conteúdo mobile */}
        <div className="flex-1 pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 * index }}
          >
            <div className="glassmorphism rounded-xl p-5 border border-primary-500/20">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
              
              {/* Tempo integrado no card para mobile */}
              <div className="mt-3 inline-block glassmorphism rounded-lg px-3 py-1 border border-primary-500/20">
                <span className="text-xs font-medium text-primary-400">{item.time}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface TimelineStep {
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
}

const timelineItems: TimelineStep[] = [
  {
    title: "Diagnóstico",
    description: "Mapeamento de processos e identificação de oportunidades de automação com n8n",
    time: "1-2 semanas",
    icon: FileSpreadsheet,
  },
  {
    title: "Integração de Dados",
    description: "Conectamos nosso sistema às suas fontes de dados existentes de forma segura.",
    time: "2-3 semanas",
    icon: Upload,
  },
  {
    title: "Configuração do Fluxo",
    description: "Criamos os fluxos de automação personalizados para seu negócio",
    time: "2-3 semanas",
    icon: Bot,
  },
  {
    title: "Configuração de Canais",
    description: "Implementamos a solução em todos os canais de comunicação desejados.",
    time: "1-2 semanas",
    icon: Settings,
  },
  {
    title: "Testes e Validação",
    description: "Realizamos testes extensivos para garantir que tudo funcione perfeitamente.",
    time: "1-2 semanas",
    icon: MessageCircle,
  },
  {
    title: "Treinamento e Suporte",
    description: "Capacitamos sua equipe para utilizar e gerenciar todas as automações.",
    time: "1 semana",
    icon: Users,
  },
];

export default TimelineSection; 