import '../styles/sections.css';
import { FormattedMessage, useIntl } from 'react-intl';

export const About = () => {
  const intl = useIntl();

  return (
    <section className="section white" id="apropos">
      <div className="section-container">
        <div className="section-header">
          <h2>{intl.formatMessage({ id: 'about.title' })}</h2>
        </div>
        <div className="content apropos">
          <div className="image-container fade">
            <img src="https://i.postimg.cc/8cFjzpyK/image-region.png" alt={intl.formatMessage({ id: 'about.title' })} />
          </div>
          <div className="text fade">
            <p>
              <FormattedMessage
                id="about.description"
                values={{
                  link: (
                    <a href="https://pokemonworkshop.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                      PSDK & Pokémon Studio
                    </a>
                  ),
                }}
              />
            </p>
            <p>{intl.formatMessage({ id: 'about.development' })}</p>
            <p>{intl.formatMessage({ id: 'about.disclaimer' })}</p>
          </div>
        </div>
      </div>
    </section>
  );
};