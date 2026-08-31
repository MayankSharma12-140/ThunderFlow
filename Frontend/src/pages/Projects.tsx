import { useEffect, useState } from "react";
import api from "../services/api";



interface Project {
    id: number;
    user_id: number;
    title: string;
    prompt: string;
    generated_code: string;
    framework: string;
    created_at: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

const [showForm, setShowForm] = useState(false);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [creating, setCreating] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("newest");


  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

const createProject = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (!name.trim()) {
    return;
  }

  try {
    setCreating(true);

    const response = await api.post("/ai/generate", {
      title: name,
      prompt: description,
      framework: "React",
    });
 
    setName("");
    setDescription("");
    setShowForm(false);

    await fetchProjects();

    window.location.href = `/project/${response.data.projectId}`;

  } catch (error) {
    console.error("Failed to create project:", error);
  } finally {
    setCreating(false);
  }
};

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
  project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  (project.prompt || "").toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
  <main className="projects-page">
    <div className="projects-header">
      <div>
        <p className="project-label">THUNDERFLOW</p>
        <h1>Projects</h1>
        <p>Manage all your projects from one place.</p>
      </div>

     <div className="project-search-wrapper">
  <input
    type="text"
    placeholder="🔍 Search projects..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="project-search-input"
  />

  {searchTerm && (
    <button
      type="button"
      className="project-search-clear"
      onClick={() => setSearchTerm("")}
    >
      ✕
    </button>
  )}
</div>
<select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="project-sort-select"
>
  <option value="newest">Newest</option>
  <option value="name">Name</option>
</select>


      <button
        className="button button-primary"
        onClick={() => setShowForm(true)}
      >
        New Project
      </button>
    </div>

    {showForm && (
      <form className="project-form" onSubmit={createProject}>
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <textarea
          placeholder="Project description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <div className="project-form-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="button button-primary"
            disabled={creating}
          >
            {creating ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    )}


{loading ? (
  <p className="projects-message">Loading projects...</p>
) : projects.length === 0 ? (
  <p className="projects-message">No projects found.</p>
) : searchTerm.trim() && filteredProjects.length === 0 ? (
 <div className="projects-message">
  <div style={{ fontSize: "26px", marginBottom: "8px" }}>⌕</div>
  <div>No projects match your search.</div>
  <small>Try a different project name or description.</small>
</div>
) : (
  <div className="projects-grid">
    {filteredProjects.map((project) => (
      <a
        href={`/project/${project.id}`}
        key={project.id}
        className="project-card-link"
      >
        <div className="project-card">
          <div className="project-card-top">
            <div className="project-card-title">
              <div className="project-card-icon">ϟ</div>
              <h2>{project.title}</h2>
            </div>

            <span className="project-card-badge">PROJECT</span>
          </div>

          <p>
            {project.prompt || "No description available."}
          </p>

          <div className="project-card-footer">
            <span>Open Project</span>
            <span>→</span>
          </div>
        </div>
      </a>
    ))}
  </div>
)}
</main>
  )}
   export default Projects;