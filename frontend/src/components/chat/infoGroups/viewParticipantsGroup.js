import Swal from 'sweetalert2';
import { Global } from '../../../helper/Global';
import axios from 'axios';
import { setConection } from '../format/setConection';
import socket from '../Socket';
import { formatMessage } from '../format/formatMessage';
import { viewAddParticipantsGroup } from './viewAddParticipantsGroup';

const baseUrl = Global.baseUrl;

export function viewParticipantsGroup( groupAct, admin, participantes, setGroup, userAct, setReceptor, setConexion ) {

  Swal.fire({
    html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showMembers( participantes, admin, userAct )}</div>`,
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

      addClickButtonViewParticipantes( groupAct, admin, participantes, setGroup, userAct, setReceptor, setConexion );

    }

  });

}

function showMembers( users, admin, userAct ) {

  let friends = ' ';

  users.forEach( ( us ) => {

    const descripcion = formatMessage( us.descripcion );

    let remove = '';
    let buttonRemove = '';
    admin && us.nombre !== userAct.nombre ? remove = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/><path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/></svg>' : remove = '';
    admin && us.nombre !== userAct.nombre
      ? buttonRemove = `<button class="btn botonTransparente" name="removeParticipante" value=${us.nombre}>
                        ${remove}
                      </button>`
      : buttonRemove = '';
    const goProfile = us.nombre !== userAct.nombre ? 'newChat' : '';
    friends += `
          <div class="d-flex flex-row mb-3">
            <button style="background-color: white; border-radius: 20px" name="${goProfile}" value="${us.nombre}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
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
              ${buttonRemove}
            </button>
          </div>`;

  });

  admin ? friends += '<button style="border-radius: 20px" class="btn btn-primary" name="añadirParticipantes">Añadir participantes al grupo</button>' : friends += '';

  return ( friends );

}

function addClickButtonViewParticipantes( groupAct, admin, participantes, setGroup, userAct, setReceptor, setConexion ) {

  if ( admin ) {

    document.querySelectorAll( 'button[name="removeParticipante"]' ).forEach( ( boton ) => {

      boton.addEventListener( 'click', ( event ) => {

        event.preventDefault();
        const nombreParticipante = boton.value;

        removePartivipant( groupAct, nombreParticipante, userAct, admin, setGroup, setReceptor, setConexion );

      });

    });

    const botonAñadirParticipantes = document.querySelector( 'button[name="añadirParticipantes"]' );
    botonAñadirParticipantes.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      axios.get( `${baseUrl}participantsGroups/notUsers/${groupAct.id}` )
        .then( res => {

          viewAddParticipantsGroup( groupAct, admin, res.data, setGroup, userAct, setReceptor, setConexion );

        });


    });

  }

  document.querySelectorAll( 'button[name="newChat"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      document.querySelectorAll( '.chatSeleccionado' ).forEach( ( chat ) => {

        chat.classList.remove( 'chatSeleccionado' );

      });

      setReceptor( boton.value );

      setConection( boton.value, participantes, setConexion );
      setGroup({});
      if ( document.getElementById( `${boton.value}` ) !== null ) {

        document.getElementById( `${boton.value}` ).classList.add( 'chatSeleccionado' );

      }

      Swal.close();

    });

  });

}

function removePartivipant( groupAct, nombreParticipante, userAct, admin, setGroup, setReceptor, setConexion ) {

  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, eliminarlo!'
  }).then( ( result ) => {

    if ( result.value ) {

      axios.delete( `${baseUrl}participantsGroups/${groupAct.id}/participant/${nombreParticipante}` );
      axios.post( `${baseUrl}chats/`, { id_grupo_receptor: groupAct.id, mensaje: `${userAct.nombre} ha eliminado del grupo a ${nombreParticipante}`, administracion: 1 });

      Swal.fire(
        '¡Eliminado!',
        'El participante ha sido eliminado',
        'success'
      ).then( () => {

        socket.emit( 'mensaje' );
        axios.get( `${baseUrl}participantsGroups/users/${groupAct.id}` )
          .then( res => {

            viewParticipantsGroup( groupAct, admin, res.data, setGroup, userAct, setReceptor, setConexion );

          });

      });

    }

  });

}
