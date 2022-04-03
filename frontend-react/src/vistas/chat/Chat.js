import React, { useState, useEffect, useRef } from 'react';
import socket from './componentes/Socket';
import './Chat.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAuthorized } from '../../helper/isAuthorized.js';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Input from '@material-ui/core/Input';
import { doMessage } from './componentes/doMessageChat';
import { doButton } from './componentes/doButtonChat';

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
  const [grupos, setGrupos] = useState([]);
  const [gruposMios, setGruposMios] = useState([]);
  const [idGrupo, setIdGrupo] = useState( '' );
  const [nombreGrupo, setNombreGrupo] = useState( '' );
  const [nombre, setNombre] = useState( '' );
  const [conexion, setConexion] = useState( '' );
  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  let numeroMensajeUser = 0;
  let numeroMaximoUser = 0;

  useEffect( () => {

    if ( !isauthorized ) {

      Swal.fire( 'No has iniciado sesión' );
      navigate( '/' );

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

      getMensajes( receptor );
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
    getMensajes( receptor );

  }, []);

  const divRef = useRef( null );
  useEffect( () => {

    divRef.current.scrollIntoView({ behavior: 'smooth' });

  });

  useEffect( () => {

    document.getElementById( 'inputMensaje' ).addEventListener( 'keydown', function ( event ) {

      if ( event.key === 'Enter' ) {

        document.getElementById( 'botonEnviar' ).click();
        setMensaje( '' );

      } else if ( event.key === 'ArrowUp' ) {

        numeroMaximoUser = 0;

        mensajesDESC.forEach( ( mensaje ) => {

          if ( mensaje.nombre_usuario_emisor === nombre && mensaje.nombre_usuario_receptor === receptor ) {

            numeroMaximoUser = numeroMaximoUser + 1;

          }


        });

        if ( numeroMensajeUser === numeroMaximoUser && numeroMaximoUser !== 0 ) {

          let i = 1;
          mensajesDESC.forEach( ( mensaje ) => {

            if ( mensaje.nombre_usuario_emisor === nombre && mensaje.nombre_usuario_receptor === receptor ) {

              if ( i === numeroMensajeUser ) {

                setMensaje( mensaje.mensaje );

              }
              i = i + 1;

            }


          });

        } else if ( numeroMaximoUser === 0 ) {

          setMensaje( '' );

        } else {

          if ( numeroMensajeUser < numeroMaximoUser ) {

            numeroMensajeUser = numeroMensajeUser + 1;
            let i = 1;
            mensajesDESC.forEach( ( mensaje ) => {

              if ( mensaje.nombre_usuario_emisor === nombre && mensaje.nombre_usuario_receptor === receptor ) {

                if ( i === numeroMensajeUser ) {

                  setMensaje( mensaje.mensaje );

                }
                i = i + 1;

              }


            });

          }

        }


      } else if ( event.key === 'ArrowDown' ) {

        if ( numeroMensajeUser > 0 ) {

          numeroMensajeUser = numeroMensajeUser - 1;
          let i = 1;
          mensajesDESC.forEach( ( mensaje ) => {

            if ( mensaje.nombre_usuario_emisor === nombre && mensaje.nombre_usuario_receptor === receptor ) {

              if ( i === numeroMensajeUser ) {

                setMensaje( mensaje.mensaje );

              }
              i = i + 1;

            }


          });

        } else if ( numeroMensajeUser === 0 ) {

          setMensaje( '' );

        }

      }

    }, false );


  }, [mensajesDESC, receptor]);

  // procedimineto para obtener todos los usuarios
  const getMensajes = async ( rec ) => {

    const res = await axios.get( URI );
    setMensajes( res.data );
    const res2 = await axios.get( URI + 'fecha' );
    setMensajesDESC( res2.data );
    numeroMensajeUser = 0;

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
    if ( mensaje !== '' ) {

      await axios.post( URI, { nombre_usuario_emisor: nombre, nombre_usuario_receptor: receptor, mensaje: mensaje });
      socket.emit( 'mensaje' );
      setMensaje( '' );

    }

  };

  async function showChat( rec ) {

    numeroMensajeUser = 0;
    getUsers();
    setReceptor( rec );
    getMensajes( rec );
    setConection( rec );
    setMensaje( '' );

  }

  function showUser() {

    Swal.fire({
      html: `<div>${showFriends()}</div>`
    }).then( () => {

      obtenerRadioButtonChecked();

    });

  }

  function obtenerRadioButtonChecked() {

    for ( let i = 0; i < document.newChats.newChat.length; i++ ) {

      if ( document.newChats.newChat[i].checked ) {

        showChat( document.newChats.newChat[i].value );

      }

    }

  }

  function showFriends() {

    let friends = '<form name="newChats">';

    users.forEach( ( user ) => {

      friends += `
      <div class="d-flex flex-row mb-3">
        <input type="radio" name="newChat" value="${user.nombre}" class="align-items-center divObjectsSend d-flex align-self-center me-3">
          <div class="align-items-center divObjectsSend">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
              alt="avatar"
              class="d-flex align-self-center me-3"
              width="60"/>
          </div>
          <div class="pt-1">
            <p class="fw-bold mb-0">${user.nombre}</p>
          </div>
        </input>
      </div>`;

    });

    friends += '</form>';

    return ( friends );

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
                          placeholder="Busca un chat"
                          aria-label="Search"
                          aria-describedby="search-addon" />
                        <span className="input-group-text border-0 botonTransparente"
                          id="search-addon">
                          <i className="fas fa-search searchIcon"></i>
                        </span>
                        <div className="dropdown">
                          <button className="botonTransparente2 btnAñadirChats"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              className="bi bi-plus-lg"
                              viewBox="0 0 16 16">
                              <path fillRule="evenodd"
                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>
                          </button>
                          <ul className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1">
                            <li><button className="dropdown-item"
                              onClick={() => showUser()}>Nuevo chat</button></li>
                            <li><a className="dropdown-item"
                              href="#">Nuevo grupo</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatUsers">
                        <div data-mdb-perfect-scrollbar="true"
                          position= "relative"
                          height= "400px">
                          <ul className="list-unstyled mb-0">
                            {doButton( mensajesDESC, nombre, receptor, nombreGrupo, setReceptor, showChat )}
                          </ul>
                        </div>
                      </div>

                    </div>

                  </div>

                  <div className="col-md-6 col-lg-7 col-xl-8 row-10"
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

                        {doMessage( gruposMios, idGrupo, mensajes, grupos, receptor, nombre, nombreGrupo )}
                        <div ref={divRef}></div>
                      </div>
                    </div>

                    <div className="text-muted d-flex justify-content-start pe-3 pt-3 mt-2 divObjectsSend">
                      <Input className="input2"
                        type="text"
                        onChange={e => setMensaje( e.target.value )}
                        value={mensaje}
                        placeholder="Escribe un mensaja aquí"
                        id="inputMensaje"/>
                      <a className="ms-1 text-muted divObjectsSend align-items-center"
                        href="#!"><i className="fas fa-paperclip clipIcon"></i></a>
                      <a className="ms-3 text-muted divObjectsSend align-items-center"
                        href="#!"><i className="fas fa-smile emogiIcon"></i></a>
                      <form onSubmit={submit}>
                        <button className="ms-3 botonTransparente divObjectsSend align-items-center"
                          id="botonEnviar"><i className="fas fa-paper-plane sendIcon"></i></button>
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
