# Terminal Portfolio

A unique, interactive terminal-themed portfolio website showcasing my work, skills, and experience as a web developer.

## 🚀 Features

### Interactive Terminal
The core of this portfolio is a fully interactive command-line interface that visitors can use to navigate the site:

- **Command Processing**: Execute various commands to explore different sections of the portfolio
- **Section Navigation**: Quickly jump to About, Skills, Projects, and Contact sections
- **Terminal Styling**: Authentic terminal look and feel with command history, cursor, and formatting

### Available Commands

```
help - List all available commands
about - Show about section
skills - Show skills section
projects - Show projects section
contact - Show contact information
clear - Clear terminal history
ls - List sections
exit - Exit to GitHub profile
fortune - Get a random fortune
coffee - Brew some coffee
weather - Get current weather
whoami - Show who you are
whoami --verbose - Show detailed who you are
inspireme - Get an inspirational quote
snake - Play snake game
uptime - Show coding uptime
pomodoro - Start a pomodoro timer
pomodoro stop - Stop pomodoro timer
pomodoro status - Check pomodoro status
```

### Fun Easter Eggs

Try using `sudo` commands to discover hidden features:

```
sudo reveal_secrets - Unlock information about upcoming projects
sudo make me a sandwich - A classic Unix joke
sudo rm -rf / - Don't worry, your system is safe!
```

### Productivity Tools

- **Snake Game**: Take a break with a classic game directly in the terminal
- **Pomodoro Timer**: Built-in productivity timer with 25-minute focus sessions
- **Coffee Brew**: Virtual coffee brewing to boost your productivity
- **Inspirational Quotes**: Random quotes to keep you motivated

## 🛠️ Technology Stack

- **Next.js**: React framework for the frontend
- **React**: UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript**: Core programming language

## 📝 Implementation Details

The terminal functionality is implemented through a custom React hook called `useCommand` that processes user input and returns appropriate responses. The terminal maintains state for various features like the Pomodoro timer and coffee brewing animation.

Key components include:
- Command processor with support for standard and sudo commands
- Smooth scrolling to different sections of the portfolio
- Interactive elements that respond to user input
- Easter eggs and hidden features for the curious visitor

## 📱 Responsive Design

The terminal interface is fully responsive and works on devices of all sizes, from mobile phones to desktop computers.
