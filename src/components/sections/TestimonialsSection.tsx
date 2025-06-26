"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Gerente de Marketing",
    company: "TechSolutions",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    content: "A Lucidium transformou completamente nosso fluxo de trabalho. Automatizamos processos que antes consumiam horas diárias da nossa equipe. O atendimento personalizado e as soluções sob medida fizeram toda a diferença para nossa empresa.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Diretor de Operações",
    company: "Grupo Nexus",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    content: "Implementamos a automação do WhatsApp com a Lucidium e os resultados foram imediatos. Nosso tempo de resposta diminuiu em 80% e a satisfação dos clientes aumentou significativamente. Recomendo fortemente.",
    rating: 5,
  },
  {
    id: 3,
    name: "Juliana Costa",
    role: "Proprietária",
    company: "Boutique Elegance",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    content: "Como pequena empresária, não tinha tempo para gerenciar todas as redes sociais. A Lucidium criou um sistema que automatiza postagens e interações, permitindo que eu me concentre no crescimento do negócio.",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView, animation } = useScrollAnimation({
    direction: "up",
    threshold: 0.2,
  });

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i < rating ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-5 h-5", i < rating ? "text-secondary-500" : "text-muted-foreground")}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  return (
    <section
      id="depoimentos"
      ref={ref}
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Padrão de pontos */}
      <div className="absolute inset-0 dots-pattern z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          {...animation}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground text-lg">
            Veja como nossas soluções de automação têm ajudado empresas de todos os tamanhos
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Controles de navegação */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-10">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-background border border-border hover:border-primary-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-10">
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-background border border-border hover:border-primary-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Carousel de depoimentos */}
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="min-w-full px-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="glassmorphism rounded-xl p-8 md:p-10"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-shrink-0">
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary-500/30">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex items-center mb-2">
                            {renderStars(testimonial.rating)}
                          </div>
                          
                          <div className="relative">
                            <Quote className="absolute -left-2 -top-2 w-8 h-8 text-primary-500/20" />
                            <p className="text-lg md:text-xl mb-4 italic text-foreground">
                              "{testimonial.content}"
                            </p>
                          </div>

                          <div>
                            <h4 className="font-bold text-lg">{testimonial.name}</h4>
                            <p className="text-muted-foreground">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  activeIndex === index
                    ? "bg-primary-500 w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Ir para depoimento ${index + 1}`}
                aria-current={activeIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 