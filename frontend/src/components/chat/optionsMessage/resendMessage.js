import axios from 'axios';
import Swal from 'sweetalert2';
import socket from '../Socket';
import { Global } from '../../../helper/Global';

const baseUrl = Global.baseUrl;
let participantesAñadidios = [];
let gruposAñadidios = [];
const URIMensajes = `${baseUrl}chats/`;

function reenviarMensaje( mensaje, users, myGroups, user ) {

  const reenviarMensaje = mensaje.mensaje === null ? 'la imagen' : 'el mensaje "' + mensaje.mensaje + '"';

  Swal.fire({
    html: `
            <div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">
                <h1>¿Estás seguro de reenviar ${reenviarMensaje}?</h1>
                <br/>
                <br/>
                <button class="btn btn-primary" id="selectParticipants">Seleccionar participantes/grupos para reenviar</button>
            </div>`,
    background: '#f0eeee',
    showCloseButton: true,
    closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    allowOutsideClick: false,
    width: '50%',
    heightAuto: false,
    didOpen: () => {

      addClickParticipantes( mensaje, users, myGroups, user );

    }
  });


}

function addClickParticipantes( mensaje, users, myGroups, user ) {

  document.querySelector( '#selectParticipants' ).addEventListener( 'click', () => {

    Swal.fire({
      html: `
    <div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">
        ${showFriendsAndGroups( users, myGroups, user )}
    </div>`,
      background: '#f0eeee',
      showCloseButton: true,
      closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: false,
      width: '50%',
      heightAuto: false,
      didOpen: () => {

        addClickResend( mensaje, users, myGroups, user );

      }
    });

  });

}

function showFriendsAndGroups( users, myGroups, user ) {

  let friends = '<hr/>Usuarios<br/><hr/>';

  users.forEach( ( us ) => {

    if ( us.nombre !== user.nombre ) {

      const descripcion = formatDescription( us.descripcion );

      friends += `
        <div class="d-flex flex-row mb-3">
        <button style="background-color: white; border-radius: 20px" name="addFriend" id="${us.nombre}Reenviar" value="${us.nombre}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
          <div class="align-items-center divObjectsSend">
            <img src=${us.imagen}
              alt="avatar"
              class="d-flex align-self-center m-3 imagen-perfil-chat"
              width="50"
              height="50" />
          </div>
          <div class="pt-1">
            <p class="fw-bold mb-0">${us.nombre}</p>
            <p class="small text-muted">${descripcion}</p>
          </div>
        </button>
      </div>`;

    }

  });

  friends += '<hr/>Grupos<br/><hr/>';


  myGroups.forEach( ( group ) => {

    if ( group.id !== 1 ) {

      const descripcion = formatDescription( group.descripcion );

      friends += `
            <div class="d-flex flex-row mb-3">
            <button style="background-color: white; border-radius: 20px" name="addGroup" id="${group.id}Reenviar" value="${group.id}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
              <div class="align-items-center divObjectsSend">
                <img src=${group.imagen}
                  alt="avatar"
                  class="d-flex align-self-center m-3 imagen-perfil-chat"
                  width="50"
                  height="50" />
              </div>
              <div class="pt-1">
                <p class="fw-bold mb-0">${group.nombre}</p>
                <p class="small text-muted">${descripcion}</p>
              </div>
            </button>
          </div>`;

    }


  });

  friends += '<button class="btn btn-primary" id="sendMessage">Reenviar mensaje</button>';

  return ( friends );

}

const formatDescription = ( descripcion ) => {

  let ultimoDescripcion = descripcion;
  if ( ultimoDescripcion.length > 15 ) {

    ultimoDescripcion = ultimoDescripcion.substring( 0, 12 );
    ultimoDescripcion += '...';

  }
  return ultimoDescripcion;

};

function addClickResend( mensaje, users, myGroups, user ) {

  document.querySelectorAll( 'button[name="addFriend"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      if ( participantesAñadidios.indexOf( boton.value ) === -1 ) {

        participantesAñadidios.push( boton.value );
        document.getElementById( `${boton.value}Reenviar` ).style.backgroundColor = '#c6daf8';

      } else {

        participantesAñadidios.splice( participantesAñadidios.indexOf( boton.value ), 1 );
        document.getElementById( `${boton.value}Reenviar` ).style.backgroundColor = '#ffffff';

      }

    });

  });

  document.querySelectorAll( 'button[name="addGroup"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      if ( gruposAñadidios.indexOf( boton.value ) === -1 ) {

        gruposAñadidios.push( boton.value );
        document.getElementById( `${boton.value}Reenviar` ).style.backgroundColor = '#c6daf8';

      } else {

        gruposAñadidios.splice( gruposAñadidios.indexOf( boton.value ), 1 );
        document.getElementById( `${boton.value}Reenviar` ).style.backgroundColor = '#ffffff';

      }

    });

  });

  document.querySelector( '#sendMessage' ).addEventListener( 'click', ( e ) => {

    e.preventDefault();

    if ( participantesAñadidios.length > 0 || gruposAñadidios.length > 0 ) {

      participantesAñadidios.forEach( ( participante ) => {

        if ( mensaje.mensaje === null ) {

          axios.post( URIMensajes, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: participante, imagen: mensaje.imagen, reenviado: 1 });

        } else {

          axios.post( URIMensajes, { nombre_usuario_emisor: user.nombre, nombre_usuario_receptor: participante, mensaje: mensaje.mensaje, reenviado: 1 });

        }

      });

      gruposAñadidios.forEach( ( participante ) => {

        if ( mensaje.mensaje === null ) {

          axios.post( URIMensajes, { nombre_usuario_emisor: user.nombre, id_grupo_receptor: participante, imagen: mensaje.imagen, reenviado: 1 });

        } else {

          axios.post( URIMensajes, { nombre_usuario_emisor: user.nombre, id_grupo_receptor: participante, mensaje: mensaje.mensaje, reenviado: 1 });

        }

      });


      participantesAñadidios = [];
      gruposAñadidios = [];

      Swal.close();

      Swal.fire({
        title: 'Mensaje reenviado',
        text: '¡El mensaje ha sido reenviado con éxito!',
        focusConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then( () => {

        socket.emit( 'mensaje' );

      });

    } else if ( participantesAñadidios.length === 0 && gruposAñadidios.length === 0 ) {

      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: '¡No has añadido a nadie a quien reenviar el mensaje! Añade al menos a alguien a quien reenviar.'
      }).then( () => {

        Swal.fire({
          html: `
          <div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">
              ${showFriendsAndGroups( users, myGroups, user )}
          </div>`,
          background: '#f0eeee',
          showCloseButton: true,
          closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
          showCancelButton: false,
          showConfirmButton: false,
          focusConfirm: false,
          allowOutsideClick: false,
          width: '50%',
          heightAuto: false,
          didOpen: () => {

            addClickResend( mensaje, users, myGroups );

          }
        });

      });

    }


  });

}

export default reenviarMensaje;
