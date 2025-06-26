"use client";

import { useEffect, useCallback } from "react";

type EventType = 
  | "page_view" 
  | "click" 
  | "form_submit" 
  | "contact_request"
  | "demo_request"
  | "section_view"
  | "cta_click"
  | "feature_click"
  | "testimonial_view";

interface EventProps {
  type: EventType;
  data?: Record<string, any>;
}

/**
 * Hook para rastreamento de eventos e analytics
 * Pode ser integrado com Google Analytics, Facebook Pixel, etc.
 */
export const useAnalytics = () => {
  // Inicialização dos serviços de analytics
  useEffect(() => {
    // Aqui você pode inicializar serviços como Google Analytics, Facebook Pixel, etc.
    // Exemplo:
    // if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    //   // Inicialização do Google Analytics
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(...args: any[]) { window.dataLayer.push(args); }
    //   gtag('js', new Date());
    //   gtag('config', 'G-XXXXXXXXXX');
    // }
    
    // Rastrear visualização de página
    trackEvent({
      type: "page_view",
      data: {
        path: window.location.pathname,
        title: document.title,
      },
    });
    
    // Cleanup
    return () => {
      // Limpeza se necessário
    };
  }, []);
  
  // Função para rastrear eventos
  const trackEvent = useCallback(({ type, data = {} }: EventProps) => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      // Em desenvolvimento, apenas loga os eventos
      console.log(`[Analytics] Event: ${type}`, data);
      return;
    }
    
    try {
      // Aqui você enviaria o evento para seus serviços de analytics
      // Exemplo para Google Analytics 4:
      // if (window.gtag) {
      //   window.gtag('event', type, data);
      // }
      
      // Exemplo para Facebook Pixel:
      // if (window.fbq) {
      //   window.fbq('trackCustom', type, data);
      // }
      
      // Exemplo para enviar para sua própria API:
      // fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type, data, timestamp: new Date().toISOString() }),
      // });
    } catch (error) {
      console.error('[Analytics] Error tracking event:', error);
    }
  }, []);
  
  // Função para rastrear visualizações de seção
  const trackSectionView = useCallback((sectionId: string, sectionName: string) => {
    trackEvent({
      type: "section_view",
      data: {
        section_id: sectionId,
        section_name: sectionName,
      },
    });
  }, [trackEvent]);
  
  // Função para rastrear cliques em CTA
  const trackCTAClick = useCallback((ctaId: string, ctaText: string) => {
    trackEvent({
      type: "cta_click",
      data: {
        cta_id: ctaId,
        cta_text: ctaText,
      },
    });
  }, [trackEvent]);
  
  // Função para rastrear envios de formulário
  const trackFormSubmit = useCallback((formId: string, formData: Record<string, any>) => {
    // Remover dados sensíveis antes de rastrear
    const safeFormData = { ...formData };
    delete safeFormData.password;
    delete safeFormData.credit_card;
    
    trackEvent({
      type: "form_submit",
      data: {
        form_id: formId,
        ...safeFormData,
      },
    });
  }, [trackEvent]);
  
  return {
    trackEvent,
    trackSectionView,
    trackCTAClick,
    trackFormSubmit,
  };
}; 