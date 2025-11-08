import { ChevronUp } from 'lucide-react';
import { useIntl } from 'react-intl';
import '../styles/footer.css';

export const Footer = () => {
  const intl = useIntl();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer" id="reseaux">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-header">
            <h2>{intl.formatMessage({ id: 'footer.joinTitle' })}</h2>
            <p>{intl.formatMessage({ id: 'footer.joinText' })}</p>
          </div>
          
          <div className="socials fade">
            <a href="https://discord.gg/44uvRcuSuq" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="https://i.postimg.cc/fbTXhNhF/discord-icon.png" alt="Discord" />
              <span>{intl.formatMessage({ id: 'footer.discord' })}</span>
            </a>
            <a href="https://youtube.com/@Yusiki_" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="https://i.postimg.cc/mZcYDBFW/youtube-icon.png" alt="YouTube" />
              <span>{intl.formatMessage({ id: 'footer.youtube' })}</span>
            </a>
            <a href="https://x.com/Yusiki_1" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="https://i.postimg.cc/4ffHKZqF/x-icon.png" alt="X" />
              <span>{intl.formatMessage({ id: 'footer.twitter' })}</span>
            </a>
          </div>
        </div>

        <button className="scroll-to-top" onClick={scrollToTop} aria-label={intl.formatMessage({ id: 'footer.scrollTop' })}>
          <ChevronUp size={24} />
        </button>
        
        <div className="copyright">
          <p>{intl.formatMessage({ id: 'footer.copy' })}</p>
        </div>
      </div>
    </footer>
  );
};