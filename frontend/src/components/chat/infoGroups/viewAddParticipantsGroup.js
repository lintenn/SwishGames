import Swal from 'sweetalert2';
import { Global } from '../../../helper/Global';
import axios from 'axios';
import socket from '../Socket';
import { formatMessage } from '../format/formatMessage';
import { viewParticipantsGroup } from './viewParticipantsGroup';

const baseUrl = Global.baseUrl;

export function viewAddParticipantsGroup( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, setReceptor, setConexion ) {

  Swal.fire({
    html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showAddParticipantes( userAct, participantes )}</div>`,
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

      addClickButtonAddParticipantes( groupAct, admin, receptor, usuarioReceptor, setGroup, userAct, setReceptor, setConexion );

    }

  });

}

function showAddParticipantes( user, users ) {

  let friends = '';

  users.forEach( ( us ) => {

    if ( us.nombre !== user.nombre ) {

      const descripcion = formatMessage( us.descripcion );

      friends += `
            <div class="d-flex flex-row mb-3">
              <button style="background-color: white; border-radius: 20px" name="añadir" value="${us.nombre}" id="${us.nombre}AñadirGrupo" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
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

  friends += '<button style="border-radius: 20px" class="btn btn-primary" name="añadirParticipantes">Añadir participantes seleccionados</button>';

  return ( friends );

}

function addClickButtonAddParticipantes( groupAct, admin, receptor, usuarioReceptor, setGroup, userAct, setReceptor, setConexion ) {

  const participantesAñadidos = [];

  document.querySelectorAll( 'button[name="añadir"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      if ( participantesAñadidos.indexOf( boton.value ) === -1 ) {

        participantesAñadidos.push( boton.value );
        document.getElementById( `${boton.value}AñadirGrupo` ).style.backgroundColor = '#c6daf8';

      } else {

        participantesAñadidos.splice( participantesAñadidos.indexOf( boton.value ), 1 );
        document.getElementById( `${boton.value}AñadirGrupo` ).style.backgroundColor = '#ffffff';

      }

    });

  });

  document.querySelectorAll( 'button[name="añadirParticipantes"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      if ( participantesAñadidos.length > 0 ) {

        participantesAñadidos.forEach( ( participante ) => {

          axios.post( `${baseUrl}participantsGroups/`, { id_grupo: groupAct.id, nombre_usuario: participante });
          axios.post( `${baseUrl}chats/`, { id_grupo_receptor: groupAct.id, mensaje: `${userAct.nombre} ha añadido al grupo a ${participante}`, administracion: 1 });

        });

        Swal.fire(
          '¡Añadido!',
          'Los participantes han sido añadidos',
          'success'
        ).then( () => {


          socket.emit( 'mensaje' );
          axios.get( `${baseUrl}participantsGroups/users/${groupAct.id}` )
            .then( res => {

              viewParticipantsGroup( groupAct, admin, receptor, usuarioReceptor, res.data, setGroup, userAct, setReceptor, setConexion );

            });

        });

      } else if ( participantesAñadidos.length === 0 ) {

        axios.get( `${baseUrl}participantsGroups/users/${groupAct.id}` )
          .then( res => {

            viewParticipantsGroup( groupAct, admin, receptor, usuarioReceptor, res.data, setGroup, userAct, setReceptor, setConexion );

          });

      }


    });

  });

}
