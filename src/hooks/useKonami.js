import { useState, useEffect } from "react";

export const useKonami = (history, setHistory) => {
    const [konamiIndex, setKonamiIndex] = useState(0);
    const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (code[konamiIndex] === e.key) {
                const nextIndex = konamiIndex + 1;
                setKonamiIndex(nextIndex);

                if (nextIndex === code.length) {
                    // Konami code completed
                    setHistory([...history, {
                        command: "konami code",
                        response: "🎮 KONAMI CODE ACTIVATED! Unlimited power unlocked! 🎮"
                    }]);
                    setKonamiIndex(0);
                }
            } else {
                setKonamiIndex(0);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [konamiIndex, history]);


}