import { fortunes, inspirationalQuotes, weatherMoods } from "@/consts";
import { formatTime, getUptime } from "@/utils";

export const useCommand = (command, state) => {

    if (command.startsWith("sudo")) {
        const sudoCommand = command.replace("sudo", "").trim();
        if (sudoCommands[sudoCommand]) {
            return sudoCommands[sudoCommand].action();
        } else {
            return `sudo: ${sudoCommand}: command not found`;
        }
    } else {
        if (commands[command]) {
            return commands[command].action(state);
        } else {
            return `command not found: ${command}`;
        }
    }
}

const commands = {
    "help": {
        description: "List all available commands",
        usage: "help",
        action: () => {
            return Object.keys(commands).map(command => {
                return commands[command].usage + " - " + commands[command].description;
            }).join("\n")
        }
    },
    "about": {
        description: "Show about section",
        usage: "about",
        action: () => {
            document.getElementById("about-section").scrollIntoView({ behavior: 'smooth' });
            return "Loading about section...";
        }
    },
    "skills": {
        description: "Show skills section",
        usage: "skills",
        action: () => {
            document.getElementById("skills-section").scrollIntoView({ behavior: 'smooth' });
            return "Loading skills section...";
        }
    },
    "projects": {
        description: "Show projects section",
        usage: "projects",
        action: () => {
            document.getElementById("projects-section").scrollIntoView({ behavior: 'smooth' });
            return "Loading projects section...";
        }
    },
    "contact": {
        description: "Show contact information",
        usage: "contact",
        action: () => {
            return "You can contact me at hello@blake.to.";
        }
    },
    "clear": {
        description: "Clear terminal history",
        usage: "clear",
        action: null
    },
    "ls": {
        description: "List sections",
        usage: "ls",
        action: () => {
            return "about  skills  projects  contact";
        }
    },
    "exit": {
        description: "Exit to GitHub profile",
        usage: "exit",
        action: () => {
            setTimeout(() => {
                window.location.href = "https://github.com/BlakeStevenson";
            }, 2000);
            return "Goodbye! Thanks for visiting.";
        }
    },
    "fortune": {
        description: "Get a random fortune",
        usage: "fortune",
        action: () => {
            return fortunes[Math.floor(Math.random() * fortunes.length)];
        }
    },
    "coffee": {
        description: "Brew some coffee",
        usage: "coffee",
        action: (state) => {
            state.setIsCoffeeBrewing(true);
            setTimeout(() => {
                state.setIsCoffeeBrewing(false);
                state.setHistory(prev => [...prev, {
                    command: "coffee status",
                    response: "Coffee ready! Productivity +100%"
                }]);
            }, 3000);
            return "☕ Brewing coffee...";
        }
    },
    "weather": {
        description: "Get current weather",
        usage: "weather",
        action: () => {
            return `Current weather: ${weatherMoods[Math.floor(Math.random() * weatherMoods.length)]}`;
        }
    },
    "whoami": {
        description: "Show who you are",
        usage: "whoami",
        action: () => {
            return "Web Developer crafting clean and efficient digital experiences.";
        }
    },
    "whoami --verbose": {
        description: "Show detailed who you are",
        usage: "whoami --verbose",
        action: () => {
            return "Blake Stevenson: Web Developer, Tech Enthusiast, Problem Solver, Book Lover, Midnight Programmer";
        }
    },
    "inspireme": {
        description: "Get an inspirational quote",
        usage: "inspireme",
        action: () => {
            return inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
        }
    },
    "snake": {
        description: "Play snake game",
        usage: "snake",
        action: (state) => {
            return state.initializeSnakeGame();
        }
    },
    "uptime": {
        description: "Show coding uptime",
        usage: "uptime",
        action: () => {
            return getUptime();
        }
    },
    "pomodoro": {
        description: "Start a pomodoro timer",
        usage: "pomodoro",
        action: (state) => {
            state.setPomodoroActive(true);
            state.setPomodoroTime(25 * 60);
            return "Starting 25-minute focus session...";
        }
    },
    "pomodoro stop": {
        description: "Stop pomodoro timer",
        usage: "pomodoro stop",
        action: (state) => {
            if (state.pomodoroActive) {
                clearInterval(state.pomodoroRef.current);
                state.setPomodoroActive(false);
                return "Pomodoro timer stopped.";
            } else {
                return "No active pomodoro session.";
            }
        }
    },
    "pomodoro status": {
        description: "Check pomodoro status",
        usage: "pomodoro status",
        action: (state) => {
            if (state.pomodoroActive) {
                const time = formatTime(state.pomodoroTime);
                return `Pomodoro in progress: ${time} remaining.`;
            } else {
                return "No active pomodoro session.";
            }
        }
    }
};

const sudoCommands = {
    "reveal_secrets": {
        description: "Reveal hidden secrets",
        usage: "sudo reveal_secrets",
        action: () => {
            return "🔐 [ACCESS GRANTED] Here's a hidden project I'm working on: a new framework for web terminal experiences. Coming soon..."
        }
    },
    "make me a sandwich": {
        description: "Make a sandwich",
        usage: "sudo make me a sandwich",
        action: () => {
            return "🥪 Coming right up!";
        }
    },
    "rm -rf /": {
        description: "Delete everything",
        usage: "sudo rm -rf /",
        action: () => {
            return "🚨 [ERROR] Permission denied. Nice try 😏 I like this portfolio too much to delete it!";
        }
    },
    "": {
        description: "Sudo without command",
        usage: "sudo",
        action: () => {
            return "sudo: With great power comes great responsibility. What are you trying to do?";
        }
    }
};