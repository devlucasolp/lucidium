"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ComparisonSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="comparacao"
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
              <span className="text-gradient">Automação</span> vs.{" "}
              <span className="text-muted-foreground">Processos Manuais</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Veja como nossas automações personalizadas superam os processos manuais tradicionais
              e trazem mais eficiência para o seu negócio.
            </p>
          </motion.div>
        </div>

        <div className="relative overflow-x-auto rounded-xl glassmorphism">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left">Características</th>
                <th className="px-6 py-4 text-center bg-primary-500/10">
                  <div className="font-bold text-lg text-foreground">Lucidium.ai</div>
                </th>
                <th className="px-6 py-4 text-center bg-muted/30">
                  <div className="font-bold text-lg text-muted-foreground">Processos Manuais</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <ComparisonRow 
                  key={index} 
                  item={item} 
                  index={index} 
                  inView={inView} 
                  isLast={index === comparisonData.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="#contato"
            className="inline-flex px-8 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-adaptive font-medium transition-all"
          >
            Solicitar Automação
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface ComparisonItem {
  feature: string;
  lucidium: boolean;
  traditional: boolean;
}

interface ComparisonRowProps {
  item: ComparisonItem;
  index: number;
  inView: boolean;
  isLast: boolean;
}

const ComparisonRow = ({ item, index, inView, isLast }: ComparisonRowProps) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className={cn("transition-colors hover:bg-card/50", !isLast && "border-b border-border")}
    >
      <td className="px-6 py-4">{item.feature}</td>
      <td className="px-6 py-4 text-center bg-primary-500/10">
        {item.lucidium ? (
          <div className="flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-card flex items-center justify-center">
              <Check className="h-4 w-4 text-primary-500" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-muted/20 flex items-center justify-center">
              <X className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-center bg-muted/20">
        {item.traditional ? (
          <div className="flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-muted/30 flex items-center justify-center">
              <Check className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-muted/20 flex items-center justify-center">
              <X className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </td>
    </motion.tr>
  );
};

const comparisonData: ComparisonItem[] = [
  {
    feature: "Funcionamento 24 horas por dia, 7 dias por semana",
    lucidium: true,
    traditional: false,
  },
  {
    feature: "Execução consistente sem variações",
    lucidium: true,
    traditional: false,
  },
  {
    feature: "Escalabilidade sem aumento proporcional de custos",
    lucidium: true,
    traditional: false,
  },
  {
    feature: "Eliminação de erros humanos",
    lucidium: true,
    traditional: false,
  },
  {
    feature: "Velocidade de execução consistente",
    lucidium: true,
    traditional: false,
  },
  {
    feature: "Integração entre múltiplas plataformas",
    lucidium: true,
    traditional: false,
  },
  {
    feature: "Execução de tarefas repetitivas sem fadiga",
    lucidium: true,
    traditional: false,
  },
  {
    feature: "Registro automático de todas as atividades",
    lucidium: true,
    traditional: false,
  },
  {
    feature: "Adaptação rápida a novos processos",
    lucidium: true,
    traditional: true,
  },
  {
    feature: "Capacidade de lidar com situações imprevistas",
    lucidium: true,
    traditional: true,
  },
];

export default ComparisonSection; 