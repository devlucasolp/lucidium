// Definição de tipo para traduções
export type Translations = {
  [key: string]: string | Translations;
};

// Idiomas suportados
export const SUPPORTED_LANGUAGES = ['pt-BR', 'en-US'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Traduções
const translations: Record<SupportedLanguage, Translations> = {
  'pt-BR': {
    common: {
      requestDemo: 'Solicitar Demo',
      seeSolutions: 'Ver Soluções',
      requestQuote: 'Solicitar Orçamento',
      contactUs: 'Entre em contato',
      learnMore: 'Saiba mais',
    },
    hero: {
      title: 'Automações',
      subtitle: 'que economizam seu tempo',
      description: 'Transformamos tarefas repetitivas em processos automáticos. Do WhatsApp às redes sociais, criamos soluções que funcionam enquanto você foca no que realmente importa.',
    },
    nav: {
      home: 'Início',
      solutions: 'Soluções',
      about: 'Sobre',
      contact: 'Contato',
    },
    features: {
      title: 'Nossas Soluções',
      subtitle: 'Automações personalizadas para o seu negócio',
    },
    contact: {
      title: 'Vamos conversar?',
      subtitle: 'Estamos prontos para ajudar',
      name: 'Nome',
      email: 'E-mail',
      phone: 'Telefone',
      message: 'Mensagem',
      send: 'Enviar',
    },
  },
  'en-US': {
    common: {
      requestDemo: 'Request Demo',
      seeSolutions: 'See Solutions',
      requestQuote: 'Request Quote',
      contactUs: 'Contact Us',
      learnMore: 'Learn More',
    },
    hero: {
      title: 'Automations',
      subtitle: 'that save your time',
      description: 'We transform repetitive tasks into automatic processes. From WhatsApp to social media, we create solutions that work while you focus on what really matters.',
    },
    nav: {
      home: 'Home',
      solutions: 'Solutions',
      about: 'About',
      contact: 'Contact',
    },
    features: {
      title: 'Our Solutions',
      subtitle: 'Custom automations for your business',
    },
    contact: {
      title: 'Let\'s talk?',
      subtitle: 'We\'re ready to help',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      send: 'Send',
    },
  },
};

// Função para obter traduções
export const getTranslations = (lang: SupportedLanguage = 'pt-BR') => {
  return translations[lang] || translations['pt-BR'];
};

// Função para obter uma tradução específica
export const getTranslation = (key: string, lang: SupportedLanguage = 'pt-BR'): string => {
  const keys = key.split('.');
  let result: any = translations[lang];
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // Fallback para português se não encontrar a tradução
      result = getTranslationFallback(key);
      break;
    }
  }
  
  return typeof result === 'string' ? result : key;
};

// Fallback para português
const getTranslationFallback = (key: string): string => {
  const keys = key.split('.');
  let result: any = translations['pt-BR'];
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return key;
    }
  }
  
  return typeof result === 'string' ? result : key;
};

// Hook para usar traduções (a ser implementado com React Context)
export const useTranslation = (lang: SupportedLanguage = 'pt-BR') => {
  return {
    t: (key: string) => getTranslation(key, lang),
    lang,
  };
}; 