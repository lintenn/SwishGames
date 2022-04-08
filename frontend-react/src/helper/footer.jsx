import React from 'react';
import logoSinLetras from '../static/SwishGamesLogo_sin_letras.png';

export const Footer = () => {

  return (
    <div className="container bg-light">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 my-3 border-top">
        <div className="col-md-4 d-flex align-items-center px-3">
          <span className="text-muted">© 2022 SwishGames, Inc</span>
        </div>
        <a href="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <img className="bi me-2"
            width="32"
            height="32"
            src={logoSinLetras}
            alt="logo_sin_letras"></img>
        </a>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex px-3">
          <li className="nav-item"><a href="#Home"
            className="nav-link px-2 text-muted">Home</a></li>
          <li className="nav-item"><a href="#Contact"
            className="nav-link px-2 text-muted">Contact</a></li>
          <li className="nav-item"><a href="#FAQs"
            className="nav-link px-2 text-muted">FAQs</a></li>
          <li className="nav-item"><a href="#About"
            className="nav-link px-2 text-muted">About</a></li>
        </ul>
      </footer>
    </div>
  );

};
