import './AboutAuthor.css';
import React from 'react';
// const aboutImage = require('../../images/my-profile.png');
import aboutImage from '../../images/my-profile.png';

const AboutAuthor = () => {
  return (
    <section className="about">
      <div className="section about__container">
        <div className="about__image-container">
          <img
            className="about__image"
            src={aboutImage}
            alt="Author's photos"
          />
        </div>
        <div className="about__text-container">
          <h2 className="about__title">About the author</h2>
          <p className="about__text">
            Hi, My name is Solomon Barayev, I am developing my final project for
            my Fullstack web development bootcamp with Practicum100 by Yandex.
            I'm excited to show you how I tie in all of my knowledge together
            both of the frontend and the backend. I hope you enjoy it! Feel free
            to reach out to me on my linkedIn profile or my github. Thank you!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutAuthor;
