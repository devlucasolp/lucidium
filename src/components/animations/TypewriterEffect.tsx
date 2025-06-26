"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TypewriterEffectProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

const TypewriterEffect = ({
  text,
  delay = 0,
  speed = 50,
  className = "text-adaptive",
}: TypewriterEffectProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (delay > 0) {
      timerRef.current = setTimeout(() => {
        setIsTyping(true);
      }, delay);
    } else {
      setIsTyping(true);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      timerRef.current = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
    } else {
      setIsTyping(false);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, isTyping, speed, text]);

  return (
    <span className={className}>
      {displayText}
      {isTyping && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-0.5 h-6 ml-1 bg-current align-text-bottom"
        />
      )}
    </span>
  );
};

export default TypewriterEffect; 