'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import StateCard from './StateCard';

export default function Slideshow({ states }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const SLIDE_DURATION = 6000; // 6 seconds per slide
  const PROGRESS_INTERVAL = 50;

  const goNext = useCallback(() => {
    setIndex(prev => (prev + 1) % states.length);
    setProgress(0);
  }, [states.length]);

  const goPrev = useCallback(() => {
    setIndex(prev => (prev - 1 + states.length) % states.length);
    setProgress(0);
  }, [states.length]);

  useEffect(() => {
    if (paused || !states.length) {
      clearInterval(intervalRef.current);
      clearInterval(progressRef.current);
      return;
    }

    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;
        return next >= 100 ? 100 : next;
      });
    }, PROGRESS_INTERVAL);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressRef.current);
    };
  }, [paused, goNext, states.length, index]);

  if (!states.length) return null;

  const current = states[index];

  return (
    <div className="slideshow-container">
      <div className="slideshow-controls">
        <button className="slide-btn" onClick={goPrev} aria-label="Previous state">
          ◀
        </button>

        <div className="slide-counter">
          <strong>{index + 1}</strong> / {states.length}
        </div>

        <button className="slide-btn" onClick={goNext} aria-label="Next state">
          ▶
        </button>

        <button
          className={`pause-btn ${paused ? 'paused' : ''}`}
          onClick={() => setPaused(p => !p)}
        >
          {paused ? '▶ Play' : '⏸ Pause'}
        </button>
      </div>

      <div className="slide-progress">
        <div className="slide-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="slideshow-card-wrapper" key={current.abbreviation}>
        <StateCard state={current} />
      </div>
    </div>
  );
}
