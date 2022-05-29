import React from 'react';
import { NavLink } from '../../node_modules/react-router-dom/index';
import logoSinLetras from '../static/SwishGamesLogo_sin_letras.png';

export const Footer = () => {

  return (
    <div className="container-fluid bg-light fixed-bottom mat-shadow tamañoFooter">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-1 my-1">
        <div className="col-md-4 d-flex align-items-center px-3">
          <span className="text-muted"
            lang="en">© 2022 SwishGames, Inc</span>
        </div>
        <NavLink to="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <img className="bi me-2"
            width="32"
            height="32"
            src={logoSinLetras}
            alt="logo_sin_letras"></img>
        </NavLink>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex px-3">
          <li className="nav-item"><a href="#Home"
            className="nav-link px-2 text-muted"><span lang="en">Home</span></a></li>
          <li className="nav-item"><a href="#Contact"
            className="nav-link px-2 text-muted"><span lang="en">Contact</span></a></li>
          <li className="nav-item"><a href="#FAQs"
            className="nav-link px-2 text-muted"><span lang="en">FAQs</span></a></li>
          <li className="nav-item"><a href="#About"
            className="nav-link px-2 text-muted"><span lang="en">About</span></a></li>
        </ul>
      </footer>
    </div>
  );

};
