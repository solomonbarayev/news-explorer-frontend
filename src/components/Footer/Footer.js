import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import fbIcon from '../../images/facebook_icon.svg';
import ghIcon from '../../images/github_icon.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="section footer__container">
        <div className="footer__copyright-container">
          <span className="footer__copyrights">
            © {new Date().getFullYear()} Supersite, Powered by News API
          </span>
        </div>
        <div className="footer__menu">
          <nav className="footer__nav">
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/" className="footer__link">
                  Home
                </Link>
              </li>
              <li className="footer__list-item">
                <a
                  href="https://practicum.yandex.com/"
                  className="footer__link"
                >
                  Practicum
                </a>
              </li>
            </ul>
            <ul className="footer__social">
              <li className="footer__social-icon">
                <a
                  href="https://github.com/solomonbarayev/</li>"
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={ghIcon}
                    alt="github icon"
                    className="footer__icon"
                  />
                </a>
              </li>
              <li className="footer__social-icon">
                <a
                  href="https://www.facebook.com/solomon.barayev.7"
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={fbIcon}
                    alt="facebook icon"
                    className="footer__icon"
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
