import { useIntl } from 'react-intl';
import '../styles/starters.css';

export const Starters = () => {
  const intl = useIntl();

  const starters = [
    {
      nameKey: 'starters.cherbi.name',
      image: '/images/001_Cherbi_artwork.png',
      typeKey: 'starters.cherbi.type',
    },
    {
      nameKey: 'starters.feuriglou.name',
      image: '/images/004_Feurigloup_artwork_return.png',
      typeKey: 'starters.feuriglou.type',
    },
    {
      nameKey: 'starters.lebullio.name',
      image: '/images/007_Lebullio_artwork_return.png',
      typeKey: 'starters.lebullio.type',
    }
  ];

  return (
    <section className="section gray" id="starters">
      <div className="section-container">
        <div className="section-header">
          <h2>{intl.formatMessage({ id: 'starters.headerTitle' })}</h2>
        </div>
        <div className="starters-container">
          <div className="starters-grid">
            {starters.map((starter, index) => (
              <div key={index} className="starter-card fade">
                <div className="starter-image">
                  <img 
                    src={starter.image} 
                    alt={intl.formatMessage({ id: starter.nameKey })} 
                    loading="lazy" 
                  />
                </div>
                <div className="starter-info">
                  <h3>{intl.formatMessage({ id: starter.nameKey })}</h3>
                  <span className="starter-type">
                    {intl.formatMessage({ id: starter.typeKey })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="starter-tip fade">
            <p>{intl.formatMessage({ id: 'starters.tipText' })}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
