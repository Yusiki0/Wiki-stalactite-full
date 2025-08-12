import '../styles/sections.css';

export const Protagonists = () => {
  return (
    <section className="section white" id="protagonistes">
      <div className="section-container">
        <div className="section-header">
          <h2>Protagonistes</h2>
        </div>
        <div className="content protagonistes">
          <div className="protagonists-images">
            <div className="image-container fade">
              <img src="https://i.postimg.cc/kMxydsnF/Prota-fiverr-male.png" alt="Protagoniste 1" />
            </div>
            <div className="image-container fade">
              <img src="https://i.postimg.cc/YSp0mfnm/image-prota-2.png" alt="Protagoniste 2" />
            </div>
          </div>
          <div className="text fade">
            <p>
              Au début de votre aventure vous incarnez un jeune garçon ou une jeune
              fille de 15 ans. Choisissez votre apparence selon votre préférence !
              Les PNJ réagiront en fonction de votre genre. Les artworks affichés ci-dessus ne sont pas définitifs ; un rework aura probablement lieu.
            </p>
            <div className="character-traits">
              <div className="trait">
                <span className="trait-label">Âge</span>
                <span className="trait-value">15 ans</span>
              </div>
              <div className="trait">
                <span className="trait-label">Origine</span>
                <span className="trait-value">Bourg Kona</span>
              </div>
              <div className="trait">
                <span className="trait-label">Objectif</span>
                <span className="trait-value">Collectionner les 9 badges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
