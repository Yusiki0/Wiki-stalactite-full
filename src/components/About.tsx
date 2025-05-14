import '../styles/sections.css';

export const About = () => {
  return (
    <section className="section white" id="apropos">
      <div className="section-container">
        <div className="section-header">
          <h2>À propos</h2>
        </div>
        <div className="content apropos">
          <div className="image-container fade">
            <img src="https://i.postimg.cc/8cFjzpyK/image-region.png" alt="Région de Clitados" />
          </div>
          <div className="text fade">
            <p>
              Pokémon Stalactite est un fangame francophone développé à l'aide de PSDK et Pokémon Studio, conçu pour offrir aux passionnés de la licence une expérience inédite et immersive dans un univers semi-enneigé.
            </p>
            <p>
              Ce projet est actuellement en cours de développement et réalisé de manière indépendante par Yusiki, et l'aide de quelques personnes, avec passion et respect de l'œuvre originale.
            </p>
            <p>
              Pokémon Stalactite est un projet non commercial et non affilié à Nintendo, Game Freak ou The Pokémon Company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};