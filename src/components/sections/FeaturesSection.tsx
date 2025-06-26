"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { siteConfig } from "@/lib/config";
import { 
  ArrowRight, 
  MessageSquare, 
  Network, 
  PenSquare, 
  Mail, 
  Database, 
  Clock, 
  Check, 
  Bot 
} from "lucide-react";

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const icons = {
    MessageIcon: <MessageSquare className="h-6 w-6" />,
    NetworkIcon: <Network className="h-6 w-6" />,
    PencilIcon: <PenSquare className="h-6 w-6" />,
    MailIcon: <Mail className="h-6 w-6" />,
    DatabaseIcon: <Database className="h-6 w-6" />,
    ClockIcon: <Clock className="h-6 w-6" />,
    CheckIcon: <Check className="h-6 w-6" />,
    RobotIcon: <Bot className="h-6 w-6" />,
  };

  const getIcon = (iconName: string) => {
    return icons[iconName as keyof typeof icons] || <Clock className="h-6 w-6" />;
  };

  return (
    <section 
      id="servicos" 
      ref={ref}
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Sem padrão de fundo */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Soluções <span className="text-gradient">inteligentes</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Desenvolvemos automações sob medida que aumentam a eficiência da sua equipe e
              eliminam processos repetitivos, gerando <span className="font-semibold text-primary-500 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">produtividade exponencial</span>. 
              Nossa tecnologia se adapta à sua realidade.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              title={feature.title}
              description={feature.description}
              icon={getIcon(feature.icon)}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a 
            href="#contato"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 font-medium transition-colors"
          >
            <span>Solicitar uma automação personalizada</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  inView: boolean;
}

const FeatureCard = ({ title, description, icon, index, inView }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="glassmorphism rounded-xl p-6 transition-all duration-300 h-full flex flex-col"
    >
      <div className="rounded-full bg-card w-12 h-12 flex items-center justify-center mb-4">
        <div className="text-primary-500">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground flex-grow">{description}</p>
      <div className="mt-4 pt-2 border-t border-border">
        <a 
          href="#contato"
          className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-400 transition-colors"
        >
          <span>Solicitar orçamento</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
};

export default FeaturesSection; 