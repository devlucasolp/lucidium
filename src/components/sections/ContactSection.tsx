"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const ContactSection = () => {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Log temporário para verificar a URL do webhook
    console.log('URL do Webhook:', process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL);
    
    setFormState("submitting");
    
    try {
      const formData = new FormData(e.currentTarget);
      
      const data = {
        nome: formData.get('name'),
        email: formData.get('email'),
        empresa: formData.get('company'),
        mensagem: formData.get('message'),
      };

      const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Adicione headers adicionais se necessário
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar formulário');
      }

      // Sucesso
      setFormState("success");
      (e.target as HTMLFormElement).reset();
      
      // Retornar ao estado inicial após 5 segundos
      setTimeout(() => {
        setFormState("idle");
      }, 5000);
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setFormState("error");
      
      // Retornar ao estado inicial após 5 segundos
      setTimeout(() => {
        setFormState("idle");
      }, 5000);
    }
  };

  return (
    <section
      id="contato"
      ref={ref}
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Padrão de bolinhas */}
      <div className="absolute inset-0 dots-pattern z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Entre em <span className="text-gradient">Contato</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Conte-nos sobre o processo que você quer automatizar e vamos criar
              uma solução personalizada para sua empresa.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glassmorphism rounded-xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Solicitar orçamento</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    disabled={formState !== "idle"}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    disabled={formState !== "idle"}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  disabled={formState !== "idle"}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  O que você gostaria de automatizar?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Descreva o processo que você quer automatizar..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                  disabled={formState !== "idle"}
                ></textarea>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="h-5 w-5 rounded border-border text-primary-500 focus:ring-0"
                    disabled={formState !== "idle"}
                  />
                  <span className="ml-2 text-sm text-muted-foreground">
                    Concordo com a {" "}
                    <a href="#" className="text-primary-500 hover:underline">Política de Privacidade</a>
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={formState !== "idle"}
                className={cn(
                  "w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all",
                  formState === "idle" && "theme-gradient-bg text-adaptive",
                  formState === "submitting" && "theme-gradient-bg opacity-70 text-adaptive/70",
                  formState === "success" && "bg-green-500 text-adaptive",
                  formState === "error" && "bg-red-500 text-adaptive"
                )}
              >
                {formState === "idle" && (
                  <>
                    <span>Solicitar Orçamento</span>
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
                {formState === "submitting" && "Enviando..."}
                {formState === "success" && (
                  <>
                    <span>Mensagem Enviada</span>
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
                {formState === "error" && "Erro ao enviar"}
              </button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6">Informações de contato</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-card flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 theme-icon" />
                </div>
                <div>
                  <h4 className="text-md font-medium mb-1">Email</h4>
                  <a 
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-muted-foreground hover:text-primary-500 transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-card flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 theme-icon" />
                </div>
                <div>
                  <h4 className="text-md font-medium mb-1">Telefone</h4>
                  <a 
                    href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`}
                    className="text-muted-foreground hover:text-primary-500 transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
              

            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6">Perguntas frequentes</h3>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + 0.1 * index }}
                    className="glassmorphism rounded-xl p-4"
                  >
                    <h4 className="text-md font-medium mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const faqs = [
  {
    question: "O que posso automatizar com o n8n?",
    answer: "Praticamente qualquer processo digital: envio de mensagens no WhatsApp, publicação em redes sociais, coleta de dados, envio de emails, integração entre sistemas e muito mais."
  },
  {
    question: "Quanto tempo leva para criar uma automação?",
    answer: "Automações simples podem ser implementadas em poucos dias. Projetos mais complexos geralmente levam de 1 a 3 semanas, dependendo das integrações necessárias."
  },
  {
    question: "Preciso ter conhecimento técnico para usar as automações?",
    answer: "Não! Criamos soluções fáceis de usar, com interfaces simples. Além disso, oferecemos treinamento e suporte contínuo para sua equipe."
  }
];

export default ContactSection; 
