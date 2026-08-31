import { useEffect, useState,useRef  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api ,{updateProject}from "../services/api";
import JSZip from "jszip";


type Project = {
  id: number;
  user_id: number;
  title: string;
  prompt: string;
  generated_code: string;
  framework: string;
  created_at: string;
};

function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const createPreviewDocument = (code: string) => {
    const trimmed = code.trim();

    if (
      trimmed.toLowerCase().includes("<!doctype html>") ||
      trimmed.toLowerCase().includes("<html")
    ) {
      return trimmed;
    }

    const cleanedCode = trimmed
      .replace(/import\s+.*?from\s+['"]react['"];?/g, "")
      .replace(/import\s+.*?from\s+['"]react-dom\/client['"];?/g, "")
      .replace(/export\s+default\s+/g, "")
      .replace(/export\s+/g, "");

    const componentMatch = cleanedCode.match(
      /(?:function|const)\s+([A-Z][A-Za-z0-9_]*)/
    );

    const componentName = componentMatch
      ? componentMatch[1]
      : "App";

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100%;
    }

    #root {
      min-height: 100vh;
    }
  </style>
</head>

<body>
  <div id="root"></div>

  <script type="text/babel">
    ${cleanedCode}

    const root = ReactDOM.createRoot(
      document.getElementById("root")
    );

    root.render(React.createElement(${componentName}));
  </script>
</body>
</html>
`;
  };

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [fullscreenCode, setFullscreenCode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [showCodeSearch, setShowCodeSearch] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);
  const [, setSearchFound] = useState<boolean | null>(null);
  const [regenerationInstruction, setRegenerationInstruction] = useState("");
  const [regenerating, setRegenerating] = useState(false);


const filteredCode = project?.generated_code
  ? searchCode.trim()
    ? project.generated_code
        .split("\n")
        .filter((line) =>
          line.toLowerCase().includes(searchCode.trim().toLowerCase())
        )
        .join("\n")
    : project.generated_code
  : "";


useEffect(() => {
  if (!showCodeSearch || !searchCode.trim() || !codeRef.current) {
    setSearchFound(null);
    return;
  }

  const code = project?.generated_code || "";
  const search = searchCode.trim().toLowerCase();

  const index = code.toLowerCase().indexOf(search);

  if (index === -1) {
    setSearchFound(false);
    return;
  }

  setSearchFound(true);

  const lineNumber = code.slice(0, index).split("\n").length;

  const lineHeight = 22;

  codeRef.current.scrollTop = Math.max(
    0,
    (lineNumber - 3) * lineHeight
  );
}, [searchCode, showCodeSearch, project]);


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const copyCode = async () => {
    if (!project?.generated_code) return;

    try {
      await navigator.clipboard.writeText(project.generated_code);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const downloadZip = async () => {
  if (!project?.generated_code) return;

  const zip = new JSZip();

  zip.file(
    `${project.title || "generated-website"}.html`,
    project.generated_code
  );

  const blob = await zip.generateAsync({
    type: "blob",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `${project.title || "generated-website"}.zip`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};

  const deleteProject = async () => {
  if (!project) return;

  const confirmed = window.confirm(
    "Are you sure you want to delete this project?"
  );

  if (!confirmed) return;

  try {
    await api.delete(`/projects/${project.id}`);

    alert("Project deleted successfully!");

    navigate("/projects");
  } catch (error) {
    console.error("Failed to delete project:", error);
    alert("Failed to delete project.");
  }
};

  if (loading) {
    return (
      <main className="project-details-page">
        <div className="project-details-loading">
          <div className="loading-spinner"></div>
          <p>Loading project...</p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="project-details-page">
        <div className="project-not-found">
          <h1>Project Not Found</h1>
          <p>
            We couldn't find the project you're looking for.
          </p>

          <button
            className="project-back-button"
            onClick={() => navigate("/projects")}
          >
            ← Back to Projects
          </button>
        </div>
      </main>
    );
  }
  const regenerateAI = async () => {
  if (!id || !regenerationInstruction.trim()) return;

  try {
    setRegenerating(true);

    await api.put(`/ai/regenerate/${id}`, {
      instruction: regenerationInstruction,
    });

    const response = await api.get(`/projects/${id}`);
    setProject(response.data);
    setShowPreview(false);
    setRegenerationInstruction("");

    alert("Project regenerated successfully!");
  } catch (error) {
    console.error("Failed to regenerate project:", error);
    alert("Failed to regenerate project.");
  } finally {
    setRegenerating(false);
  }
};

  return (
    <main className="project-details-page">
      <div className="project-details-container">

        {/* Back Button */}
        <button
          className="project-back-button"
          onClick={() => navigate("/projects")}
        >
          ← Back to Projects
        </button>

        {/* Project Header */}
        <section className="project-details-header">

          <div className="project-title-section">
            <div className="project-icon">
              ⚡
            </div>

            <div>
              <p className="project-details-label">
                THUNDERFLOW PROJECT
              </p>

              <h1>{project.title}</h1>

              <p className="project-prompt">
                {project.prompt || "No project description available."}
              </p>

              <div className="project-meta">
                <span className="framework-badge">
                  {project.framework}
                </span>

                <span className="created-date">
                  ◷ Created on{" "}
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

     <div className="project-actions">

    <button
        className="edit-project-button"
        onClick={() => {
            setEditTitle(project.title);
            setEditPrompt(project.prompt);
            setEditing(true);
        }}
    >
        ✎ Edit
    </button>

    <button
        className="delete-project-button"
        onClick={deleteProject}
    >
        🗑 Delete
    </button>

    <button
        className="button button-secondary"
        onClick={regenerateAI}
        disabled={regenerating}
    >
        {regenerating ? "Regenerating..." : "⚡ Regenerate AI"}
    </button>

    <div className="regenerate-ai-section">
        <input
            type="text"
            value={regenerationInstruction}
            onChange={(e) => setRegenerationInstruction(e.target.value)}
            placeholder="Tell AI what you want to change..."
            disabled={regenerating}
        />
    </div>

</div>

        </section>


      
        <section className="project-info-card">

          <div className="info-card-header">
            <h2>Project Information</h2>
          </div>

          <div className="project-info-grid">

            <div className="info-item">
              <span>Project Name</span>
              <strong>{project.title}</strong>
            </div>

            <div className="info-item">
              <span>Framework</span>
              <strong>{project.framework}</strong>
            </div>

            <div className="info-item">
              <span>Project ID</span>
              <strong>#{project.id}</strong>
            </div>

            <div className="info-item">
              <span>Created</span>
              <strong>
                {new Date(project.created_at).toLocaleDateString()}
              </strong>
            </div>

          </div>

        </section>

        {editing && (
  <section className="project-edit-card">
    <div className="edit-card-header">
      <p className="edit-label">EDIT PROJECT</p>
      <h2>Edit Project</h2>
    </div>

    <div className="edit-form">
      <label>
        Project Name
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      </label>

      <label>
        Description
        <textarea
          value={editPrompt}
          onChange={(e) => setEditPrompt(e.target.value)}
          rows={5}
        />
      </label>

      <div className="edit-actions">
        <button
          className="cancel-edit-button"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>

        <button
  className="save-edit-button"
  onClick={async () => {
    try {
      await updateProject(id!, {
        title: editTitle,
        prompt: editPrompt,
        framework: project.framework,
      });

      setEditing(false);
      alert("Project updated successfully!");

      // Reload project data
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch (error: any) {
  console.error("Regeneration error:", error);
  console.error("Server response:", error.response?.data);

  alert(
    error.response?.data?.errors
      ? JSON.stringify(error.response.data.errors)
      : error.response?.data?.message || "Failed to regenerate project."
  );
}
  }}
>
  Save Changes
</button>
      </div>
    </div>
  </section>
)}
        <section className="generated-code-card">

          <div className="generated-code-header">

            <div>
              <p className="code-label">
                AI GENERATED
              </p>

              <h2>Generated Code</h2>
            </div>

            <button
              className="copy-code-button"
              onClick={copyCode}
              disabled={!project.generated_code}
            >
              {copied ? "✓ Copied!" : "▣ Copy Code"}
            </button>

          </div>
   


<div className="code-window">
  {project.generated_code && (
    <>
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        <button
          className="copy-code-button"
          onClick={() => setShowPreview(false)}
        >
          {showPreview ? "Code" : "✓ Code"}
        </button>

        <button
          className="copy-code-button"
          onClick={() => setShowPreview(true)}
        >
          {showPreview ? "✓ Preview" : "▶ Preview"}
        </button>
        <button
  className="copy-code-button"
  onClick={() => {
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.open();
      previewWindow.document.write(
        createPreviewDocument(project.generated_code)
      );
      previewWindow.document.close();
    }
  }}
>
  ↗ Open Full Preview
</button>
<button
  className="copy-code-button"
  onClick={() => {
    const blob = new Blob(
      [project.generated_code],
      { type: "text/html" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${project.title || "generated-website"}.html`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }}
>
  ↓ Download HTML
</button>

<button
  className="copy-code-button"
  onClick={downloadZip}
>
  ↓ Download ZIP
</button>

<button
  className="copy-code-button"
  onClick={() => setFullscreenCode(true)}
>
  ⛶ Fullscreen Code
</button>
<button
  className="copy-code-button"
  onClick={() => setShowCodeSearch(!showCodeSearch)}
>
  🔍 Search
</button>
      </div>
      </>
  )}

{showCodeSearch && (
  <div
    style={{
      marginBottom: "12px",
      display: "flex",
      gap: "10px",
      alignItems: "center",
    }}
  >
    <input
      autoFocus
      type="text"
      placeholder="Search in code..."
      value={searchCode}
      onChange={(e) => setSearchCode(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setSearchCode("");
          setShowCodeSearch(false);
        }
      }}
      style={{
        flex: 1,
        padding: "10px 14px",
        borderRadius: "8px",
        border: "1px solid #444",
        background: "#111",
        color: "#fff",
        outline: "none",
      }}
    />

</div>
)}
{showPreview ? (
  <iframe
    key={project.generated_code}
    title="Generated Website Preview"
    srcDoc={createPreviewDocument(project.generated_code)}
    style={{
      width: "100%",
      height: "700px",
      border: "none",
      borderRadius: "12px",
      background: "#fff",
      display: "block",
    }}

    
  />
  
) : (
  <div className="code-editor">
  <pre className="code-content">
  {filteredCode}
</pre>

  </div>

)}
</div>

{fullscreenCode && (
  <div className="fullscreen-code-overlay">
    <div className="fullscreen-code-container">

      <div className="fullscreen-code-header">
        <div>
          <span className="fullscreen-code-label">
            GENERATED CODE
          </span>
          <h2>Code Editor</h2>
        </div>

        <button
          className="fullscreen-close-button"
          onClick={() => setFullscreenCode(false)}
        >
          ✕ Close
        </button>

       
      </div>

      <pre className="fullscreen-code-content">
        {project.generated_code}
      </pre>

    </div>
  </div>
)}
</section>
      </div>
    </main>
  );

}
export default ProjectDetails;