import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    login(response.data.token);

    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="auth-label">THUNDERFLOW</p>

          <h1>Welcome back</h1>

          <p>Sign in to continue to your workspace.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              className="input"
            />
          </div>

          <button type="submit" className="button button-primary submit-button">
            Sign In
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <a href="/register">Create one</a>
        </p>
      </div>
    </main>
  );
}

export default Login;