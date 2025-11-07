import '../styles/sections.css';
import { useIntl } from 'react-intl';

export const Synopsis = () => {
  const intl = useIntl();

  return (
    <section className="section gray" id="synopsis">
      <div className="section-container">
        <div className="section-header">
          <h2>{intl.formatMessage({ id: 'synopsis.title' })}</h2>
        </div>
        <div className="content synopsis">
          <div className="text fade">
            <p>{intl.formatMessage({ id: 'synopsis.p1' })}</p>
            <p>{intl.formatMessage({ id: 'synopsis.p2' })}</p>
            <p>{intl.formatMessage({ id: 'synopsis.p3' })}</p>
          </div>
          <div className="image-container fade">
            <img src="https://i.postimg.cc/BZyjwF6d/image-logo.png" alt={intl.formatMessage({ id: 'hero.title' })} />
          </div>
        </div>
      </div>
    </section>
  );
};