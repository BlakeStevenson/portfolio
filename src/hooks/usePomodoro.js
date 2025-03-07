import { useState, useRef, useEffect } from 'react';

export const usePomodoro = (history, setHistory) => {
    const [pomodoroActive, setPomodoroActive] = useState(false);
    const [pomodoroTime, setPomodoroTime] = useState(0);
    const pomodoroRef = useRef(null);
    useEffect(() => {
        if (!pomodoroActive) return;
        pomodoroRef.current = setInterval(() => {
            setPomodoroTime(prev => {
                if (prev <= 1) {
                    clearInterval(pomodoroRef.current);
                    setPomodoroActive(false);
                    setHistory(prev => [...prev, {
                        command: "pomodoro status",
                        response: "Pomodoro session completed! Take a break."
                    }]);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return (() => {
            if (pomodoroRef.current) {
                clearInterval(pomodoroRef.current);
            }
        })
    });

    return {
        pomodoroActive,
        setPomodoroActive,
        pomodoroTime,
        setPomodoroTime,
        pomodoroRef
    }
}