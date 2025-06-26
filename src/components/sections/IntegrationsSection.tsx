"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const IntegrationsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="integracoes"
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
              <span className="text-gradient">Integrações</span> inteligentes
            </h2>
            <p className="text-muted-foreground text-lg">
              Nossa plataforma se conecta com as principais ferramentas do mercado,
              tornando a implementação simples e rápida.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {integrations.map((integration, index) => (
            <IntegrationLogo
              key={index}
              name={integration.name}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-muted-foreground mb-8"
          >
            Não encontrou a integração que precisa? Nossa API aberta permite conectar
            praticamente qualquer sistema à nossa plataforma.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a
              href="#contato"
              className="px-8 py-3 rounded-lg bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors inline-flex"
            >
              Fale com um Especialista
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface IntegrationLogoProps {
  name: string;
  index: number;
  inView: boolean;
}

const IntegrationLogo = ({ name, index, inView }: IntegrationLogoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="rounded-xl p-4 flex items-center justify-center h-24 transition-all glassmorphism light-card"
    >
      <div className="text-center font-medium text-sm">
        {name}
      </div>
    </motion.div>
  );
};

interface Integration {
  name: string;
}

// Lista de plataformas de integração
const integrations: Integration[] = [
  { name: "WhatsApp" },
  { name: "Salesforce" },
  { name: "Shopify" },
  { name: "Zendesk" },
  { name: "HubSpot" },
  { name: "Slack" },
  { name: "Microsoft Teams" },
  { name: "SAP" },
  { name: "Google Workspace" },
  { name: "Pipedrive" },
  { name: "Monday" },
  { name: "Telegram" },
];

export default IntegrationsSection; 