import React, { useEffect, useState } from 'react';
import logo from '../static/SwishGamesLogo.png';
import { Link } from '../../node_modules/react-router-dom/index';
import axios from '../../node_modules/axios/index';
import { isAuthorized } from './isAuthorized.js';
import { useNavigate } from '../../node_modules/react-router/index';
import { Global } from './Global';
import Swal from 'sweetalert2';
import socket from '../vistas/chat/components/Socket';
import '../vistas/chat/Chat.css';
import PropTypes from 'prop-types';

export const Header = ({ setGames, buscado, setBuscado }) => {

  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  const baseUrl = Global.baseUrl;
  const URIUsers = `${baseUrl}users/`;
  const [user, setUser] = useState( null );

  useEffect( () => {

    if ( !isauthorized ) {

      Swal.fire( 'No has iniciado sesión' );
      navigate( '/' );

    } else {

      setUser( JSON.parse( localStorage.getItem( 'user' ) ) );

    }


  }, []);

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top mat-shadow">
      <div className="container-fluid">
        <a className="navbar-brand"
          href="#Logo">
          <img src={logo}
            width="80px"
            height="50px"
            alt="Logo" >
          </img>
        </a>
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
              <a className="nav-link active navSelected"
                aria-current="page"
                href="/"><i className="fa-solid fa-gamepad"></i> Juegos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link"
                href="#Listas"><i className="fa-solid fa-rectangle-list"></i> Listas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link"
                href="#usuarios"><i className="fa-solid fa-users"></i> Usuarios</a>
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

          <button className="btn btn-outline-dark m-1"
            id="btn-chat-header"
            onClick={() => {

              navigate( '/chat/' );
              document.getElementById( 'btn-chat-header' ).classList.add( 'ocultar' );
              document.getElementById( 'div-buscar-juegos-header' ).classList.add( 'ocultar' );
              document.getElementById( 'input-buscar-juegos-header' ).classList.add( 'ocultar' );

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
                document.getElementById( 'btn-chat-header' ).classList.remove( 'ocultar' );
                document.getElementById( 'div-buscar-juegos-header' ).classList.remove( 'ocultar' );
                document.getElementById( 'input-buscar-juegos-header' ).classList.remove( 'ocultar' );

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
                navigate( '/' );
                document.getElementById( 'btn-chat-header' ).classList.remove( 'ocultar' );
                document.getElementById( 'div-buscar-juegos-header' ).classList.remove( 'ocultar' );
                document.getElementById( 'input-buscar-juegos-header' ).classList.remove( 'ocultar' );
                Swal.fire( 'Has cerrado sesión', 'La sesión ha sido cerrada con éxito.', 'success' );

              } }>
              <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
            : <div></div>}
        </div>
      </div>
    </header>
  );

};

Header.propTypes = {
  setGames: PropTypes.func.isRequired,
  setBuscado: PropTypes.func.isRequired,
  buscado: PropTypes.string.isRequired
};
