import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Dashboard() {
    const { logout } = useAuth();

    const [totalProjects, setTotalProjects] = useState(0);
    const [recentProjects, setRecentProjects] = useState<any[]>([]);
    const [aiGenerations, setAiGenerations] = useState(0);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get("/projects/");

                const projects = response.data.projects;

                // Total projects
                setTotalProjects(projects.length);

                // Total AI generations
                const totalGenerations = projects.reduce(
                    (total: number, project: any) =>
                        total + (project.generation_count || 1),
                    0
                );

                setAiGenerations(totalGenerations);

                // Projects created in the last 7 days
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                const recent = projects.filter((project: any) => {
                    const createdAt = new Date(project.created_at);
                    return createdAt >= sevenDaysAgo;
                });

                setRecentProjects(recent);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = () => {
        logout();
        window.location.href = "/login";
    };

    return (
        <main className="dashboard-page">

            {/* DASHBOARD HEADER */}
            <div className="dashboard-header">

                <div>
                    <p className="dashboard-label">THUNDERFLOW</p>

                    <h1>Dashboard</h1>

                    <p>Welcome back to your workspace.</p>
                </div>

                <button
                    className="button button-secondary"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>


            {/* TOP 3 STATISTIC BOXES */}
            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <p>Total Projects</p>
                    <h2>{totalProjects}</h2>
                </div>


                <div className="dashboard-card">
                    <p>AI Generations</p>
                    <h2>{aiGenerations}</h2>
                </div>


                <div className="dashboard-card">
                    <p>Recent Projects</p>
                    <h2>{recentProjects.length}</h2>
                </div>

            </div>


            {/* PROJECT HISTORY */}
            <div className="dashboard-history">

                <h2>Project History</h2>


                <div className="recent-projects-list">

                    {recentProjects.length === 0 ? (

                        <p className="no-recent-projects">
                            No projects created yet.
                        </p>

                    ) : (

                        recentProjects.map((project: any) => (

                            <div
                                className="recent-project-item"
                                key={project.id}
                                onClick={() => {
                                    window.location.href =
                                        `/project/${project.project_id || project.id}`;
                                }}
                            >

                                <div>
                                    <h3>{project.title}</h3>

                                    <span>
                                        {project.framework}
                                    </span>
                                </div>


                                <span className="recent-project-date">
                                    {new Date(
                                        project.created_at
                                    ).toLocaleDateString()}
                                </span>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </main>
    );
}

export default Dashboard;