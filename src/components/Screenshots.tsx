import { useState } from 'react';
import '../styles/screenshots.css';

export const Screenshots = () => {
  const [activeScreenshot, setActiveScreenshot] = useState<number | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  
  const screenshots = [
    { image: 'https://i.postimg.cc/gk83VsDM/image1.png', caption: 'Bourg Kona' },
    { image: 'https://i.postimg.cc/4xGVBc2X/image2.png', caption: 'Rocaville' },
    { image: 'https://i.postimg.cc/gcfvLQvX/image3.png', caption: 'Centre Pokémon' },
    { image: 'https://i.postimg.cc/Kz1MRDjD/image4.png', caption: 'Grotte Casir' },
    { image: 'https://i.postimg.cc/KYqTGHGY/image5.png', caption: 'Route 5' },
    { image: 'https://i.postimg.cc/wvnsJRs8/image6.png', caption: 'Station de Ski' },
    { image: 'https://i.postimg.cc/PqxLRQWn/image7.png', caption: 'Route 8' },
    { image: 'https://i.postimg.cc/RZG6dDnT/image8.png', caption: 'Arène de Basterne' }
  ];

  const openModal = (image: string) => {
    setModalImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section className="section white" id="screenshots">
        <div className="section-container">
          <div className="section-header">
            <h2>Screenshots</h2>
          </div>
          <div className="screenshots-grid">
            {screenshots.map((screenshot, index) => (
              <div 
                key={index} 
                className="screenshot-item fade"
                onMouseEnter={() => setActiveScreenshot(index)}
                onMouseLeave={() => setActiveScreenshot(null)}
                onClick={() => openModal(screenshot.image)}
              >
                <div className="screenshot-image">
                  <img src={screenshot.image} alt={screenshot.caption} />
                  <div className="screenshot-overlay">
                    <span>{screenshot.caption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalImage && (
        <div className="screenshot-modal" onClick={closeModal}>
          <button className="modal-close" onClick={closeModal}>×</button>
          <img src={modalImage} alt="Screenshot" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
};