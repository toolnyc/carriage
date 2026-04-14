"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [imageReady, setImageReady] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const raf = useRef<number>(0);
  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const lerp = 0.04;
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;
      setMouse({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf.current);
    };
  }, [handleMouseMove]);

  /* When the image loads, fade it in, then show content after */
  const handleImageLoad = useCallback(() => {
    setImageReady(true);
    setTimeout(() => setShowContent(true), 800);
  }, []);

  const highlightX = mouse.x * 100;
  const highlightY = mouse.y * 100;
  const parallaxX = (mouse.x - 0.5) * -20;
  const parallaxY = (mouse.y - 0.5) * -20;

  return (
    <main
      ref={containerRef}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Single image container — parallax shift on mouse */}
      <div
        className={`absolute inset-[-40px] transition-opacity duration-[2000ms] ease-out ${
          imageReady ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        }}
      >
        {/* Base image with blur */}
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 backdrop-blur-md" />

        {/* Clear reveal layer — same image, masked to cursor area */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: `radial-gradient(circle 280px at ${highlightX}% ${highlightY}%, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 280px at ${highlightX}% ${highlightY}%, black 0%, transparent 100%)`,
          }}
        >
          <Image
            src="/images/hero.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
        </div>
      </div>

      {/* Mouse-reactive light wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle 400px at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.06) 0%, transparent 100%)`,
        }}
      />

      {/* Animated grain overlay */}
      <div className="animate-grain pointer-events-none absolute inset-[-100%] z-10 opacity-[0.03] mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* Floating ambient particles */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-float absolute rounded-full bg-white/10"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${15 + i * 14}%`,
              top: `${20 + ((i * 17) % 60)}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${6 + (i % 3) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Logo — appears after image has faded in */}
      <div
        className={`relative z-20 transition-all duration-[1800ms] ease-out ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="animate-breathe">
          <Image
            src="/brand/logo.svg"
            alt="Carriage Club"
            width={420}
            height={57}
            priority
            className="invert"
            unoptimized
          />
        </div>
      </div>

      {/* Coming soon — delayed after logo */}
      <p
        className={`absolute bottom-8 z-20 text-xl tracking-[-0.04em] text-white/80 transition-all duration-[1400ms] ease-out ${
          showContent ? "translate-y-0 opacity-100 delay-700" : "translate-y-4 opacity-0"
        }`}
      >
        coming soon
      </p>
    </main>
  );
}
