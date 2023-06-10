import React, { useState } from 'react';
import Layout from '../layout';
import styles from '../../styles/aboutus.module.css';

const AboutUs = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const questions = [
    {
      question: 'Biz Kimiz?',
      answer: 'Biz bir Marmara Üniversitesi Bilgisayar Mühendisliği bölümünde öğrenci, bir adet Makine Mühendisi öğrencisi ve bir adet mezun Bilgisayar Mühendisi, bir araya gelip Vortex Game\'i hevesle yapan kişileriz.'
    },
    {
      question: 'Hedefimiz nedir',
      answer: 'Bizim hedefimiz, oyun sektöründe kendimizi geliştirmek ve oyunlarda yapılan özellikle gerçek para piyasası olan oyunlardaki adaletsizliği bitirmektir. Bir oyunun piyasasını oyuncular belirler, fakat şuanda ki sistemde piyasayı belirli kişiler kontrol altına almıştır. Biz bunu bitirmek ve daha adaletli bir oyun piyasası oluşturmak için buradayız.'
    },
    {
      question: 'Diğer sitelerden farkınız nedir?',
      answer: 'Vortex Game olarak bizi diğer sitelerden ayıran asıl olay biz oyun parasını ucuza alıp pahalıya satmak yerine, oyun parasını oyuncuların belirlediği fiyatlardan satıyoruz. Böylece oyun parası satışı yapan diğer sitelerden farklı olarak bizim oyun parası satışımızda oyuncuların kazançlı çıkmasını sağlıyoruz.'
    },
    {
      question: 'Size nasıl güvenebilirim?',
      answer: 'Vortex Game olarak piyasaya yeni girmiş bir websiteyiz, daha çok öğreneceğimiz şeyler var. Fakat şuanda ki sistemimizde oyuncuların kazançlı çıkmasını sağlıyoruz. Ayrıca bizimle iletişime geçerek bize güvenebilirsiniz.'
    },
    // Add more questions and answers here
  ];

  return (

      <div className={styles.container}>
        <h1 className={styles.heading}>About Us</h1>

        {questions.map((item, index) => (
          <div key={index} className={styles.questionWrapper}>
            <h2
              className={`${styles.question} ${activeQuestion === index ? styles.active : ''}`}
              onClick={() => toggleQuestion(index)}
            >
              {item.question}
            </h2>
            {activeQuestion === index && <p className={styles.answer}>{item.answer}</p>}
          </div>
        ))}
      </div>
  );
};

export default AboutUs;
