import React, { useEffect, useState } from 'react';
import { setUpChat } from '../../helper/SetUpChat';
import { ChatsActivos } from './components/ChatsActivos.jsx';
import { Conversacion } from './components/Conversacion.jsx';
import Swal from 'sweetalert2';
import './Chat.css';
import { isAuthorized } from '../../helper/isAuthorized.js';
import { useNavigate } from '../../../node_modules/react-router/index';
import socket from './components/Socket';
import logo from '../../static/SwishGamesLogo.png';
import logoSinLetras from '../../static/SwishGamesLogo_sin_letras.png';
import { Link } from '../../../node_modules/react-router-dom/index';
import axios from '../../../node_modules/axios/index';
import { Global } from '../../helper/Global';

export const Chat = () => {

  const [mensajesDESC, setMensajesDESC] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState( null );
  const [loading, setLoading] = useState( true );
  const [receptor, setReceptor] = useState( '' );
  const [conexion, setConexion] = useState( '' );
  const [mensaje, setMensaje] = useState( '' );
  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  const baseUrl = Global.baseUrl;
  const URIUsers = `${baseUrl}users/`;

  useEffect( () => {

    if ( !isauthorized ) {

      Swal.fire( 'No has iniciado sesión' );
      navigate( '/' );

    } else {

      setUpChat( setUser, setUsers, setMensajes, setMensajesDESC, setLoading );

    }

  }, []);

  useEffect( () => {

    socket.on( 'mensajes', () => {

      setUpChat( setUser, setUsers, setMensajes, setMensajesDESC, setLoading );

    });

    return () => {

      socket.off();

    };

  }, [mensajes, users]);

  return (
    loading
      ? <h1>Loading...</h1>
      : <body>

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
              {user !== null
                ? <Link to={'/user/' + user.nombre}>
                  <button className="btn btn-outline-dark m-1">
                    <i className="fa-solid fa-user"></i> {user.nombre}
                  </button>
                </Link>
                : <button className="btn btn-outline-dark m-1"
                  onClick={() => navigate( '/login' ) }>
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
                    Swal.fire( 'Has cerrado sesión', 'La sesión ha sido cerrada con éxito.', 'success' );

                  } }>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                : <div></div>}
            </div>
          </div>
        </header>
        <section className="botonTransparente mt-5">
          <div className="container py-5 botonTransparente" >
            <div className="row botonTransparente">
              <div className="col-md-12 botonTransparente">
                <div className="card botonTransparente"
                  id="chat3"
                  border-radius= "15px">
                  <div className="card-body botonTransparente">
                    <div className="row botonTransparente">
                      <ChatsActivos
                        users={ users }
                        mensajes={ mensajesDESC }
                        user={ user }
                        setReceptor={ setReceptor }
                        setConexion={ setConexion }
                        setMensaje={ setMensaje }
                      />
                      <Conversacion
                        mensajes={ mensajes }
                        user={ user }
                        receptor={ receptor }
                        conexion={ conexion }
                        mensajesDESC={ mensajesDESC }
                        mensaje={ mensaje }
                        setMensaje={ setMensaje }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container-fluid bg-light">
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

      </body>
  );

};
