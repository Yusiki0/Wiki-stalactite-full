import { useState } from 'react';
import '../styles/faq.css';

export const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Qu'est-ce que Pokémon Stalactite ?",
      answer: "Pokémon Stalactite est un fangame Pokémon francophone développé avec PSDK et Pokémon Studio. C'est un projet non commercial créé par des fans pour les fans, proposant une nouvelle aventure dans une région enneigée unique."
    },
    {
      question: "Le jeu est-il gratuit ?",
      answer: "Oui, Pokémon Stalactite est et restera totalement gratuit. C'est un projet fan-made non commercial qui n'est pas affilié à Nintendo, Game Freak ou The Pokémon Company."
    },
    {
      question: "Une date de sortie est prévue ?",
      answer: "Une démo du fangame est actuellement en développement actif. Aucune date de sortie précise n'a encore été annoncée."
    },
    {
      question: "Quelles sont les spécificités de la région de Citados ?",
      answer: "Toute la partie ouest de la région de Citados est enneigée, proposant donc un voyage unique avec des rencontres sauvages adaptées au climat. Diverses quêtes secondaires seront disponibles, avec de nouveaux personnages encore méconnus. Une partie de l'histoire sera centrée sur une mystérieurse organisation, qui, d'après des rumeurs, ferait des exprériences illégales sur des Pokémon innocents, à des fins obscures."
    },
    {
      question: "Y aura-t-il des Pokémon exclusifs à Stalactite ?",
      answer: "Oui, le jeu proposera quelques formes régionales uniques, très souvent de type glace."
    },
    {
      question: "Quelles sont les configurations requises ?",
      answer: "Le jeu sera jouable uniquement sur PC (Windows)."
    },
    {
      question: "Peut-on participer au développement du jeu ?",
      answer: "Le développement principal est géré par Yusiki, mais plusieurs personnes contribuent sur le côté artistique ou même scénaristique. Si vous souhaitez vous aussi contribuer (bénévolement), ouvrez un ticket sur le serveur Discord !"
    },
    {
      question: "Y aura-t-il des mises à jour après la sortie ?",
      answer: "Oui, nous prévoyons de maintenir et d'améliorer le jeu après sa sortie avec des corrections de bugs et potentiellement du contenu supplémentaire."
    },
    {
      question: "Le jeu sera-t-il disponible dans d'autres langues ?",
      answer: "Pour le moment, Pokémon Stalactite est prévu uniquement en français. Des traductions pourront être envisagées après la sortie selon l'accueil du jeu."
    },
    {
      question: "Comment signaler un bug ou faire une suggestion ?",
      answer: "Le meilleur moyen est de rejoindre notre serveur Discord où vous pourrez interagir directement avec l'équipe de développement et la communauté."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Foire Aux Questions</h1>
        <p>Retrouvez ici les réponses aux questions les plus fréquentes sur Pokémon Stalactite.</p>
      </div>
      <div className="faq-container">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className={`faq-item ${openQuestion === index ? 'open' : ''}`}
            onClick={() => toggleQuestion(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              <span className="faq-icon">{openQuestion === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="faq-footer">
        <p>Vous ne trouvez pas la réponse à votre question ?</p>
        <a href="https://discord.gg/44uvRcuSuq" className="faq-contact-button">Contactez-nous sur Discord</a>
      </div>
    </div>
  );
};