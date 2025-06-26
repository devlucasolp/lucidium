"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Olá! Gostaria de saber como a Lucidium.ai pode automatizar processos para sua empresa?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: Date.now(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simula resposta do bot após 1 segundo
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        content: "Obrigado pelo seu interesse! Vamos criar uma automação personalizada para sua necessidade. Um de nossos especialistas entrará em contato em breve.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Botão de chat flutuante */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full theme-gradient-bg text-adaptive flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </motion.button>
      
      {/* Janela de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] rounded-xl glassmorphism shadow-md flex flex-col overflow-hidden"
          >
            {/* Cabeçalho */}
            <div className="p-4 border-b border-border bg-primary-500/10">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full theme-gradient-bg flex items-center justify-center mr-3">
                  <div className="relative w-6 h-6">
                    <Image 
                      src="/images/logo.svg" 
                      alt="Lucidium Logo" 
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Assistente Lucidium</h3>
                  <p className="text-xs text-muted-foreground">Online agora</p>
                </div>
              </div>
            </div>
            
            {/* Área de mensagens */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
            
            {/* Área de entrada */}
            <div className="p-3 border-t border-border">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-background border border-border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button
                  onClick={sendMessage}
                  className="theme-gradient-bg text-adaptive p-2 rounded-r-lg hover:opacity-90 transition-opacity"
                  aria-label="Enviar mensagem"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                Automações com n8n
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Tipo de mensagem
interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Componente de mensagem individual
const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.sender === "user";
  
  return (
    <div className={cn(
      "mb-3 flex",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2",
        isUser ? "theme-gradient-bg text-adaptive rounded-tr-none" : "bg-muted text-foreground rounded-tl-none"
      )}>
        <div className="flex items-center mb-1">
          {!isUser && (
            <div className="w-5 h-5 rounded-full theme-gradient-bg flex items-center justify-center mr-1">
              <div className="relative w-3 h-3">
                <Image 
                  src="/images/logo.svg" 
                  alt="Lucidium Logo" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
          <span className="text-xs opacity-70">
            {isUser ? "Você" : "Assistente"} • {formatTime(message.timestamp)}
          </span>
          {isUser && (
            <User className="w-3 h-3 ml-1 opacity-70" />
          )}
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

// Formatar hora
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default FloatingChat; 