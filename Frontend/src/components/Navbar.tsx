function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="logo">THUNDERFLOW</h1>

        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/login" className="nav-button">
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;