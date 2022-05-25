import Input from '@material-ui/core/Input';
import React, { useEffect, useRef } from 'react';
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

export const Conversacion = ({ users, mensajes, user, receptor, conexion, mensajesDESC, mensaje, setMensaje, group, myGroups, setGroup, setReceptor, setConexion }) => {

  let nombreAnterior = '';
  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}chats/`;
  const messageEndRef = useRef( null );

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


  const getMargen = ( mensaje ) => {

    let margin = '';
    ( nombreAnterior === mensaje.nombre_usuario_emisor && !mensaje.administracion ) ? margin = 'mt-0' : margin = 'mt-4';
    return margin;

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

        await axios.post( URI, { nombre_usuario_emisor: user.nombre, id_grupo_receptor: group.id, mensaje: mensaje });

      } else {

        await axios.post( URI, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: receptor, mensaje: mensaje });

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

    if ( mensaje.nombre_usuario_emisor === user.nombre ) {

      opciones = `
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
                <button class="btn btn-primary btn-block" id="reenviarMensaje">Reenviar Mensaje</button>
                <br/>
                <br/>
                <button class="btn btn-success btn-block" id="copiarMensaje">Copiar Mensaje</button>
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

            editarMensaje( mensaje );

          });

          document.querySelector( '#eliminarMensaje' ).addEventListener( 'click', () => {

            eliminarMensaje( mensaje );

          });

        }

        document.querySelector( '#reenviarMensaje' ).addEventListener( 'click', () => {

          reenviarMensaje( mensaje, users, myGroups, user );

        });

        document.querySelector( '#copiarMensaje' ).addEventListener( 'click', () => {

          copiarMensaje( mensaje, users, myGroups, user );

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
                  key = {index}>
                  <div className={`d-flex flex-row ${getOrigenMensaje( user, mensaje )} ${getMargen( mensaje )}`}>
                    <div className="pt-1 tamañoMaximoMensaje">
                      {( group !== {} && receptor === '' && mensaje.nombre_usuario_emisor !== user.nombre && mensaje.nombre_usuario_emisor !== nombreAnterior && !mensaje.administracion )
                        ? <p className="fw-bold mb-0">{mensaje.nombre_usuario_emisor}</p>
                        : <div></div>}
                      <p className="small cols-12">{mensaje.mensaje}</p>
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

      <form method="post"
        onSubmit={submit}>
        <div className="text-muted d-flex justify-content-start pe-3 pt-3 mt-2 divObjectsSend">
          <Input className="input2"
            id="inputMensaje-enviar-chat"
            type="text"
            value={mensaje}
            placeholder="Escribe un mensaje aquí"
            onChange={( e ) => setMensaje( e.target.value )}
          />
          <a className="ms-1 text-muted divObjectsSend align-items-center"
            href="#!"><i className="fas fa-paperclip clipIcon"></i></a>
          <a className="ms-3 text-muted divObjectsSend align-items-center"
            href="#!"><i className="fas fa-smile emogiIcon"></i></a>
          <button className="ms-3 botonTransparente divObjectsSend align-items-center"
            id="botonEnviar"><i className="fas fa-paper-plane sendIcon"></i></button>
        </div>
      </form>
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
  setConexion: PropTypes.func.isRequired
};
