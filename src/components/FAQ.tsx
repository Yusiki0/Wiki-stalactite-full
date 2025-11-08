import { useState } from 'react';
import { useIntl } from 'react-intl';
import '../styles/faq.css';

export const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const intl = useIntl();

  const faqItems = [
    {
      questionKey: 'faq.q1.q',
      answerKey: 'faq.q1.a'
    },
    {
      questionKey: 'faq.q2.q',
      answerKey: 'faq.q2.a'
    },
    {
      questionKey: 'faq.q3.q',
      answerKey: 'faq.q3.a'
    },
    {
      questionKey: 'faq.q4.q',
      answerKey: 'faq.q4.a'
    },
    {
      questionKey: 'faq.q5.q',
      answerKey: 'faq.q5.a'
    },
    {
      questionKey: 'faq.q6.q',
      answerKey: 'faq.q6.a'
    },
    {
      questionKey: 'faq.q7.q',
      answerKey: 'faq.q7.a'
    },
    {
      questionKey: 'faq.q8.q',
      answerKey: 'faq.q8.a'
    },
    {
      questionKey: 'faq.q9.q',
      answerKey: 'faq.q9.a'
    },
    {
      questionKey: 'faq.q10.q',
      answerKey: 'faq.q10.a'
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>{intl.formatMessage({ id: 'faq.headerTitle' })}</h1>
        <p>{intl.formatMessage({ id: 'faq.headerDesc' })}</p>
      </div>
      <div className="faq-container">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className={`faq-item ${openQuestion === index ? 'open' : ''}`}
            onClick={() => toggleQuestion(index)}
          >
            <div className="faq-question">
              <h3>{intl.formatMessage({ id: item.questionKey })}</h3>
              <span className="faq-icon">{openQuestion === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{intl.formatMessage({ id: item.answerKey })}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="faq-footer">
        <p>{intl.formatMessage({ id: 'faq.contact.question' })}</p>
        <a href="https://discord.gg/44uvRcuSuq" className="faq-contact-button">
          {intl.formatMessage({ id: 'faq.contactButton' })}
        </a>
      </div>
    </div>
  );
};