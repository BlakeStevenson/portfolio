import { useState, useEffect, useRef } from "react";
export const TypeWriter = ({ text, speed = 50 }) => {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const indexRef = useRef(0);
    const interval = useRef(null);
    
    useEffect(() => {
      // Reset state when text changes
      setDisplayText("");
      setIsComplete(false);
      indexRef.current = 0;
      
      // Clear any existing interval
      if (interval.current) {
        clearInterval(interval.current);
      }
      
      // Set up new interval
      interval.current = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayText(text.substring(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          clearInterval(interval.current);
          setIsComplete(true);
        }
      }, speed);
      
      // Cleanup
      return () => {
        if (interval.current) {
          clearInterval(interval.current);
        }
      };
    }, [text, speed]);
    
    return (
      <span>
        {displayText}
        {!isComplete && <span className="animate-pulse">▋</span>}
      </span>
    );
  };