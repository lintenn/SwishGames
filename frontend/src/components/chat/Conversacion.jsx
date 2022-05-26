import Input from '@material-ui/core/Input';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import socket from './Socket';
import { Global } from '../../helper/Global';
import Swal from 'sweetalert2';
import { infoGroup } from './infoGroups/infoGroups';
import eliminarMensaje from './optionsMessage/removeMessage';
import editarMensaje from './optionsMessage/editMessage';
import reenviarMensaje from './optionsMessage/resendMessage';
import copiarMensaje from './optionsMessage/copyMessage';
import editarImagen from './optionsMessage/editImage';
import enviarImagen from './attach/newImage';

export const Conversacion = ({ users, mensajes, user, receptor, conexion, mensajesDESC, mensaje, setMensaje, group, myGroups, setGroup, setReceptor, setConexion, responder, setResponder }) => {

  let nombreAnterior = '';
  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}chats/`;
  const messageEndRef = useRef( null );
  const [idMensajeRespuesta, setIdMensajeRespuesta] = useState( '' );
  const [mensajeRespuesta, setMensajeRespuesta] = useState( '' );
  const [imagenRespuesta, setImagenRespuesta] = useState( '' );
  const [nombreMensajeRespuesta, setNombreMensajeRespuesta] = useState( '' );

  useEffect( () => {

    messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

  }, [mensajes, user, receptor, conexion, mensajesDESC, mensaje, setMensaje, group]);

  useEffect( () => {

    document.getElementById( 'div-buscar-juegos-header' ).classList.add( 'ocultar' );
    document.getElementById( 'input-buscar-juegos-header' ).classList.add( 'ocultar' );

    messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

  });

  const formatDate = ( mensaje ) => {

    nombreAnterior = mensaje.nombre_usuario_emisor;
    const date = mensaje.fecha_envio;
    const d = new Date( date );
    return d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + ( d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes() );

  };

  const getOrientation = ( user, mensaje ) => !mensaje.administracion ? user.nombre === mensaje.nombre_usuario_emisor ? 'justify-content-end' : 'justify-content-start' : 'justify-content-center';
  const getOrigenMensaje = ( user, mensaje ) => !mensaje.administracion ? user.nombre === mensaje.nombre_usuario_emisor ? 'mensajeActualizadoMio' : 'mensajeActualizadoOtro' : 'mensajeAdministracion';
  const getOrigenMensajeRespuesta = ( mensaje ) => mensaje.nombre_usuario_emisor === user.nombre ? 'mensajeRespuestaMio' : 'mensajeRespuestaOtro';


  const getMargen = ( mensaje ) => {

    let margin = '';
    ( nombreAnterior === mensaje.nombre_usuario_emisor && !mensaje.administracion ) ? margin = 'mt-0' : margin = 'mt-4';
    return margin;

  };

  const getEnlace = ( mensaje ) => {

    let enlace = '#';

    enlace += mensaje.respuesta;

    return enlace;

  };

  const setConection = ( rec ) => {

    users.forEach( ( us ) => {

      if ( us.nombre === rec ) {

        if ( us.online ) {

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

  const eliminarEspaciosMensajes = ( mensaje ) => {

    let mensajeNuevo = '';


    while ( mensajeNuevo.length < mensaje.length ) {

      mensajeNuevo += ' ';

    }

    return mensajeNuevo !== mensaje;


  };

  const submit = async ( e ) => {

    e.preventDefault();
    if ( eliminarEspaciosMensajes( mensaje ) ) {

      Swal.showLoading();
      if ( document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ) !== null ) {

        document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ).classList.remove( 'chatSeleccionado' );

      }
      if ( receptor === '' && group !== {}) {

        if ( responder ) {

          if ( mensajeRespuesta !== '' ) {

            await axios.post( URI, { nombre_usuario_emisor: user.nombre, id_grupo_receptor: group.id, mensaje: mensaje, respuesta: idMensajeRespuesta, mensajeRespuesta, nombreEmisorRespuesta: nombreMensajeRespuesta });

          } else {

            await axios.post( URI, { nombre_usuario_emisor: user.nombre, id_grupo_receptor: group.id, mensaje: mensaje, respuesta: idMensajeRespuesta, imagenRespuesta: imagenRespuesta, nombreEmisorRespuesta: nombreMensajeRespuesta });

          }

          setResponder( false );
          setIdMensajeRespuesta( '' );
          setMensajeRespuesta( '' );
          setImagenRespuesta( '' );
          setNombreMensajeRespuesta( '' );
          document.querySelector( '#botonResponder' ).classList.add( 'ocultar' );

        } else {

          await axios.post( URI, { nombre_usuario_emisor: user.nombre, id_grupo_receptor: group.id, mensaje: mensaje });

        }

      } else {

        if ( responder ) {

          if ( mensajeRespuesta !== '' ) {

            await axios.post( URI, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: receptor, mensaje: mensaje, respuesta: idMensajeRespuesta, mensajeRespuesta, nombreEmisorRespuesta: nombreMensajeRespuesta });

          } else {

            await axios.post( URI, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: receptor, mensaje: mensaje, respuesta: idMensajeRespuesta, imagenRespuesta: imagenRespuesta, nombreEmisorRespuesta: nombreMensajeRespuesta });

          }

          setResponder( false );
          setIdMensajeRespuesta( '' );
          setMensajeRespuesta( '' );
          setImagenRespuesta( '' );
          setNombreMensajeRespuesta( '' );
          document.querySelector( '#botonResponder' ).classList.add( 'ocultar' );

        } else {

          await axios.post( URI, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: receptor, mensaje: mensaje });

        }

      }
      socket.emit( 'mensaje' );
      setMensaje( '' );

      Swal.close();

    } else {

      Swal.fire( 'Mensaje vacío', 'No se puede enviar un mensaje vacío', 'error' );

    }

  };

  const fotoPerfil = () => {

    let imagen = '';

    if ( ( group.nombre !== undefined && receptor === '' ) ) {

      imagen =
              <img src={group.imagen}
                alt="avatar"
                className="d-flex align-self-center me-3 imagen-perfil-chat"
                width="80"
                height="80" />;

    } else if ( ( group.length === undefined && receptor !== '' ) ) {


      users.forEach( ( user ) => {

        if ( user.nombre === receptor ) {

          imagen =
          <img src={user.imagen}
            alt="avatar"
            className="d-flex align-self-center me-3 imagen-perfil-chat"
            width="80"
            height="80" />;


        }

      });

    }

    return imagen;

  };

  const setMiembrosGrupo = ( id ) => {

    axios.get( `${baseUrl}participantsGroups/users/${id}` )
      .then( res => {

        infoGroup( myGroups, id, id !== undefined ? '' : receptor, users, res.data, user, setGroup, setReceptor, setConection );

      });

  };

  const mostrarOpcionesMensaje = ( mensaje ) => {

    let opciones = '';


    if ( mensaje.mensaje !== null ) {

      opciones += `
                  <br/>
                  <br/>
                  <button class="btn btn-success btn-block" id="copiarMensaje">Copiar Mensaje</button>
                  `;

    }

    if ( mensaje.nombre_usuario_emisor === user.nombre ) {

      opciones += `
                  <br/>
                  <br/>
                  <button class="btn btn-primary btn-block" id="editarMensaje">Editar Mensaje</button>
                  <br/>
                  <br/>
                  <button class="btn btn-danger btn-block" id="eliminarMensaje">Eliminar Mensaje</button>`;

    }

    Swal.fire({
      title: 'Opciones',
      html: `<div class="col-12">
                <button class="btn btn-primary btn-block" id="responderMensaje">Responder Mensaje</button>
                <br/>
                <br/>
                <button class="btn btn-primary btn-block" id="reenviarMensaje">Reenviar Mensaje</button>
                ${opciones}
              </div>`,
      background: '#f0eeee',
      showCloseButton: true,
      closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: false,
      didOpen: () => {

        if ( mensaje.nombre_usuario_emisor === user.nombre ) {

          document.querySelector( '#editarMensaje' ).addEventListener( 'click', () => {

            if ( mensaje.mensaje !== null ) {

              editarMensaje( mensaje );

            } else {

              editarImagen( mensaje );

            }

          });

          document.querySelector( '#eliminarMensaje' ).addEventListener( 'click', () => {

            eliminarMensaje( mensaje );

          });

        }

        if ( mensaje.mensaje !== null ) {

          document.querySelector( '#copiarMensaje' ).addEventListener( 'click', () => {

            copiarMensaje( mensaje, users, myGroups, user );

          });

        }

        document.querySelector( '#reenviarMensaje' ).addEventListener( 'click', () => {

          reenviarMensaje( mensaje, users, myGroups, user );

        });

        document.querySelector( '#responderMensaje' ).addEventListener( 'click', () => {

          setResponder( true );
          setIdMensajeRespuesta( mensaje.id );
          if ( mensaje.mensaje !== null ) {

            setMensajeRespuesta( mensaje.mensaje );
            setImagenRespuesta( '' );

          } else {

            setMensajeRespuesta( '' );
            setImagenRespuesta( mensaje.imagen );

          }
          setNombreMensajeRespuesta( mensaje.nombre_usuario_emisor );
          document.querySelector( '#botonResponder' ).classList.remove( 'ocultar' );
          Swal.close();

        });

      }
    });

  };

  const mostrarPosibilidadesEnviar = () => {

    Swal.fire({
      html: `<div class="col-12">
                <button class="btn btn-primary btn-block" id="enviarImagen">Enviar Imagen</button>
              </div>`,
      background: '#f0eeee',
      showCloseButton: true,
      closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: false,
      didOpen: () => {


        document.querySelector( '#enviarImagen' ).addEventListener( 'click', () => {

          enviarImagen( user, receptor, group );

        });

      }
    });

  };

  return (
    <div className="col-md-6 col-lg-7 col-xl-8 row-10"
      id="panelChat">
      <div className="divNameUser">
        <h3 className="h3NameUser">
          <button className="botonTransparente divObjectsSend align-items-center"
            onClick={() => setMiembrosGrupo( group.id )}>
            <div id="imagenUser">
              {fotoPerfil()}
            </div>
            <b><div id="labelNameUser">{ ( group !== {} && receptor === '' ) ? group.nombre : receptor }</div></b>
          </button>
          {conexion}
        </h3>
      </div>
      <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatMensajes">
        <div className="pt-3 pe-3 mh-100"
          id="divRef"
          data-mdb-perfect-scrollbar="true"
          position= "relative"
          overflow-y="scroll">
          {
            mensajes.length !== 0 && mensajes.map( ( mensaje, index ) => (

              ( mensaje.nombre_usuario_emisor === user.nombre && mensaje.nombre_usuario_receptor === receptor ) || ( mensaje.nombre_usuario_receptor === user.nombre && mensaje.nombre_usuario_emisor === receptor ) || group.id === mensaje.id_grupo_receptor
                ? <div className={`d-flex flex-row ${getOrientation( user, mensaje )}`}
                  id={mensaje.id}
                  key = {index}>
                  <div className={`d-flex flex-row ${getOrigenMensaje( user, mensaje )} ${getMargen( mensaje )}`}>
                    <div className="pt-1 tamañoMaximoMensaje">
                      {( group !== {} && receptor === '' && mensaje.nombre_usuario_emisor !== user.nombre && mensaje.nombre_usuario_emisor !== nombreAnterior && !mensaje.administracion )
                        ? <p className="fw-bold mb-0">{mensaje.nombre_usuario_emisor}</p>
                        : <div></div>}
                      {mensaje.respuesta !== null
                        ? mensaje.mensajeRespuesta !== null
                          ? <a href={getEnlace( mensaje )}>
                            <div className={getOrigenMensajeRespuesta( mensaje )}>
                              <p className="fw-bold mb-0">{mensaje.nombreEmisorRespuesta}</p>
                              <p className="small cols-12">{mensaje.mensajeRespuesta}</p>
                            </div>
                          </a>
                          : <a href={getEnlace( mensaje )}>
                            <div className={getOrigenMensajeRespuesta( mensaje )}>
                              <p className="fw-bold mb-0">{mensaje.nombreEmisorRespuesta}</p>
                              <p className="small cols-12">
                                <img alt="imagenEnviada"
                                  src={mensaje.imagenRespuesta}
                                  className="tamañoMaximoImagen"></img>
                              </p>
                            </div>
                          </a>
                        : <div></div>}
                      {mensaje.mensaje !== null
                        ? <p className="small cols-12">{mensaje.mensaje}</p>
                        : <p className="small cols-12">
                          <img alt="imagenEnviada"
                            src={mensaje.imagen}
                            className="tamañoMaximoImagen"></img>
                        </p>}
                    </div>
                    <div className="pt-1">
                      {mensaje.editado ? <p className="small text-muted mb-1 cols-4 tamnyoHora">Editado</p> : <div></div>}
                      {mensaje.reenviado ? <p className="small text-muted mb-1 cols-4 tamnyoHora">Reenviado</p> : <div></div>}
                      <p className="small text-muted mb-1 cols-4 tamnyoHora">{formatDate( mensaje )}</p>
                    </div>
                    {!mensaje.administracion
                      ? <li className=" d-none nav-item">
                        <button className="btn nav-link"
                          id="navbarDropdownBtnChat"
                          role="button"
                          aria-expanded="false"
                          onClick={() => mostrarOpcionesMensaje( mensaje )}>
                          <svg xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="15"
                            fill="currentColor"
                            className="bi bi-three-dots-vertical">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                          </svg>
                        </button>
                      </li>
                      : <div></div>}

                  </div>
                </div>
                : <div key = {index}></div>
            ) )
          }
          <div ref={messageEndRef}/>
        </div>
      </div>


      <div className="text-muted d-flex justify-content-start pe-3 pt-3 mt-2 divObjectsSend">
        <Input className="input2"
          id="inputMensaje-enviar-chat"
          type="text"
          value={mensaje}
          placeholder="Escribe un mensaje aquí"
          onChange={( e ) => setMensaje( e.target.value )}
        />
        <div className="ocultar"
          id="botonResponder">
          <button className="ms-3 botonTransparente divObjectsSend align-items-center"
            onClick={() => {

              setResponder( false );
              setIdMensajeRespuesta( '' );
              setMensajeRespuesta( '' );
              setImagenRespuesta( '' );
              setNombreMensajeRespuesta( '' );
              document.querySelector( '#botonResponder' ).classList.add( 'ocultar' );

            }}>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-x responseIcon"
              viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            Responder</button>
        </div>
        <button className="btn ms-1 text-muted divObjectsSend align-items-center"
          onClick={() => mostrarPosibilidadesEnviar()}><i className="fas fa-paperclip clipIcon"></i></button>
        <form method="post"
          onSubmit={submit}>
          <button className="ms-3 botonTransparente divObjectsSend align-items-center"
            type="submit"
            id="botonEnviar"><i className="fas fa-paper-plane sendIcon"></i></button>
        </form>
      </div>
    </div>
  );

};

Conversacion.propTypes = {
  users: PropTypes.array.isRequired,
  mensajes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  receptor: PropTypes.string.isRequired,
  conexion: PropTypes.node.isRequired,
  mensajesDESC: PropTypes.array.isRequired,
  mensaje: PropTypes.string.isRequired,
  setMensaje: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  myGroups: PropTypes.array.isRequired,
  setGroup: PropTypes.func.isRequired,
  setReceptor: PropTypes.func.isRequired,
  setConexion: PropTypes.func.isRequired,
  responder: PropTypes.bool.isRequired,
  setResponder: PropTypes.func.isRequired
};
