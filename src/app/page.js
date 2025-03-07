'use client';
import { TypeWriter } from "@/components/TypeWriter";
import "@/app/portfolio.css";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { Projects } from "@/components/Projects";

const Portfolio = () => {
  "use client";

  return (
    <div className="min-h-screen bg-black text-white font-mono p-2 sm:p-8 relative overflow-hidden flex justify-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full p-3 sm:p-6 rounded-lg shadow-lg bg-black border border-green-500">
          <div className="text-xs text-gray-500">
            Last login: {new Date().toLocaleString()} on ttys001
          </div>

          {/* Responsive ASCII art logo - hidden on small screens, visible on medium+ */}
          <div className="hidden md:block">
            <pre className="text-green-500 text-xs">
              {`
  ____  _       _          ____  _                                       
 | __ )| | __ _| | _____  / ___|| |_ _____   _____ _ __  ___  ___  _ __  
 |  _ \\| |/ _\` | |/ / _ \\ \\___ \\| __/ _ \\ \\ / / _ \\\ '_ \\/ __|/ _ \\| '_ \\ 
 | |_) | | (_| |   <  __/  ___) | ||  __/\\ V /  __/ | | \\__ \\ (_) | | | |
 |____/|_|\\__,_|_|\\_\\___| |____/ \\__\\___| \\_/ \\___|_| |_|___/\\___/|_| |_|
                                                                         

 Terminal v1.0.0 - Welcome
            `}
            </pre>
          </div>

          {/* Alternative logo for small screens */}
          <div className="md:hidden">
            <pre className="text-green-500 text-xs text-center my-2">
              {`
  ____  _       _        
 | __ )| | __ _| | _____ 
 |  _ \\| |/ _\` | |/ / _ \\
 | |_) | | (_| |   <  __/
 |____/|_|\\__,_|_|\\_\\___|
                         
     `}
            </pre>
            <div className="text-center text-green-500 text-xs mb-2">
              Terminal v1.0.0 - Welcome
            </div>
          </div>

          {/* Introduction */}
          <h2 className="text-xl sm:text-2xl font-bold">➜ cd /home/blake_stevenson</h2>
          <p className="mt-2 text-base sm:text-lg flex items-center">
            <span>$&nbsp;</span>
            <TypeWriter text="whoami" speed={80} />
          </p>
          <p className="mt-2 text-base sm:text-lg">Web Developer crafting clean and efficient digital experiences.</p>
          <p className="mt-4 text-base sm:text-lg flex flex-wrap gap-2">
            <a href="https://github.com/BlakeStevenson" target="_blank" className="text-blue-400 hover:underline">GitHub</a>
            <span className="hidden sm:inline">|</span>
            <a href="https://www.linkedin.com/in/blake-stevenson" target="_blank" className="text-blue-400 hover:underline">LinkedIn</a>
            <span className="hidden sm:inline">|</span>
            <a href="/resume.pdf" target="_blank" className="text-blue-400 hover:underline">Resume</a>
          </p>
        </div>

        {/* Interactive terminal */}
        <InteractiveTerminal />

        {/* About section */}
        <section id="about-section" className="mt-4 sm:mt-8 w-full p-3 sm:p-6 rounded-lg bg-black border border-green-500">
          <h2 className="text-xl sm:text-2xl font-bold">➜ ~/about</h2>
          <p className="mt-2 text-base sm:text-lg flex items-center">
            <span>$&nbsp;cat&nbsp;</span>
            <TypeWriter text="about_me.txt" speed={80} />
          </p>
          <p className="mt-2 text-base sm:text-lg leading-loose">
            Writing code that speaks for itself.
            <br />I build web applications with a focus on speed, usability, and simplicity.
            <br />If it doesn't run fast and look clean, I don't ship it.
          </p>
        </section>

        {/* Skills section */}
        <section id="skills-section" className="mt-4 sm:mt-8 w-full p-3 sm:p-6 rounded-lg bg-black border border-green-500">
          <h2 className="text-xl sm:text-2xl font-bold">➜ ~/skills</h2>
          <p className="mt-2 text-base sm:text-lg flex items-center">
            <span>$&nbsp;</span>
            <TypeWriter text="ls" speed={80} />
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {["JavaScript", "TypeScript", "HTML", "CSS", "React", "Node.js", "PHP", "Java", "Python", "Git"].map((skill) => (
              <div key={skill} className="bg-gray-900 p-2 rounded-md text-center hover:bg-green-900 transition-colors duration-300 text-sm sm:text-base">
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects section */}
        <Projects />

        {/* Footer */}
        <footer className="mt-4 sm:mt-8 w-full p-3 sm:p-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Blake Stevenson</p>
          <p className="mt-2 text-xs">Type 'exit' in the terminal to visit my GitHub</p>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;