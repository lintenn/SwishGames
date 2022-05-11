import React, { useEffect, useState } from 'react';
import logo from '../static/SwishGamesLogo.png';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { isAuthorized } from '../helper/isAuthorized.js';
import { Global } from '../helper/Global';
import Swal from 'sweetalert2';
import socket from '../components/chat/Socket';
import '../styles/Chat.css';
import PropTypes from 'prop-types';


export const Header = ({ buscado, setBuscado }) => {

  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  const baseUrl = Global.baseUrl;
  const URIUsers = `${baseUrl}users/`;
  const [user, setUser] = useState( null );

  useEffect( () => {

    if ( isauthorized ) {

      setUser( JSON.parse( localStorage.getItem( 'user' ) ) );

    }

  }, []);

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top mat-shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand"
          to="/">
          <img src={logo}
            width="80px"
            height="50px"
            alt="Logo" >
          </img>
        </NavLink>
        <button className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse"
          id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link"
                aria-current="page"
                to="/"><i className="fa-solid fa-gamepad"></i> Juegos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"
                to="/lists"><i className="fa-solid fa-rectangle-list"></i> Listas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"
                to="/users"><i className="fa-solid fa-users"></i> Usuarios</NavLink>
            </li>
          </ul>
          <div
            className="d-flex m-2"
            id="div-buscar-juegos-header">
            <input className="form-control me-2"
              id="input-buscar-juegos-header"
              type="search"
              name="titulo"
              placeholder="Buscar juego"
              aria-label="Search"
              value={buscado}
              onChange={ ( b ) => setBuscado( b.target.value ) }/>
          </div>
          {/**
           * Button chat
           */}
          <button className="btn btn-outline-dark m-1"
            id="btn-chat-header"
            onClick={() => {

              navigate( '/chat/' );

            } }>
            <i className="fa-solid fa-comments"></i>
          </button>
          {user !== null
            ? <Link to={'/user/' + user.nombre}>
              <button className="btn btn-outline-dark m-1">
                <i className="fa-solid fa-user"></i> {user.nombre}
              </button>
            </Link>
            : <button className="btn btn-outline-dark m-1"
              onClick={() => {

                navigate( '/login' );

              } }>
              <i className="fa-solid fa-user"></i> Identifícate
            </button>
          }

          {user !== null
            ? <button className="btn btn-outline-dark m-1"
              onClick={() => {

                axios.put( URIUsers + 'connection/' + user.nombre, {
                  online: false
                });
                socket.emit( 'mensajes' );
                localStorage.clear();
                Swal.fire( 'Has cerrado sesión', 'La sesión ha sido cerrada con éxito.', 'success' ).then( () => {

                  navigate( '/' );

                });
                setUser( null );

              } }>
              <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
            : <div></div>}
        </div>
      </div>
    </header>
  );

};

Header.propTypes = {
  setBuscado: PropTypes.func.isRequired,
  buscado: PropTypes.string.isRequired
};
