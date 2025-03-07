import { useRef, useState } from 'react';
import { useCommand } from '@/hooks/useCommand';
import { useSnakeGame } from '@/hooks/useSnakeGame';
import { useKonami } from '@/hooks/useKonami';
import { usePomodoro } from '@/hooks/usePomodoro';

import { Coffee } from '@/components/Coffee';
import { Pomodoro } from '@/components/Pomodoro';

export const InteractiveTerminal = () => {
    const [history, setHistory] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    // command-specific state
    const [isCoffeeBrewing, setIsCoffeeBrewing] = useState(false);

    // pomodoro
    const { pomodoroActive, setPomodoroActive, pomodoroTime, setPomodoroTime, pomodoroRef } = usePomodoro(history, setHistory);

    // Konami code
    useKonami(history, setHistory);

    // snake game
    const { isPlayingGame, initializeSnakeGame, renderSnakeGame } = useSnakeGame(history, setHistory);

    // Command Handler
    const handleCommand = (e) => {
        e.preventDefault();

        const command = inputValue.trim();

        // special case for clear command
        if (command === "clear") {
            setHistory([]);
            setInputValue("");
            return;
        }

        const response = useCommand(command, {
            setIsCoffeeBrewing,
            pomodoroActive,
            setPomodoroActive,
            pomodoroTime,
            setPomodoroTime,
            pomodoroRef,
            setHistory,
            initializeSnakeGame
        });

        setHistory([...history, { command, response }]);
        setInputValue("");

        // Focus the input after command execution
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    };
    return (
        <section id="interactive-section" className="mt-8 w-full p-6 rounded-lg bg-black border border-green-500">
            <h2 className="text-2xl font-bold">➜ ~/interactive</h2>
            <p className="text-sm text-gray-400 mt-1">Type 'help' for available commands</p>
            <div className="mt-2 text-lg">
                {history.map((item, i) => (
                    <div key={i} className="mb-2">
                        <p className="text-green-400">➜ ~ $ {item.command}</p>
                        <p className="text-white">
                            {item.response.split('\n').map((line, lineIndex) => (
                                <span key={lineIndex}>
                                    {line}
                                    {lineIndex < item.response.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </p>
                    </div>
                ))}

                {isPlayingGame && renderSnakeGame()}

                {isCoffeeBrewing && <Coffee />}

                {pomodoroActive && <Pomodoro time={pomodoroTime} />}

                <form onSubmit={handleCommand} className="flex mt-2">
                    <span className="text-green-400">➜ ~ $</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => !isPlayingGame && setInputValue(e.target.value)}
                        className="flex-1 ml-2 bg-transparent outline-none border-none"
                        autoFocus
                    />
                </form>
            </div>
        </section>
    )
}