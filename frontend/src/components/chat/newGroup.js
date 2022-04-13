import Swal from 'sweetalert2';
import axios from 'axios';

let participantesAñadidios = [];

export const chatGroups = ( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor ) => {

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

      addClickButtonNewGroup( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor );

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

const addClickButtonNewGroup = ( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor ) => {

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

            addClickButton( URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user, users, group, receptor );

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

              addClickButtonNewGroup( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor );

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

const addClickButton = ( URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user, users, group, receptor ) => {

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
