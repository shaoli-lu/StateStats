'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

const QUIZ_CATEGORIES = [
  { key: 'capital', label: 'Capital City', getAnswer: (s) => s.capital },
  { key: 'flower', label: 'State Flower', getAnswer: (s) => s.flower },
  { key: 'bird', label: 'State Bird', getAnswer: (s) => s.bird },
  { key: 'nickname', label: 'Nickname', getAnswer: (s) => s.nickname },
  { key: 'motto', label: 'State Motto', getAnswer: (s) => s.motto },
  { key: 'statehood_order', label: 'Statehood Order', getAnswer: (s) => `#${s.statehood_order}` },
];

// Colors for the wheel segments
const COLORS = [
  '#1e40af', '#dc2626', '#d97706', '#059669',
  '#7c3aed', '#db2777', '#0891b2', '#4f46e5',
  '#b91c1c', '#0d9488', '#c026d3', '#ea580c',
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz({ states }) {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0, streak: 0 });
  const [rotation, setRotation] = useState(0);
  const animRef = useRef(null);

  // Pick random subset of states for the wheel (12 at a time for visibility)
  const [wheelStates, setWheelStates] = useState([]);
  
  useEffect(() => {
    if (states.length > 0) {
      setWheelStates(shuffleArray(states).slice(0, 12));
    }
  }, [states]);

  // Draw wheel
  const drawWheel = useCallback((currentRotation) => {
    const canvas = canvasRef.current;
    if (!canvas || wheelStates.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const center = size / 2;
    const radius = center - 10;
    const segAngle = (2 * Math.PI) / wheelStates.length;

    ctx.clearRect(0, 0, size, size);

    // Draw segments
    wheelStates.forEach((state, i) => {
      const startAngle = i * segAngle + currentRotation;
      const endAngle = startAngle + segAngle;

      // Segment fill
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();

      // Segment border
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + segAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.max(11, 16 - wheelStates.length / 3)}px Inter, sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(state.abbreviation, radius - 20, 5);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(center, center, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Star in center
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 20px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', center, center);
  }, [wheelStates]);

  useEffect(() => {
    drawWheel(rotation);
  }, [rotation, drawWheel]);

  const [seenQuestions, setSeenQuestions] = useState([]);

  // Spin the wheel!
  const spinWheel = () => {
    if (spinning || wheelStates.length === 0) return;

    setSpinning(true);
    setSelectedState(null);
    setQuestion(null);
    setAnswered(null);

    const totalRotation = rotation + (Math.PI * 2 * (5 + Math.random() * 5));
    const duration = 4000 + Math.random() * 2000;
    const startTime = Date.now();
    const startRotation = rotation;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + (totalRotation - startRotation) * eased;
      
      setRotation(currentRotation);
      drawWheel(currentRotation);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Determine which state was selected
        const segAngle = (2 * Math.PI) / wheelStates.length;
        // The pointer is at the top (angle = -π/2 or 3π/2)
        const normalizedAngle = (((-currentRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
        // Adjust for pointer at top
        const pointerAngle = (normalizedAngle + Math.PI / 2) % (2 * Math.PI);
        const selectedIndex = Math.floor(pointerAngle / segAngle) % wheelStates.length;
        
        const chosen = wheelStates[selectedIndex];
        setSelectedState(chosen);
        generateQuestion(chosen);
        setSpinning(false);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  const generateQuestion = (state) => {
    // Try to find a category that hasn't been seen recently for this state
    let availableCategories = shuffleArray([...QUIZ_CATEGORIES]);
    let category = availableCategories[0];
    
    for (const cat of availableCategories) {
      const questionId = `${state.name}-${cat.key}`;
      if (!seenQuestions.includes(questionId)) {
        category = cat;
        break;
      }
    }

    const correctAnswer = category.getAnswer(state);
    
    // Generate unique wrong answers from other states
    // We must ensure that the wrong answers are NOT the same as the correct answer
    // and are NOT duplicates of each other.
    const potentialWrongAnswers = states
      .filter(s => s.name !== state.name)
      .map(s => category.getAnswer(s))
      .filter(ans => ans !== correctAnswer);
    
    // Use a Set to get unique values
    const uniqueWrongAnswers = [...new Set(potentialWrongAnswers)];
    const shuffledDecoys = shuffleArray(uniqueWrongAnswers);
    const wrongAnswers = shuffledDecoys.slice(0, 3);

    const options = shuffleArray([correctAnswer, ...wrongAnswers]);

    setQuestion({
      category: category.label,
      correctAnswer,
      options,
    });

    // Update history, keeping only the last 200
    setSeenQuestions(prev => {
      const questionId = `${state.name}-${category.key}`;
      const newHistory = [questionId, ...prev.filter(id => id !== questionId)];
      return newHistory.slice(0, 200);
    });
  };

  const handleAnswer = (answer) => {
    if (answered !== null) return;
    setAnswered(answer);

    if (answer === question.correctAnswer) {
      setScore(prev => ({
        correct: prev.correct + 1,
        wrong: prev.wrong,
        streak: prev.streak + 1,
      }));
      // Celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#dc2626', '#f59e0b', '#10b981'],
      });
    } else {
      setScore(prev => ({
        correct: prev.correct,
        wrong: prev.wrong + 1,
        streak: 0,
      }));
    }

    // Move to next spin after delay
    setTimeout(() => {
      setWheelStates(shuffleArray(states).slice(0, 12));
    }, 2500);
  };

  const resetQuiz = () => {
    setScore({ correct: 0, wrong: 0, streak: 0 });
    setSelectedState(null);
    setQuestion(null);
    setAnswered(null);
    setWheelStates(shuffleArray(states).slice(0, 12));
  };

  return (
    <div className="quiz-container">
      {/* Score */}
      <div className="quiz-score">
        <div className="quiz-score-item">
          <div className="quiz-score-label">Correct</div>
          <div className="quiz-score-value score-correct">{score.correct}</div>
        </div>
        <div className="quiz-score-item">
          <div className="quiz-score-label">Wrong</div>
          <div className="quiz-score-value score-wrong">{score.wrong}</div>
        </div>
        <div className="quiz-score-item">
          <div className="quiz-score-label">Streak</div>
          <div className="quiz-score-value score-streak">🔥 {score.streak}</div>
        </div>
        <button className="slide-btn" onClick={resetQuiz} title="Reset Quiz" style={{ width: 36, height: 36, fontSize: '0.9rem' }}>
          🔄
        </button>
      </div>

      {/* Wheel */}
      <div className="wheel-wrapper">
        <div className="wheel-pointer" />
        <canvas
          ref={canvasRef}
          className="wheel-canvas"
          width={400}
          height={400}
        />
      </div>

      {/* Spin button */}
      <button
        className="spin-btn"
        onClick={spinWheel}
        disabled={spinning}
      >
        {spinning ? '🎰 Spinning...' : '🎡 Spin the Wheel!'}
      </button>

      {/* Question card */}
      {question && selectedState && (
        <div className="quiz-question-card">
          <div className="quiz-state-name">
            {selectedState.name}
          </div>
          <div className="quiz-category">
            What is the <strong>{question.category}</strong>?
          </div>
          <div className="quiz-options">
            {question.options.map((option, i) => {
              let className = 'quiz-option';
              if (answered !== null) {
                if (option === question.correctAnswer) className += ' correct';
                else if (option === answered) className += ' wrong';
              }
              return (
                <button
                  key={i}
                  className={className}
                  onClick={() => handleAnswer(option)}
                  disabled={answered !== null}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {answered && (
            <p style={{ marginTop: '16px', color: answered === question.correctAnswer ? 'var(--success)' : 'var(--error)', fontWeight: 600 }}>
              {answered === question.correctAnswer
                ? '🎉 Correct! Great job!'
                : `❌ Wrong! The answer is: ${question.correctAnswer}`
              }
            </p>
          )}
        </div>
      )}
    </div>
  );
}
