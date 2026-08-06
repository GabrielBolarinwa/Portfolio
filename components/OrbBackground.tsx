"use client";

import { useEffect, useRef } from "react";

export function OrbBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const CYAN = [6, 182, 212];
    const PINK = [255, 45, 117];
    let W: number,
      H: number,
      rafId: number,
      orbs = [];
    let smoothScroll = 0,
      targetScroll = 0;
    const DEAD_ZONE_PX = 50;
    const IDLE_THRESHOLD = 800;
    let lastScrollTime = -Infinity;
    let idleBlend = 0;
    let clampMargin = 0;
    function orbRadius() {
      return Math.min(W, H) * 0.38;
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    function initOrbs() {
      const r = orbRadius();
      const centerY = H / 2;
      const displacement = H * 0.18;

      orbs = [
        {
          x: W * 0.18,
          centerY,
          initOffsetY: -displacement,
          r,
          color: CYAN,
          opacity: 0.35,
          scrollFactor: 0.3,
          driftR: 18,
          driftSpeed: 0.0006,
          driftPhase: 0,
        },
        {
          x: W * 0.82,
          centerY,
          initOffsetY: +displacement,
          r,
          color: PINK,
          opacity: 0.3,
          scrollFactor: -0.3,
          driftR: 14,
          driftSpeed: 0.0005,
          driftPhase: Math.PI,
        },
      ];
    }
    function drawOrb(o, rawY, driftX, driftY) {
      const [cr, cg, cb] = o.color;
      const x = o.x + driftX;
      const y = Math.max(clampMargin, Math.min(H - clampMargin, rawY)) + driftY;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, o.r);
      grad.addColorStop(0, `rgba(${cr},${cg},${cb},${o.opacity})`);
      grad.addColorStop(0.35, `rgba(${cr},${cg},${cb},${o.opacity * 0.6})`);
      grad.addColorStop(0.7, `rgba(${cr},${cg},${cb},${o.opacity * 0.15})`);
      grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);

      ctx.beginPath();
      ctx.arc(x, y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    window.addEventListener(
      "scroll",
      () => {
        targetScroll = window.scrollY;
        lastScrollTime = performance.now();
      },
      { passive: true },
    );

    function scrollProgress() {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      return maxScroll > 0 ? smoothScroll / maxScroll : 0;
    }

    const DEAD_START = 0.325;
    const DEAD_END = 0.675;

    function orbYFromProgress(progress, o) {
      let offset;

      if (progress <= DEAD_START) {
        const t = progress / DEAD_START;
        offset = o.initOffsetY * (1 - t);
      } else if (progress <= DEAD_END) {
        offset = 0;
      } else {
        const t = (progress - DEAD_END) / (1 - DEAD_END);
        offset = -o.initOffsetY * t;
      }

      return o.centerY + offset;
    }
    function draw(ts: number) {
      smoothScroll += (targetScroll - smoothScroll) * 0.07;

      const remPx = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      clampMargin = 1.5 * remPx;

      const isIdle = ts - lastScrollTime > IDLE_THRESHOLD;
      idleBlend += ((isIdle ? 1 : 0) - idleBlend) * 0.02;

      const prog = scrollProgress();

      ctx.clearRect(0, 0, W, H);

      orbs.forEach((o) => {
        const angle = ts * o.driftSpeed + o.driftPhase;
        const driftX = Math.cos(angle) * o.driftR * idleBlend;
        const driftY = Math.sin(angle) * o.driftR * idleBlend;
        drawOrb(o, orbYFromProgress(prog, o), driftX, driftY);
      });

      rafId = requestAnimationFrame(draw);
    }

    const onScroll = () => {
      targetScroll = window.scrollY;
      lastScrollTime = performance.now();
    };
    const onResize = () => {
      cancelAnimationFrame(rafId);
      resize();
      initOrbs();
      rafId = requestAnimationFrame(draw);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    resize();
    initOrbs();
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full h-full absolute"
    />
  );
}
