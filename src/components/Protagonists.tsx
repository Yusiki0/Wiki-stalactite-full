import { useIntl } from 'react-intl';
import '../styles/sections.css';

export const Protagonists = () => {
  const intl = useIntl();

  return (
    <section className="section white" id="protagonistes">
      <div className="section-container">
        <div className="section-header">
          <h2>{intl.formatMessage({ id: 'protagonists.title' })}</h2>
        </div>
        <div className="content protagonistes">
          <div className="protagonists-images">
            <div className="image-container fade">
              <img src="https://i.postimg.cc/kMxydsnF/Prota-fiverr-male.png" alt={intl.formatMessage({ id: 'protagonists.maleAlt' })} />
            </div>
            <div className="image-container fade">
              <img src="https://i.postimg.cc/C5hD0NVF/FEMALE-VERSION-copy.png" alt={intl.formatMessage({ id: 'protagonists.femaleAlt' })} />
            </div>
          </div>
          <div className="text fade">
            <p>{intl.formatMessage({ id: 'protagonists.p1' })}</p>
            <div className="character-traits">
              <div className="trait">
                <span className="trait-label">{intl.formatMessage({ id: 'protagonists.ageLabel' })}</span>
                <span className="trait-value">{intl.formatMessage({ id: 'protagonists.ageValue' })}</span>
              </div>
              <div className="trait">
                <span className="trait-label">{intl.formatMessage({ id: 'protagonists.originLabel' })}</span>
                <span className="trait-value">{intl.formatMessage({ id: 'protagonists.originValue' })}</span>
              </div>
              <div className="trait">
                <span className="trait-label">{intl.formatMessage({ id: 'protagonists.goalLabel' })}</span>
                <span className="trait-value">{intl.formatMessage({ id: 'protagonists.goalValue' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
