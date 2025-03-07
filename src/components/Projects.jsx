import { useEffect, useState } from "react";
import { TypeWriter } from "./TypeWriter";

export const Projects = () => {
    // projects state
    const [projects, setProjects] = useState({});
    const [activeProject, setActiveProject] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Add event listener for resize
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load projects from JSON
    useEffect(() => {
        fetch("/projects.json")
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch(error => console.error("Error loading projects:", error));
    }, []);

    return (
        <section id="projects-section" className="mt-4 sm:mt-8 w-full p-3 sm:p-6 rounded-lg bg-black border border-green-500">
            <h2 className="text-xl sm:text-2xl font-bold">➜ ~/projects</h2>
            {Object.entries(projects).length > 0 ? (
                Object.entries(projects).map(([category, items]) => (
                    <div key={category} className="mt-4 sm:mt-6">
                        <p className="mt-2 text-base sm:text-lg flex items-center text-green-400">
                            <span>➜ $&nbsp;</span>
                            <TypeWriter text={`ls ${category}/`} speed={80} />
                        </p>
                        <ul className="mt-2 space-y-3 sm:space-y-4">
                            {items.map((project) => (
                                <li
                                    key={project.name}
                                    className="bg-gray-900 p-3 sm:p-4 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 relative"
                                    onMouseEnter={() => !isMobile && setActiveProject(project)}
                                    onMouseLeave={() => !isMobile && setActiveProject(null)}
                                    onClick={() => isMobile && setActiveProject(activeProject === project ? null : project)}
                                >
                                    <a href={project.url} target="_blank" className="text-white hover:underline text-base sm:text-lg font-semibold">
                                        {project.name}
                                    </a>
                                    <p className="mt-1 text-white text-sm sm:text-base">{project.description}</p>

                                    {/* mobile - shown directly under the description when tapped */}
                                    {isMobile && activeProject === project && (
                                        <div className="mt-2 pt-2 border-t border-gray-700 text-sm">
                                            <span className="text-green-400"># Technologies:</span> {project.technologies ? project.technologies.join(", ") : "N/A"}
                                        </div>
                                    )}

                                    {/* Project preview on hover - desktop */}
                                    {!isMobile && (
                                        <div
                                            className={`absolute right-0 top-0 bg-black border border-green-500 p-4 rounded transition-opacity duration-300 z-20 ${activeProject === project ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                }`}
                                            style={{
                                                transform: "translateX(100%)",
                                                marginLeft: "20px",
                                                maxWidth: "250px" // Prevent oversized tooltips
                                            }}
                                        >
                                            <div className="">
                                                <span className="text-green-400"># Technologies:</span> {project.technologies ? project.technologies.join(", ") : "N/A"}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p className="mt-4 text-yellow-400">Loading projects...</p>
            )}
        </section>
    );
}