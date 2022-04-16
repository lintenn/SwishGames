import Swal from 'sweetalert2';
import axios from 'axios';
import React from 'react';
import { chatUsers } from './newChat';
import { Global } from '../../helper/Global';

let participantesAñadidios = [];
const baseUrl = Global.baseUrl;

export const chatGroups = ( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection ) => {

  participantesAñadidios = [];
  Swal.fire({
    html: `<div style="background-color: #f0eeee">${showCreateNewGroup( user, users )}</div>`,
    background: '#f0eeee',
    showCloseButton: true,
    closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    width: '25%',
    didOpen: () => {

      addClickButtonNewGroup( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection );

    }

  });


};

function showCreateNewGroup() {

  let formGroup = '';

  formGroup += `
      <br/>
      <h1>Crear nuevo grupo</h1>
      <br/>
      <br/>
      Nombre
      <br/>
      <input type="text" id="nameNewGroup"/>
      <br/>
      <br/>
      <button style="background-color: white; border-radius: 20px" name="newGroup">Siguiente</button>
    `;

  return ( formGroup );

}

const addClickButtonNewGroup = ( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection ) => {

  document.querySelectorAll( 'button[name="newGroup"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();
      if ( document.getElementById( 'nameNewGroup' ).value !== '' ) {

        axios.post( URIGroup, { nombre: document.getElementById( 'nameNewGroup' ).value, nombre_creador: user.nombre });

        Swal.close();
        Swal.fire({
          html: `<div style="background-color: #f0eeee">${showFriends( user, users )}</div>`,
          background: '#f0eeee',
          showCloseButton: false,
          closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
          showCancelButton: false,
          showConfirmButton: false,
          focusConfirm: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          width: '25%',
          didOpen: () => {

            addClickButton( URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection );

          }

        });

      } else {

        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'El nombre del grupo no puede estar vacio!'
        }).then( () => {

          Swal.fire({
            html: `<div style="background-color: #f0eeee">${showCreateNewGroup( user, users )}</div>`,
            background: '#f0eeee',
            showCloseButton: true,
            closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            width: '25%',
            didOpen: () => {

              addClickButtonNewGroup( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection );

            }

          });

        });

      }

    });

  });

};

function showFriends( user, users ) {

  let friends = '';

  users.forEach( ( us ) => {

    if ( us.nombre !== user.nombre ) {

      friends += `
        <div class="d-flex flex-row mb-3">
          <button style="background-color: white; border-radius: 20px" name="añadir" value="${us.nombre}" id="${us.nombre}AñadirGrupo" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
            <div class="align-items-center divObjectsSend">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                alt="avatar"
                class="d-flex align-self-center me-3"
                width="60"/>
            </div>
            <div class="pt-1">
              <p class="fw-bold mb-0">${us.nombre}</p>
            </div>
          </button>
        </div>`;

    }

  });

  friends += '<button style="background-color: white; border-radius: 20px" name="añadirParticipantes">Añadir participantes al grupo</button>';

  return ( friends );

}

const addClickButton = ( URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection ) => {

  document.querySelectorAll( 'button[name="añadir"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      if ( participantesAñadidios.indexOf( boton.value ) === -1 ) {

        participantesAñadidios.push( boton.value );
        document.getElementById( `${boton.value}AñadirGrupo` ).style.backgroundColor = '#c6daf8';

      } else {

        participantesAñadidios.pop( boton.value );
        document.getElementById( `${boton.value}AñadirGrupo` ).style.backgroundColor = '#ffffff';

      }

    });

  });

  document.querySelectorAll( 'button[name="añadirParticipantes"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ).classList.remove( 'chatSeleccionado' );
      if ( participantesAñadidios.length > 0 ) {

        participantesAñadidios.push( user.nombre );

        participantesAñadidios.forEach( ( participante ) => {

          axios.get( URIGroupLastByNameUser )
            .then( res => {

              setGroup( res.data );
              setReceptor( '' );
              setMiembrosGrupo( res.data.id, URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection );
              console.log( res.data );
              axios.post( URIparticipantsGroups, { id_grupo: res.data.id, nombre_usuario: participante });

            });

        });
        Swal.close();

        Swal.fire({
          title: 'Grupo creado',
          text: '¡El grupo ha sido creado con éxito!',
          focusConfirm: false,
          allowOutsideClick: false,
          allowEscapeKey: false
        });

      } else if ( participantesAñadidios.length === 0 ) {

        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: '¡No has añadido ningun participante al grupo! Añade al menos un participante.'
        }).then( () => {

          Swal.fire({
            html: `<div style="background-color: #f0eeee">${showFriends( user, users )}</div>`,
            background: '#f0eeee',
            showCloseButton: false,
            closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            width: '25%',
            didOpen: () => {

              addClickButton( URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user );

            }

          });

        });

      }


    });

  });

};

const setMiembrosGrupo = ( id, URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection ) => {

  axios.get( `${baseUrl}participantsGroups/users/${id}` )
    .then( res =>
      setConfigurationGroups(
        <div className="dropdown">
          <button className="botonTransparente2 btnAñadirChats"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </button>
          <ul className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1">
            <li><button className="dropdown-item"
              onClick={() => chatUsers( user, res.data, receptor, setReceptor, setConection, group )}>Ver miembros del grupo</button></li>
          </ul>
        </div> ) );


};
