import React, { useState, useEffect } from 'react';
import socket from './componentes/Socket';
import './Chat.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAuthorized } from '../../helper/isAuthorized.js';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const URI = 'http://localhost:8000/chats/';
const URIUsers = 'http://localhost:8000/users/';

// const URI = 'https://swishgames-backend.herokuapp.com/chats/';
// const URIUsers = 'https://swishgames-backend.herokuapp.com/users/';

const Chat = () => {

  const [mensaje, setMensaje] = useState( '' );
  const [mensajes, setMensajes] = useState([]);
  const [mensajesDESC, setMensajesDESC] = useState([]);
  const [users, setUsers] = useState([]);
  const [receptor, setReceptor] = useState( '' );
  const [nombre, setNombre] = useState( '' );
  const [conexion, setConexion] = useState( '' );
  const isauthorized = isAuthorized();
  const navigate = useNavigate();

  useEffect( () => {

    if ( !isauthorized ) {

      Swal.fire( 'No has iniciado sesión', 'Inicia sesión.' );
      navigate( '/login/login' );

    } else {

      const token = localStorage.getItem( 'user' );
      const user = JSON.parse( token );
      setNombre( user.nombre );

    }

  });

  useEffect( () => {

    socket.emit( 'conectado', nombre );

  }, [nombre]);

  useEffect( () => {

    socket.on( 'mensajes', () => {

      getMensajes();
      getUsers();

    });

    return () => {

      socket.off();

    };

  }, [mensajes, users]);

  useEffect( () => {

    setConection( receptor );

  }, [users]);

  useEffect( () => {

    getUsers();
    getMensajes();

  }, []);

  // procedimineto para obtener todos los usuarios
  const getMensajes = async () => {

    const res = await axios.get( URI );
    setMensajes( res.data );
    const res2 = await axios.get( URI + 'fecha' );
    setMensajesDESC( res2.data );

  };

  const getUsers = async () => {

    const res = await axios.get( URIUsers );
    setUsers( res.data );

  };

  const setConection = ( rec ) => {

    users.forEach( ( user ) => {

      if ( user.nombre === rec ) {

        if ( user.online ) {

          setConexion(
            <div id="divOnline">
              <div id="online"></div>
                            Online
            </div> );

        } else {

          setConexion(
            <div id="divOffline">
              <div id="offline"></div>
                          Offline
            </div> );

        }

      }

    });

  };


  const submit = async ( e ) => {

    e.preventDefault();
    await axios.post( URI, { nombre_usuario_emisor: nombre, nombre_usuario_receptor: receptor, mensaje: mensaje });
    socket.emit( 'mensaje' );
    setMensaje( '' );

  };

  async function showChat( rec ) {

    getUsers();
    setReceptor( rec );
    getMensajes();
    document.getElementById( 'panelChat' ).classList.add( 'mostrar' );
    setConection( rec );

  }

  function showUser() {

    Swal.fire({
      html: `<div>${showFriends()}</div>`
    }).then( () => {

      prueba();

    });

  }

  function prueba() {

    for ( let i = 0; i < document.newChats.newChat.length; i++ ) {

      if ( document.newChats.newChat[i].checked ) {

        showChat( document.newChats.newChat[i].value );

      }

    }

  }

  function showFriends() {

    let friends = '<form name="newChats">';

    users.forEach( ( user ) => {

      friends += `<input type="radio" name="newChat" value="${user.nombre}">${user.nombre}</input></h1><br/>`;

    });

    friends += '</form>';

    return ( friends );

  }

  function doButton() {

    const prueba = [];
    const users2 = [];

    mensajesDESC.forEach( ( men ) => {

      let enc = false;
      if ( men.nombre_usuario_emisor === nombre ) {

        for ( let i = 0; i < users2.length && !enc; i++ ) {

          if ( men.nombre_usuario_receptor === users2[i]) {

            enc = true;

          }

        }
        if ( !enc ) {

          users2.push( men.nombre_usuario_receptor );
          const d = new Date( men.fecha_envio );
          const s = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
          prueba.push(
            <li className="p-2 border-bottom">
              <button className="d-flex justify-content-between botonNaranja"
                onClick={() => showChat( men.nombre_usuario_receptor )}>
                <div className="d-flex flex-row">
                  <div className="align-items-center divObjectsSend">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar"
                      className="d-flex align-self-center me-3"
                      width="60"/>
                  </div>
                  <div className="pt-1">
                    <p className="fw-bold mb-0">{men.nombre_usuario_receptor}</p>
                    <p className="small text-muted">{men.mensaje}</p>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="small text-muted mb-1">{s}</p>
                </div>
              </button>
            </li> );

        }

      } else if ( men.nombre_usuario_receptor === nombre ) {

        for ( let i = 0; i < users2.length; i++ ) {

          if ( men.nombre_usuario_emisor === users2[i]) {

            enc = true;

          }

        }
        if ( !enc ) {

          users2.push( men.nombre_usuario_emisor );
          const d = new Date( men.fecha_envio );
          const s = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
          prueba.push(
            <li className="p-2 border-bottom">
              <button className="d-flex justify-content-between botonNaranja"
                onClick={() => showChat( men.nombre_usuario_emisor )}>
                <div className="d-flex flex-row">
                  <div className="align-items-center divObjectsSend">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar"
                      className="d-flex align-self-center me-3"
                      width="60"/>
                  </div>
                  <div className="pt-1">
                    <p className="fw-bold mb-0">{men.nombre_usuario_emisor}</p>
                    <p className="small text-muted">{men.mensaje}</p>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="small text-muted mb-1">{s}</p>
                </div>
              </button>
            </li> );

        }

      }

    });

    return ( prueba );

  }

  function doMessage() {

    const message = [];
    let nombreAnterior = '';

    mensajes.forEach( ( mensaje ) => {

      if ( ( mensaje.nombre_usuario_emisor === nombre && mensaje.nombre_usuario_receptor === receptor ) || ( mensaje.nombre_usuario_emisor === receptor && mensaje.nombre_usuario_receptor === nombre ) ) {

        const d = new Date( mensaje.fecha_envio );
        const s = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
        if ( mensaje.nombre_usuario_emisor === nombre ) {

          if ( nombre === nombreAnterior ) {

            message.push(
              <div className="d-flex flex-row justify-content-end">
                <div className="d-flex flex-row justify-content-end mensajeActualizadoMio">
                  <div className="pt-1">
                    <p className="small"
                      width="70%">{mensaje.mensaje}</p>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1">{s}</p>
                  </div>
                </div>
              </div>
            );

          } else {

            message.push(
              <div className="d-flex flex-row justify-content-end">
                <div className="d-flex flex-row justify-content-end mensajeActualizadoMio mt-5">
                  <div className="pt-1">
                    <p className="fw-bold mb-0">{mensaje.nombre_usuario_emisor}</p>
                    <p className="small">{mensaje.mensaje}</p>
                  </div>
                  <div className="mt-5">
                    <p className="small text-muted mb-1">{s}</p>
                  </div>
                </div>
              </div>
            );

          }

        } else {

          if ( mensaje.nombre_usuario_emisor === nombreAnterior ) {

            message.push(
              <div className="d-flex flex-row justify-content-start">
                <div className="d-flex flex-row justify-content-start mensajeActualizadoOtro">
                  <div className="pt-1">
                    <p className="small">{mensaje.mensaje}</p>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1">{s}</p>
                  </div>
                </div>
              </div>
            );

          } else {

            message.push(
              <div className="d-flex flex-row justify-content-start">
                <div className="d-flex flex-row justify-content-start mensajeActualizadoOtro mt-5">
                  <div className="pt-1">
                    <p className="fw-bold mb-0">{mensaje.nombre_usuario_emisor}</p>
                    <p className="small">{mensaje.mensaje}</p>
                  </div>
                  <div className="mt-5">
                    <p className="small text-muted mb-1">{s}</p>
                  </div>
                </div>
              </div>
            );

          }

        }
        nombreAnterior = mensaje.nombre_usuario_emisor;

      }

    });

    return ( message );

  }

  return (
    <section className="botonTransparente">
      <div className="container py-5 botonTransparente" >

        <div className="row botonTransparente">
          <div className="col-md-12 botonTransparente">

            <div className="card botonTransparente"
              id="chat3"
              border-radius= "15px">
              <div className="card-body botonTransparente">

                <div className="row botonTransparente">
                  <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 botonTransparente">

                    <div className="p-3 botonTransparente">

                      <div className="input-group rounded mb-3 botonTransparente">
                        <Input className="input3"
                          type="search"
                          size="15"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon" />
                        <span className="input-group-text border-0 botonTransparente"
                          id="search-addon">
                          <i className="fas fa-search searchIcon"></i>
                        </span>
                        <div className="dropdown">
                          <button className="btn btn-secondary botonTransparente2"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="25"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16">
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                          </button>
                          <ul className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1">
                            <li><button className="dropdown-item"
                              onClick={() => showUser()}>Add a new chat</button></li>
                            <li><a className="dropdown-item"
                              href="#">Create a new group</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatUsers">
                        <div data-mdb-perfect-scrollbar="true"
                          position= "relative"
                          height= "400px">
                          <ul className="list-unstyled mb-0">
                            {doButton()}
                          </ul>
                        </div>
                      </div>

                    </div>

                  </div>

                  <div className="col-md-6 col-lg-7 col-xl-8 ocultar row-10"
                    id="panelChat">
                    <div className="divNameUser">
                      <h3 className="h3NameUser">
                        <div id="imagenUser">
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                            alt="avatar"
                            className="d-flex align-self-center me-3"
                            width="60" />
                        </div>
                        <b><div id="labelNameUser">{receptor}</div></b>
                        {conexion}
                      </h3>
                    </div>
                    <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatMensajes">
                      <div className="pt-3 pe-3 mh-100"
                        data-mdb-perfect-scrollbar="true"
                        position= "relative"
                        overflow-y="scroll">

                        {doMessage()}

                      </div>
                    </div>

                    <div className="text-muted d-flex justify-content-start pe-3 pt-3 mt-2 divObjectsSend">
                      <Input className="input2"
                        type="text"
                        onChange={e => setMensaje( e.target.value )}
                        value={mensaje}
                        placeholder="Type message"/>
                      <a className="ms-1 text-muted divObjectsSend align-items-center"
                        href="#!"><i className="fas fa-paperclip clipIcon"></i></a>
                      <a className="ms-3 text-muted divObjectsSend align-items-center"
                        href="#!"><i className="fas fa-smile emogiIcon"></i></a>
                      <form onSubmit={submit}>
                        <button className="ms-3 botonTransparente divObjectsSend align-items-center"><i className="fas fa-paper-plane sendIcon"></i></button>
                      </form>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

  );

};
Chat.propTypes = {
  nombre: PropTypes.string.isRequired
};

export default Chat;
