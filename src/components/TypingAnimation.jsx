import React, { useState, useEffect } from 'react';

export default function TypingAnimation({ text = "", speed = 30, onComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText("");
    setIsTyping(true);
    
    if (!text) {
      setIsTyping(false);
      if (onComplete) onComplete();
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      
      if (index >= text.length) {
        clearInterval(timer);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={`typing-animation ${isTyping ? 'cursor-blink' : ''}`}>
      {displayedText}
      <style>{`
        .typing-animation {
          line-height: 1.6;
          white-space: pre-wrap;
          font-family: inherit;
        }

        .cursor-blink::after {
          content: '▊';
          color: hsl(var(--primary));
          margin-left: 2px;
          animation: blink 0.8s step-end infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
