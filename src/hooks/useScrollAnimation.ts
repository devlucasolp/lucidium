"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { AnimationProps } from "framer-motion";

type AnimationDirection = "up" | "down" | "left" | "right" | "fade" | "scale" | "none";

interface UseScrollAnimationProps {
  direction?: AnimationDirection;
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
}

interface ScrollAnimationResult {
  ref: (node?: Element | null) => void;
  inView: boolean;
  animation: AnimationProps;
  style: React.CSSProperties;
}

/**
 * Hook personalizado para criar animações baseadas em scroll
 * @param options Opções de configuração da animação
 * @returns Objeto com referência, estado de visibilidade e propriedades de animação
 */
export const useScrollAnimation = ({
  direction = "up",
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
  duration = 0.5,
}: UseScrollAnimationProps = {}): ScrollAnimationResult => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  // Definir animações iniciais e finais baseadas na direção
  const getAnimationProps = (): AnimationProps => {
    let initial = {};
    let animate = {};
    
    switch (direction) {
      case "up":
        initial = { opacity: 0, y: 50 };
        animate = inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 };
        break;
      case "down":
        initial = { opacity: 0, y: -50 };
        animate = inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 };
        break;
      case "left":
        initial = { opacity: 0, x: 50 };
        animate = inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 };
        break;
      case "right":
        initial = { opacity: 0, x: -50 };
        animate = inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 };
        break;
      case "scale":
        initial = { opacity: 0, scale: 0.8 };
        animate = inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 };
        break;
      case "fade":
        initial = { opacity: 0 };
        animate = inView ? { opacity: 1 } : { opacity: 0 };
        break;
      case "none":
      default:
        initial = {};
        animate = {};
        break;
    }

    return {
      initial,
      animate,
      transition: { duration, delay, ease: "easeOut" },
    };
  };

  // Criar um estilo CSS para usar em componentes que não suportam motion
  const getStyle = (): React.CSSProperties => {
    if (!inView && !hasAnimated) {
      return {
        opacity: 0,
        transform: 
          direction === "up" ? "translateY(50px)" :
          direction === "down" ? "translateY(-50px)" :
          direction === "left" ? "translateX(50px)" :
          direction === "right" ? "translateX(-50px)" :
          direction === "scale" ? "scale(0.8)" : "none",
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
      };
    }

    return {
      opacity: 1,
      transform: "none",
      transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
    };
  };

  return {
    ref,
    inView,
    animation: getAnimationProps(),
    style: getStyle(),
  };
}; 