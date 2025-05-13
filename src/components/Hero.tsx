import '../styles/hero.css';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="fade">Pokémon Stalactite</h1>
        <p className="fade">Parcourez les terres enneigées de Citados</p>
        <div className="hero-buttons fade">
          <a href="#apropos" className="hero-button primary">Découvrir</a>
          <a href="/faq" className="hero-button secondary">Consulter la FAQ</a>
        </div>
      </div>
    </section>
  );
};