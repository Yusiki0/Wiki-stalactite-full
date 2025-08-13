import '../styles/starters.css';

export const Starters = () => {
  const starters = [
    {
      name: 'Cherbi',
      image: '/images/001_Cherbi_artwork.png',
      type: 'Type plante / glace',
    },
    {
      name: 'Feuriglou',
      image: '/images/004_Feurigloup_artwork_return.png',
      type: 'Type feu / glace',
    },
    {
      name: 'Lébullio',
      image: '/images/007_Lebullio_artwork_return.png',
      type: 'Type eau / glace',
    }
  ];

  return (
    <section className="section gray" id="starters">
      <div className="section-container">
        <div className="section-header">
          <h2>Starters</h2>
        </div>
        <div className="starters-container">
          <div className="starters-grid">
            {starters.map((starter, index) => (
              <div key={index} className="starter-card fade">
                <div className="starter-image">
                  <img 
                    src={starter.image} 
                    alt={starter.name} 
                    loading="lazy" 
                  />
                </div>
                <div className="starter-info">
                  <h3>{starter.name}</h3>
                  <span className="starter-type">{starter.type}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="starter-tip fade">
            <p>
              Chaque starter possède un double-type incluant le type glace, leur permettant de mieux s'acclimater au froid de la région.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
