'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiOnClick() {
  useEffect(() => {
    const handleClick = (e) => {
      // Don't fire on buttons/interactive elements to avoid double-confetti
      const tag = e.target.tagName?.toLowerCase();
      if (tag === 'button' || tag === 'a' || tag === 'input' || tag === 'select') return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      confetti({
        particleCount: 30 + Math.floor(Math.random() * 30),
        spread: 50 + Math.random() * 30,
        origin: { x, y },
        colors: ['#2563eb', '#dc2626', '#f59e0b', '#10b981', '#ffffff', '#7c3aed'],
        ticks: 120,
        gravity: 1.2,
        scalar: 0.9,
        drift: 0,
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
