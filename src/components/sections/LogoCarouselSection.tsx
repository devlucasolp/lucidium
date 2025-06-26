"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useTheme } from "next-themes";

const LogoCarouselSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const carouselRef1 = useRef<HTMLDivElement>(null);
  const carouselRef2 = useRef<HTMLDivElement>(null);
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);

  // Efeito para garantir renderização no lado do cliente
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Efeito para animar o primeiro carrossel (da direita para a esquerda)
  useEffect(() => {
    if (!carouselRef1.current || !containerRef1.current || !inView) return;

    const carousel = carouselRef1.current;
    const container = containerRef1.current;
    const imageWidth = 3000; // Largura de cada imagem em pixels
    
    let position = 0;
    let animationId: number;
    const speed = 0.5; // pixels por frame (ajuste conforme necessário)

    const animate = () => {
      position -= speed;
      
      // Se a posição for menor que o negativo da largura da imagem, reseta para criar loop perfeito
      if (position <= -imageWidth) {
        position = 0;
      }
      
      if (carousel && document.body.contains(carousel)) {
        carousel.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    // Limpeza
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [inView]);

  // Efeito para animar o segundo carrossel (da esquerda para a direita)
  useEffect(() => {
    if (!carouselRef2.current || !containerRef2.current || !inView) return;

    const carousel = carouselRef2.current;
    const container = containerRef2.current;
    const imageWidth = 3000; // Largura de cada imagem em pixels
    
    let position = -imageWidth;
    let animationId: number;
    const speed = 0.5; // pixels por frame (ajuste conforme necessário)

    const animate = () => {
      position += speed;
      
      // Se a posição alcançou zero, reseta para criar loop perfeito
      if (position >= 0) {
        position = -imageWidth;
      }
      
      if (carousel && document.body.contains(carousel)) {
        carousel.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    // Limpeza
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [inView]);

  // Determinar qual conjunto de imagens usar com base no tema
  const currentTheme = resolvedTheme || theme;
  const isLightTheme = currentTheme === 'light';

  // Se não estiver montado ainda, não renderiza as imagens para evitar mismatch de SSR
  if (!mounted) {
    return (
      <section id="clientes" className="py-20 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Mais de <span className="text-gradient">12.000 clientes</span> moldando um novo mundo de experiências
            </h2>
            <p className="text-muted-foreground text-lg">
              Empresas de todos os portes confiam em nossas soluções de automação para transformar seus negócios.
            </p>
          </div>
          <div className="mt-12 w-full h-[80px]"></div>
          <div className="mt-6 w-full h-[80px]"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="clientes"
      ref={ref}
      className="py-20 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-dots-pattern opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Mais de <span className="text-gradient">12.000 clientes</span> moldando um novo mundo de experiências
            </h2>
            <p className="text-muted-foreground text-lg">
              Empresas de todos os portes confiam em nossas soluções de automação para transformar seus negócios.
            </p>
          </motion.div>
        </div>

        {/* Primeiro carrossel */}
        <div 
          ref={containerRef1}
          className="mt-12 w-full overflow-hidden relative"
        >
          {/* Gradiente à esquerda */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent"></div>
          
          <div 
            ref={carouselRef1}
            className="flex items-center"
            style={{ width: 'fit-content' }}
          >
            <div className="h-[80px] relative" style={{ width: '3000px' }}>
              <Image
                src={isLightTheme ? "/images/marcas3.png" : "/images/marcas1.png"}
                alt="Logos de empresas clientes - parte 1"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                unoptimized={true}
                priority
              />
            </div>
            {/* Duplicata para criar efeito de continuidade */}
            <div className="h-[80px] relative" style={{ width: '3000px' }}>
              <Image
                src={isLightTheme ? "/images/marcas3.png" : "/images/marcas1.png"}
                alt="Logos de empresas clientes - parte 1"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                unoptimized={true}
              />
            </div>
          </div>
          
          {/* Gradiente à direita */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent"></div>
        </div>

        {/* Segundo carrossel (direção inversa) */}
        <div 
          ref={containerRef2}
          className="mt-6 w-full overflow-hidden relative"
        >
          {/* Gradiente à esquerda */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent"></div>
          
          <div 
            ref={carouselRef2}
            className="flex items-center"
            style={{ width: 'fit-content' }}
          >
            <div className="h-[80px] relative" style={{ width: '3000px' }}>
              <Image
                src={isLightTheme ? "/images/marcas4.png" : "/images/marcas2.png"}
                alt="Logos de empresas clientes - parte 2"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                unoptimized={true}
                priority
              />
            </div>
            {/* Duplicata para criar efeito de continuidade */}
            <div className="h-[80px] relative" style={{ width: '3000px' }}>
              <Image
                src={isLightTheme ? "/images/marcas4.png" : "/images/marcas2.png"}
                alt="Logos de empresas clientes - parte 2"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                unoptimized={true}
              />
            </div>
          </div>
          
          {/* Gradiente à direita */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarouselSection; 