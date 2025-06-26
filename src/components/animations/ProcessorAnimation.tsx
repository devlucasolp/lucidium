"use client";

import React, { useEffect, useRef } from "react";

// Interfaces para dados
interface Icon {
  x: number;
  y: number;
  symbol: string;
  active: boolean;
}

interface PathPoint {
  x: number;
  y: number;
}

interface Pulse {
  position: number;
  speed: number;
}

interface Path {
  points: PathPoint[];
  color: string;
  pulseColor: string;
  width: number;
  isOutbound: boolean;
  pulses: Pulse[];
  length?: number;
}

const ProcessorAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Ajustar canvas ao tamanho do container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Configurações básicas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const processorSize = Math.min(canvas.width, canvas.height) * 0.15;
    
    // Definir área segura para os caminhos não ultrapassarem os limites da tela
    const safeMargin = 30; // Margem de segurança em pixels
    const maxX = canvas.width - safeMargin;
    const maxY = canvas.height - safeMargin;
    const minX = safeMargin;
    const minY = safeMargin;
    
    // Cores
    const colors = {
      blue: {
        normal: "rgba(58, 109, 240, 0.8)",  // primary-500: #3a6df0
        bright: "rgba(58, 109, 240, 1.0)",  // primary-500 full opacity
        glow: "rgba(58, 109, 240, 0.3)"     // primary-500 com baixa opacidade
      },
      orange: {
        normal: "rgba(255, 77, 28, 0.8)",   // secondary-500: #ff4d1c
        bright: "rgba(255, 77, 28, 1.0)",   // secondary-500 full opacity
        glow: "rgba(255, 77, 28, 0.3)"      // secondary-500 com baixa opacidade
      },
      processor: {
        bg: "rgba(20, 20, 35, 0.85)",
        border: "rgba(58, 109, 240, 0.9)",  // primary-500 com alta opacidade
        text: "rgba(65, 185, 255, 1)"       // Restaurando a cor original do texto
      },
      white: {
        normal: "rgba(255, 255, 255, 0.8)",
        bright: "rgba(255, 255, 255, 1)"
      }
    };
    
    // Calcular comprimento de um caminho
    const calculatePathLength = (points: PathPoint[]): number => {
      let length = 0;
      for (let i = 0; i < points.length - 1; i++) {
        const dx = points[i+1].x - points[i].x;
        const dy = points[i+1].y - points[i].y;
        length += Math.sqrt(dx*dx + dy*dy);
      }
      return length;
    };
    
    // Função para garantir que um ponto esteja dentro dos limites da tela
    const constrainToCanvas = (x: number, y: number): PathPoint => {
      return {
        x: Math.min(maxX, Math.max(minX, x)),
        y: Math.min(maxY, Math.max(minY, y))
      };
    };
    
    // Coleção de pinos ao redor do processador
    interface Pin {
      x: number;
      y: number;
      side: 'top' | 'right' | 'bottom' | 'left';
      usedByPath?: boolean;
    }
    
    // Criar pinos ao redor do processador - mais organizados
    const pins: Pin[] = [];
    
    // Número de pinos por lado (mais pinos para mais semelhança com as imagens)
    const pinsPerSide = {
      top: 8,
      right: 8,
      bottom: 8,
      left: 8
    };
    
    // Margem para começar os pinos (evitar os cantos)
    const pinMargin = processorSize * 0.2;
    
    // Função para criar pinos em um lado específico
    const createPinsOnSide = (side: 'top' | 'right' | 'bottom' | 'left', count: number) => {
      const size = processorSize * 2 - pinMargin * 2;
      const spacing = size / (count - 1);
      
      for (let i = 0; i < count; i++) {
        const offset = pinMargin + i * spacing;
        
        let x = centerX;
        let y = centerY;
        
        switch (side) {
          case 'top':
            x = centerX - processorSize + offset;
            y = centerY - processorSize;
            break;
          case 'right':
            x = centerX + processorSize;
            y = centerY - processorSize + offset;
            break;
          case 'bottom':
            x = centerX - processorSize + offset;
            y = centerY + processorSize;
            break;
          case 'left':
            x = centerX - processorSize;
            y = centerY - processorSize + offset;
            break;
        }
        
        pins.push({
          x,
          y,
          side,
          usedByPath: false
        });
      }
    };
    
    // Criar pinos em cada lado
    createPinsOnSide('top', pinsPerSide.top);
    createPinsOnSide('right', pinsPerSide.right);
    createPinsOnSide('bottom', pinsPerSide.bottom);
    createPinsOnSide('left', pinsPerSide.left);
    
    // Criar caminhos a partir dos pinos
    const paths: Path[] = [];
    
    // Presets de caminhos para garantir um layout mais harmônico
    // Vamos criar padrões específicos para cada lado para evitar aleatoriedade
    
    // Função para criar caminhos simples (linha reta + 1 curva)
    const createSimplePath = (pin: Pin, isOutbound: boolean): Path => {
      const points: PathPoint[] = [];
      pin.usedByPath = true;
      
      // Ponto inicial (pino)
      points.push({ x: pin.x, y: pin.y });
      
      // Direção inicial baseada no lado do processador
      let dx = 0;
      let dy = 0;
      
      switch (pin.side) {
        case 'top':
          dy = -1;
          break;
        case 'right':
          dx = 1;
          break;
        case 'bottom':
          dy = 1;
          break;
        case 'left':
          dx = -1;
          break;
      }
      
      // Comprimento do segmento inicial - mais uniforme para maior harmonia
      const initialLength = processorSize * 1.2;
      let point2 = {
        x: pin.x + dx * initialLength,
        y: pin.y + dy * initialLength
      };
      
      // Certificar-se de que o ponto está dentro dos limites
      point2 = constrainToCanvas(point2.x, point2.y);
      points.push(point2);
      
      // Para caminhos com curva (tipo L)
      if (pin.side === 'top' || pin.side === 'bottom') {
        // Se o pino está em cima ou embaixo, a curva vai para a esquerda ou direita
        const directionX = pin.x < centerX ? -1 : 1;
        const curveLength = processorSize * 1.0;
        
        const point3 = constrainToCanvas(
          point2.x + directionX * curveLength,
          point2.y
        );
        points.push(point3);
      } else {
        // Se o pino está na esquerda ou direita, a curva vai para cima ou para baixo
        const directionY = pin.y < centerY ? -1 : 1;
        const curveLength = processorSize * 1.0;
        
        const point3 = constrainToCanvas(
          point2.x,
          point2.y + directionY * curveLength
        );
        points.push(point3);
      }
      
      // Cor baseada na direção
      const pathColor = isOutbound ? colors.blue : colors.orange;
      
      return {
        points,
        color: pathColor.normal,
        pulseColor: pathColor.bright,
        width: 2,
        isOutbound,
        pulses: [],
        length: calculatePathLength(points)
      };
    };
    
    // Função para criar caminhos diretos (apenas linha reta)
    const createStraightPath = (pin: Pin, isOutbound: boolean): Path => {
      const points: PathPoint[] = [];
      pin.usedByPath = true;
      
      // Ponto inicial (pino)
      points.push({ x: pin.x, y: pin.y });
      
      // Direção baseada no lado
      let dx = 0;
      let dy = 0;
      
      switch (pin.side) {
        case 'top':
          dy = -1;
          break;
        case 'right':
          dx = 1;
          break;
        case 'bottom':
          dy = 1;
          break;
        case 'left':
          dx = -1;
          break;
      }
      
      // Comprimento variável baseado na posição (mais curto no centro, mais longo nas extremidades)
      const distanceFromCenter = Math.abs(pin.x - centerX) + Math.abs(pin.y - centerY);
      const baseLength = processorSize * 1.5;
      const variableLength = processorSize * (distanceFromCenter / processorSize) * 0.5;
      const totalLength = baseLength + variableLength;
      
      const endPoint = constrainToCanvas(
        pin.x + dx * totalLength,
        pin.y + dy * totalLength
      );
      
      points.push(endPoint);
      
      // Cor baseada na direção
      const pathColor = isOutbound ? colors.blue : colors.orange;
      
      return {
        points,
        color: pathColor.normal,
        pulseColor: pathColor.bright,
        width: 2,
        isOutbound,
        pulses: [],
        length: calculatePathLength(points)
      };
    };
    
    // Função para criar caminhos com dupla curva (tipo Z)
    const createZigzagPath = (pin: Pin, isOutbound: boolean): Path => {
      const points: PathPoint[] = [];
      pin.usedByPath = true;
      
      // Ponto inicial (pino)
      points.push({ x: pin.x, y: pin.y });
      
      // Direção inicial baseada no lado
      let dx = 0;
      let dy = 0;
      
      switch (pin.side) {
        case 'top':
          dy = -1;
          break;
        case 'right':
          dx = 1;
          break;
        case 'bottom':
          dy = 1;
          break;
        case 'left':
          dx = -1;
          break;
      }
      
      // Primeiro segmento
      const initialLength = processorSize * 0.8;
      let point2 = {
        x: pin.x + dx * initialLength,
        y: pin.y + dy * initialLength
      };
      
      point2 = constrainToCanvas(point2.x, point2.y);
      points.push(point2);
      
      // Segunda direção (perpendicular à primeira)
      const secondDx = dy !== 0 ? (pin.x < centerX ? -1 : 1) : 0;
      const secondDy = dx !== 0 ? (pin.y < centerY ? -1 : 1) : 0;
      
      // Segundo segmento
      const secondLength = processorSize * 0.6;
      let point3 = {
        x: point2.x + secondDx * secondLength,
        y: point2.y + secondDy * secondLength
      };
      
      point3 = constrainToCanvas(point3.x, point3.y);
      points.push(point3);
      
      // Terceira direção (mesma da primeira)
      // Terceiro segmento
      const thirdLength = processorSize * 0.8;
      let point4 = {
        x: point3.x + dx * thirdLength,
        y: point3.y + dy * thirdLength
      };
      
      point4 = constrainToCanvas(point4.x, point4.y);
      points.push(point4);
      
      // Cor baseada na direção
      const pathColor = isOutbound ? colors.blue : colors.orange;
      
      return {
        points,
        color: pathColor.normal,
        pulseColor: pathColor.bright,
        width: 2,
        isOutbound,
        pulses: [],
        length: calculatePathLength(points)
      };
    };
    
    // Distribuir os diferentes tipos de caminhos entre os pinos
    const createOrganizedPaths = () => {
      // Pinos para cada tipo de caminho
      const topPins = pins.filter(p => p.side === 'top' && !p.usedByPath);
      const rightPins = pins.filter(p => p.side === 'right' && !p.usedByPath);
      const bottomPins = pins.filter(p => p.side === 'bottom' && !p.usedByPath);
      const leftPins = pins.filter(p => p.side === 'left' && !p.usedByPath);
      
      // Caminhos retos (1 de cada lado)
      if (topPins.length > 0) {
        const pin = topPins[Math.floor(topPins.length / 2)]; // Pino central
        paths.push(createStraightPath(pin, true));
      }
      
      if (rightPins.length > 0) {
        const pin = rightPins[Math.floor(rightPins.length / 2)];
        paths.push(createStraightPath(pin, false));
      }
      
      if (bottomPins.length > 0) {
        const pin = bottomPins[Math.floor(bottomPins.length / 2)];
        paths.push(createStraightPath(pin, true));
      }
      
      if (leftPins.length > 0) {
        const pin = leftPins[Math.floor(leftPins.length / 2)];
        paths.push(createStraightPath(pin, false));
      }
      
      // Caminhos simples (tipo L)
      // Distribuir 40% dos pinos para este tipo
      const createSimplePaths = (sidePins: Pin[], isOutbound: boolean) => {
        const count = Math.floor(sidePins.length * 0.4);
        const step = sidePins.length / (count || 1);
        
        for (let i = 0; i < count; i++) {
          const index = Math.floor(i * step);
          if (index < sidePins.length && !sidePins[index].usedByPath) {
            paths.push(createSimplePath(sidePins[index], isOutbound));
          }
        }
      };
      
      createSimplePaths(pins.filter(p => p.side === 'top' && !p.usedByPath), true);
      createSimplePaths(pins.filter(p => p.side === 'right' && !p.usedByPath), false);
      createSimplePaths(pins.filter(p => p.side === 'bottom' && !p.usedByPath), true);
      createSimplePaths(pins.filter(p => p.side === 'left' && !p.usedByPath), false);
      
      // Caminhos tipo Z (zigzag)
      // Usar os pinos restantes para este tipo
      const remainingPins = pins.filter(p => !p.usedByPath);
      remainingPins.forEach((pin, i) => {
        paths.push(createZigzagPath(pin, i % 2 === 0));
      });
    };
    
    // Criar os caminhos de forma organizada
    createOrganizedPaths();
    
    // Criar pulsos periodicamente
    const createPulse = () => {
      // Limitar número de pulsos ativos
      let activePulses = 0;
      paths.forEach(path => {
        activePulses += path.pulses.length;
      });
      
      if (activePulses >= 8 || Math.random() > 0.1) return;
      
      // Escolher um caminho aleatório
      const pathIndex = Math.floor(Math.random() * paths.length);
      const path = paths[pathIndex];
      
      // Adicionar pulso
      path.pulses.push({
        position: 0,
        speed: 0.004 + Math.random() * 0.002 // Velocidade mais consistente
      });
    };
    
    // Desenhar um pino
    const drawPin = (pin: Pin, highlight: boolean = false) => {
      ctx.beginPath();
      
      const pinSize = highlight ? 4 : 3;
      
      // Determinar a cor baseada na utilização
      let color = "rgba(100, 100, 100, 0.5)";
      if (pin.usedByPath) {
        color = highlight ? 
          (pin.side === 'top' || pin.side === 'left' ? colors.blue.bright : colors.orange.bright) : 
          (pin.side === 'top' || pin.side === 'left' ? colors.blue.normal : colors.orange.normal);
      }
      
      // Adicionar sombra para efeito de brilho quando destacado
      if (highlight) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
      }
      
      ctx.arc(pin.x, pin.y, pinSize, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Resetar shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    };
    
    // Desenhar um círculo no final do caminho
    const drawEndpointCircle = (x: number, y: number, color: string) => {
      // Adicionar sombra para efeito de brilho
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      
      // Círculo principal
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Brilho interno
      const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, 4
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      gradient.addColorStop(0.5, color);
      gradient.addColorStop(1, "rgba(30, 30, 40, 0.2)");
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Resetar shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    };
    
    // Desenhar um ponto de junção/dobra no caminho
    const drawJunctionPoint = (x: number, y: number, color: string) => {
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };
    
    // Desenhar o processador como um chip
    const drawProcessor = () => {
      // Adicionar sombra para o chip
      ctx.shadowColor = "rgba(0, 150, 255, 0.4)";
      ctx.shadowBlur = 15;
      
      // Quadrado principal (corpo do chip)
      ctx.fillStyle = colors.processor.bg;
      ctx.fillRect(
        centerX - processorSize,
        centerY - processorSize,
        processorSize * 2,
        processorSize * 2
      );
      
      // Bordas
      ctx.strokeStyle = colors.processor.border;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(
        centerX - processorSize,
        centerY - processorSize,
        processorSize * 2,
        processorSize * 2
      );
      
      // Remover sombra
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      
      // Texto IA - com brilho forte
      ctx.shadowColor = "rgba(100, 200, 255, 0.8)";
      ctx.shadowBlur = 15;
      ctx.fillStyle = colors.processor.text;
      ctx.font = `bold ${processorSize * 0.8}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("IA", centerX, centerY);
      
      // Resetar shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    };
    
    // Função principal de desenho
    const draw = () => {
      // Limpar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 1. Desenhar todos os caminhos
      paths.forEach(path => {
        // Adicionar efeito de glow para as linhas
        ctx.shadowColor = path.color;
        ctx.shadowBlur = 5;
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.width;
        
        // Desenhar o caminho como uma única linha contínua
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        
        // Desenhar cada segmento do caminho
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        
        ctx.stroke();
        
        // Resetar shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        
        // Desenhar pontos de junção nas dobras do caminho
        for (let i = 1; i < path.points.length - 1; i++) {
          drawJunctionPoint(path.points[i].x, path.points[i].y, path.color);
        }
        
        // Desenhar endpoint (círculo no final do caminho)
        const endpoint = path.points[path.points.length - 1];
        drawEndpointCircle(endpoint.x, endpoint.y, path.color);
      
      // 2. Desenhar e atualizar pulsos
        for (let i = path.pulses.length - 1; i >= 0; i--) {
          const pulse = path.pulses[i];
          pulse.position += pulse.speed;
          
          // Remover pulsos que chegaram ao final
          if (pulse.position > 1) {
            path.pulses.splice(i, 1);
            continue;
          }
          
          // Calcular posição do pulso interpolando entre os pontos do caminho
          const totalDistance = path.length || 1;
          let distanceCovered = pulse.position * totalDistance;
          let currentPoint = 0;
          
          // Encontrar o segmento onde o pulso está
          while (currentPoint < path.points.length - 1) {
            const p1 = path.points[currentPoint];
            const p2 = path.points[currentPoint + 1];
            
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const segmentLength = Math.sqrt(dx*dx + dy*dy);
            
            if (distanceCovered <= segmentLength) {
              // Pulso está neste segmento
              const segmentProgress = distanceCovered / segmentLength;
              
              const pulseX = p1.x + dx * segmentProgress;
              const pulseY = p1.y + dy * segmentProgress;
              
              // Adicionar sombra para o brilho
              ctx.shadowColor = path.pulseColor;
              ctx.shadowBlur = 10;
              
                // Desenhar o pulso
                ctx.beginPath();
              ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
                ctx.fillStyle = path.pulseColor;
                ctx.fill();
              
              // Halo ao redor do pulso
              const gradient = ctx.createRadialGradient(
                pulseX, pulseY, 0,
                pulseX, pulseY, 6
              );
              gradient.addColorStop(0, path.pulseColor);
              gradient.addColorStop(1, "rgba(0,0,0,0)");
              
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 6, 0, Math.PI * 2);
              ctx.fillStyle = gradient;
              ctx.fill();
              
              // Resetar shadow
              ctx.shadowColor = 'transparent';
              ctx.shadowBlur = 0;
              
              break;
            }
            
            distanceCovered -= segmentLength;
            currentPoint++;
          }
        }
      });
      
      // 3. Desenhar o processador
      drawProcessor();
      
      // 4. Desenhar os pinos ao redor do processador
      pins.forEach((pin, index) => {
        // Verificar se há algum pulso próximo ao pino para destaque
        let shouldHighlight = false;
        
        paths.forEach(path => {
          if (path.points[0].x === pin.x && path.points[0].y === pin.y) {
            path.pulses.forEach(pulse => {
              if (pulse.position < 0.1) {
                shouldHighlight = true;
              }
            });
          }
        });
        
        drawPin(pin, shouldHighlight);
      });
    };
    
    // Loop de animação
    let lastTimestamp = 0;
    const frameInterval = 1000 / 30; // 30 FPS
    
    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastTimestamp;
      
      if (elapsed >= frameInterval) {
        lastTimestamp = timestamp;
        
        // Criar pulsos ocasionalmente
        createPulse();
        
        // Desenhar a cena
        draw();
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Limpeza
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full min-h-[400px]">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default ProcessorAnimation; 