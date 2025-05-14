import '../styles/sections.css';

export const Synopsis = () => {
  return (
    <section className="section gray" id="synopsis">
      <div className="section-container">
        <div className="section-header">
          <h2>Synopsis</h2>
        </div>
        <div className="content synopsis">
          <div className="text fade">
            <p>
              Incarnez un jeune garçon ou une jeune fille, originaire du Bourg Kona, situé à l'ouest de la petite région de Citados où humains et Pokémon vivent en paix et en harmonie. Dans cette belle région, la neige tombe en abondance toute l'année.
            </p>
            <p>
              Un jour, le Professeur Yusiki vous propose de partir en voyage à la conquête des 9 badges de la région. Choisissez votre premier compagnon pour débuter votre aventure aussi palpitante qu'extraordinaire !
            </p>
            <p>
              Mais... La Team Yunaï vous barrera la route à de nombreuses reprises ! On en sait très peu de cette mystérieuse organisation, bien que des rumeurs disent qu'elle rechercherait une mystérieuse forme régionale d'Evoli... Mais pour de mauvaises intentions...
            </p>
          </div>
          <div className="image-container fade">
            <img src="https://i.postimg.cc/BZyjwF6d/image-logo.png" alt="Logo Pokémon Stalactite" />
          </div>
        </div>
      </div>
    </section>
  );
};