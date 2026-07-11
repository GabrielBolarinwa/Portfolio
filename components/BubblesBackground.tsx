"use client";
import React, { useRef, useEffect } from "react";

export const BubblesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const bubbles: {
      x: number;
      y: number;
      r: number;
      color: string;
      speed: number;
    }[] = [];
    const numBubbles = 50;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize bubbles
    for (let i = 0; i < numBubbles; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 2.5,
        color: i % 2 === 0 ? "#1eccc3" : "#ff2d75",
        speed: Math.random() / 4, // vertical speed
      });
    }

    // Animation loop
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        // Move bubble upward
        b.y -= b.speed;

        // Reset bubble if it goes above screen
        if (b.y + b.r < 0) {
          b.y = canvas.height + b.r;
          b.x = Math.random() * canvas.width;
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      rafRef.current && cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="bubbles-canvas" />;
};
