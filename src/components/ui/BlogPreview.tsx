"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  date: string;
  readingTime: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
}

interface BlogPreviewProps {
  posts?: BlogPost[];
  className?: string;
}

// Posts de exemplo para demonstração
export const demoBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Como a automação de WhatsApp pode transformar seu atendimento ao cliente",
    excerpt: "Descubra como implementar automações inteligentes no WhatsApp para melhorar a experiência do cliente e reduzir o tempo de resposta.",
    slug: "automacao-whatsapp-atendimento-cliente",
    coverImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    date: "2023-10-15",
    readingTime: "5 min",
    author: {
      name: "Marcos Oliveira",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    category: "Automação",
  },
  {
    id: "2",
    title: "5 maneiras de automatizar suas redes sociais e economizar tempo",
    excerpt: "Conheça estratégias eficientes para programar, criar e gerenciar conteúdo nas redes sociais de forma automatizada.",
    slug: "automatizar-redes-sociais-economizar-tempo",
    coverImage: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    date: "2023-09-28",
    readingTime: "7 min",
    author: {
      name: "Carla Mendes",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    category: "Marketing",
  },
  {
    id: "3",
    title: "Integração entre sistemas: como conectar suas ferramentas favoritas",
    excerpt: "Um guia completo sobre como integrar diferentes sistemas e ferramentas para criar fluxos de trabalho automatizados e eficientes.",
    slug: "integracao-sistemas-conectar-ferramentas",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    date: "2023-08-17",
    readingTime: "10 min",
    author: {
      name: "Rafael Costa",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    category: "Tecnologia",
  },
];

const BlogPreview = ({ posts = demoBlogs, className }: BlogPreviewProps) => {
  const { ref, animation } = useScrollAnimation({
    direction: "up",
    threshold: 0.1,
  });

  // Formatador de data
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <div ref={ref} className={cn("w-full py-12", className)}>
      <motion.div
        {...animation}
        className="container mx-auto px-4"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Blog</h2>
            <p className="text-muted-foreground">
              Dicas e novidades sobre automação e produtividade
            </p>
          </div>
          <Link
            href="/blog"
            className="mt-4 md:mt-0 inline-flex items-center text-primary-500 hover:text-secondary-500 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md px-2 py-1"
          >
            Ver todos os posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary-500/50 transition-all"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-48 w-full">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-primary-500 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </div>
                </div>
              </Link>

              <div className="p-6">
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPreview; 