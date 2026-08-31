function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <p className="hero-label">AI-POWERED CLOUD PLATFORM</p>

        <h1 className="hero-title">
          Build.
          <br />
          Create.
          <br />
          <span>Flow.</span>
        </h1>

        <p className="hero-description">
          Transform your ideas into powerful applications with ThunderFlow.
          Generate, manage, and deploy your projects from one place.
        </p>

        <div className="hero-buttons">
          <a href="/login" className="button button-primary">
            Get Started
          </a>

          <a href="/projects" className="button button-secondary">
            Explore Projects
          </a>
        </div>
      </section>
    </main>
  );
}

export default Home;