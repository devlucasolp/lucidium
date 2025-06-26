"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { 
  Smartphone, 
  Globe, 
  MessageSquare, 
  Mail, 
  Instagram, 
  Database,
  FileSpreadsheet
} from "lucide-react";

// Definição de tipos para as abas
interface TabItem {
  id: string;
  label: string;
  icon: JSX.Element;
}

// Definição das abas disponíveis
const tabs: TabItem[] = [
  { id: "whatsapp", label: "WhatsApp", icon: <MessageSquare className="h-5 w-5" /> },
  { id: "social", label: "Redes Sociais", icon: <Instagram className="h-5 w-5" /> },
  { id: "email", label: "Email", icon: <Mail className="h-5 w-5" /> },
  { id: "web", label: "Web", icon: <Globe className="h-5 w-5" /> },
  { id: "planilhas", label: "Planilhas", icon: <FileSpreadsheet className="h-5 w-5" /> },
  { id: "banco", label: "Banco de Dados", icon: <Database className="h-5 w-5" /> },
];

const OmnichannelSection = () => {
  const [activeTab, setActiveTab] = useState<string>("whatsapp");
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
      {/* Padrão de bolinhas */}
      <div className="absolute inset-0 dots-pattern z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comunicação <span className="text-gradient">Omnichannel</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8">
              Integramos sistemas e plataformas para que operem em harmonia, de forma 
              automática, contínua e sem esforço manual. Nossa tecnologia garante que os dados 
              circulem entre os aplicativos com total fluidez e precisão.
            </p>
            
            <div className="mb-8 flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? "theme-gradient-bg text-adaptive"
                      : "bg-muted/40 text-foreground hover:bg-muted/70 border border-border"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            
            <div className="bg-card rounded-lg p-6 glassmorphism">
              <ChannelContent activeTab={activeTab} />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] w-full max-w-[600px] mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <OmnichannelIllustration activeChannel={activeTab} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface ChannelContentProps {
  activeTab: string;
}

const ChannelContent = ({ activeTab }: ChannelContentProps) => {
  const content = {
    whatsapp: {
      title: "WhatsApp",
      description: "Automatize seu atendimento no WhatsApp com respostas programadas, envio de mensagens em massa e integração com seu sistema.",
      features: [
        "Respostas automáticas para perguntas frequentes",
        "Envio programado de mensagens para clientes",
        "Captura e armazenamento de informações dos clientes",
        "Integração com seu CRM ou sistema interno"
      ]
    },
    social: {
      title: "Redes Sociais",
      description: "Crie e publique conteúdo automaticamente em várias redes sociais, além de monitorar e responder comentários.",
      features: [
        "Publicação simultânea em múltiplas plataformas",
        "Agendamento de posts para horários estratégicos",
        "Monitoramento de menções da sua marca",
        "Relatórios de engajamento e alcance"
      ]
    },
    email: {
      title: "Email",
      description: "Automatize campanhas de email, respostas a clientes e organize informações recebidas por email.",
      features: [
        "Envio automático de emails personalizados",
        "Respostas programadas para tipos específicos de emails",
        "Extração de dados de emails recebidos",
        "Organização de leads e contatos"
      ]
    },
    web: {
      title: "Web",
      description: "Capture informações de sites, formulários e APIs para alimentar seus sistemas ou acionar outras automações.",
      features: [
        "Coleta de dados de formulários do seu site",
        "Monitoramento de mudanças em páginas web",
        "Integração com APIs de terceiros",
        "Automação de tarefas em plataformas online"
      ]
    },
    planilhas: {
      title: "Planilhas",
      description: "Automatize a criação, atualização e análise de planilhas no Google Sheets, Excel Online e outras plataformas.",
      features: [
        "Atualização automática de dados em planilhas",
        "Criação de relatórios periódicos",
        "Importação e exportação de dados",
        "Cálculos e análises automáticas"
      ]
    },
    banco: {
      title: "Banco de Dados",
      description: "Conecte-se a bancos de dados para consultar, inserir ou atualizar informações automaticamente conforme suas regras.",
      features: [
        "Sincronização entre diferentes bancos de dados",
        "Backup automático de informações importantes",
        "Limpeza e organização de dados",
        "Alertas baseados em condições específicas"
      ]
    }
  };

  const currentContent = content[activeTab as keyof typeof content];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">{currentContent.title}</h3>
      <p className="text-muted-foreground mb-4">{currentContent.description}</p>
      <ul className="space-y-2">
        {currentContent.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-card flex items-center justify-center mr-3 mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3 text-primary-400"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface OmnichannelIllustrationProps {
  activeChannel: string;
}

const OmnichannelIllustration = ({ activeChannel }: OmnichannelIllustrationProps) => {
  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
      {/* Linhas de conexão como elementos div para melhor controle */}
      {tabs.map((tab, index) => {
        const angle = (index * (360 / tabs.length)) * (Math.PI / 180);
        
        // Calcular o estilo da linha baseado no ângulo
        const length = 160; // Tamanho da linha aumentado para alcançar as bolinhas
        const centerX = 250;
        const centerY = 250;
        
        // Posição do centro da linha
        const midpointX = Math.cos(angle) * (length / 2) + centerX;
        const midpointY = Math.sin(angle) * (length / 2) + centerY;
        
        // Calcular a rotação da linha
        const rotation = angle * (180 / Math.PI);
        
        return (
          <div
            key={`line-${tab.id}`}
            className={`absolute ${tab.id === activeChannel ? 'theme-gradient-horizontal' : ''}`}
            style={{
              width: `${length}px`,
              height: tab.id === activeChannel ? '3px' : '2px',
              left: `${midpointX - length / 2}px`,
              top: `${midpointY}px`,
              transform: `rotate(${rotation}deg)`,
              background: tab.id === activeChannel ? undefined : '#aaa',
              opacity: tab.id === activeChannel ? 0.8 : 0.3,
              zIndex: 5,
              transformOrigin: 'center',
            }}
          />
        );
      })}

      {/* Central Hub - Logo do Lucidium */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full flex items-center justify-center z-20 theme-gradient-bg">
        <div className="relative w-[80px] h-[80px] flex items-center justify-center">
          <Image 
            src="/images/logo.svg"
            alt="Lucidium"
            fill
            className="object-contain p-3"
            priority
          />
        </div>
      </div>
      
      {/* Canais */}
      {tabs.map((tab, index) => {
        const angle = (index * (360 / tabs.length)) * (Math.PI / 180);
        const distance = 180; // Distância do centro
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className={`absolute w-[60px] h-[60px] rounded-full flex items-center justify-center 
              ${tab.id === activeChannel 
                ? 'theme-gradient-bg text-adaptive' 
                : 'bg-muted/50 text-foreground dark:bg-[#1a2436] dark:text-adaptive/70'
              }
              transition-colors duration-300 border ${tab.id === activeChannel 
                ? 'border-primary-400' 
                : 'border-muted/70 dark:border-[#1a2436]'
              } z-10`}
            style={{
              left: `${250 + x - 30}px`, // 30 é metade do tamanho para centrar
              top: `${250 + y - 30}px`,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            {tab.icon}
          </motion.div>
        );
      })}
    </div>
  );
};

export default OmnichannelSection; 