import { ChevronUp } from 'lucide-react';
import '../styles/footer.css';

export const Footer = () => {
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
            <h2>Rejoignez-nous</h2>
            <p>Suivez le développement du projet sur nos réseaux sociaux</p>
          </div>
          
          <div className="socials fade">
            <a href="https://discord.gg/44uvRcuSuq" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/images/discord_icon.png" alt="Discord" />
              <span>Discord</span>
            </a>
            <a href="https://youtube.com/@Yusiki_" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/images/youtube_icon.png" alt="YouTube" />
              <span>YouTube</span>
            </a>
            <a href="https://x.com/Yusiki_1" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/images/x_icon.png" alt="X" />
              <span>Twitter</span>
            </a>
          </div>
        </div>

        <button className="scroll-to-top" onClick={scrollToTop}>
          <ChevronUp size={24} />
        </button>
        
        <div className="copyright">
          <p>© Pokémon Stalactite, 2022–2025 — Projet non lucratif et non affilié à Nintendo</p>
        </div>
      </div>
    </footer>
  );
};