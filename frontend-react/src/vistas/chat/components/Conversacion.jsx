import Input from '@material-ui/core/Input';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import socket from './Socket';
import { Global } from '../../../helper/Global.js';
import { eventKeyboard } from './eventsKeyboard';

export const Conversacion = ({ mensajes, user, receptor, conexion, mensajesDESC, mensaje, setMensaje }) => {

  let nombreAnterior = '';
  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}chats/`;
  let numeroMensajeUser = 0;
  const divRef = useRef( null );

  useEffect( () => {

    divRef.current.scrollIntoView({ behavior: 'smooth' });

  }, [mensajes, user, receptor, conexion, mensajesDESC, mensaje, setMensaje]);

  useEffect( () => {

    const result = document.querySelector( '.d-flex.flex-row.justify-content-end' );
    document.getElementById( 'btn-chat-header' ).classList.add( 'ocultar' );
    document.getElementById( 'div-buscar-juegos-header' ).classList.add( 'ocultar' );
    document.getElementById( 'input-buscar-juegos-header' ).classList.add( 'ocultar' );

    if ( result !== null && result.length > 0 ) {

      console.log( result );
      result[result.length - 1].scrollIntoView({ behavior: 'smooth' });

    }

  });

  useEffect( () => {

    document.getElementById( 'inputMensaje' ).addEventListener( 'keydown', function ( event ) {

      numeroMensajeUser = eventKeyboard( event, setMensaje, mensajesDESC, user, receptor, numeroMensajeUser );

    }, false );


  }, [mensajesDESC, receptor]);


  const formatDate = ( date ) => {

    const d = new Date( date );
    return d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + ( d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes() );

  };

  const getOrientation = ( user, mensaje ) => user.nombre === mensaje.nombre_usuario_emisor ? 'justify-content-end' : 'justify-content-start';
  const getOrigenMensaje = ( user, mensaje ) => user.nombre === mensaje.nombre_usuario_emisor ? 'mensajeActualizadoMio' : 'mensajeActualizadoOtro';


  const getMargen = ( mensaje ) => {

    let margin = '';
    nombreAnterior === mensaje.nombre_usuario_emisor ? margin = 'mt-0' : margin = 'mt-4';
    nombreAnterior = mensaje.nombre_usuario_emisor;
    return margin;

  };

  const submit = async ( e ) => {

    e.preventDefault();
    if ( mensaje !== '' ) {

      await axios.post( URI, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: receptor, mensaje: mensaje });
      socket.emit( 'mensaje' );
      setMensaje( '' );

    }

  };

  return (
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
          <b><div id="labelNameUser">{ receptor }</div></b>
          {conexion}
        </h3>
      </div>
      <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatMensajes">
        <div className="pt-3 pe-3 mh-100"
          data-mdb-perfect-scrollbar="true"
          position= "relative"
          overflow-y="scroll">
          {
            mensajes.length !== 0 && mensajes.map( ( mensaje, index ) => (

              ( mensaje.nombre_usuario_emisor === user.nombre && mensaje.nombre_usuario_receptor === receptor ) || ( mensaje.nombre_usuario_receptor === user.nombre && mensaje.nombre_usuario_emisor === receptor )
                ? <div className={`d-flex flex-row ${getOrientation( user, mensaje )}`}
                  key = {index}>
                  <div className={`d-flex flex-row ${getOrigenMensaje( user, mensaje )} ${getMargen( mensaje )}`}>
                    <div className="pt-1 tamañoMaximoMensaje">
                      <p className="small cols-4">{mensaje.mensaje}</p>
                    </div>
                    <div className="pt-1">
                      <p className="small text-muted mb-1 cols-4 tamañoHora">{formatDate( mensaje.fecha_envio )}</p>
                    </div>
                  </div>
                </div>
                : <div key = {index}></div>
            ) )
          }
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
  );

};

// conexion is a html element

Conversacion.propTypes = {
  mensajes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  receptor: PropTypes.string.isRequired,
  conexion: PropTypes.node.isRequired,
  mensajesDESC: PropTypes.array.isRequired,
  mensaje: PropTypes.string.isRequired,
  setMensaje: PropTypes.func.isRequired
};
