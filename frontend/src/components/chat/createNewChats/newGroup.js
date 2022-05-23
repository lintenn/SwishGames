import Swal from 'sweetalert2';
import axios from 'axios';
import React from 'react';
import { infoGroup } from '../infoGroups/infoGroups';

let participantesAñadidios = [];

export const chatGroups = ( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection, myGroups, setIniciandoChat ) => {

  participantesAñadidios = [];
  Swal.fire({
    html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showCreateNewGroup( user, users )}</div>`,
    background: '#f0eeee',
    showCloseButton: true,
    closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    heightAuto: false,
    width: '50%',
    didOpen: () => {

      addClickButtonNewGroup( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection, myGroups, setIniciandoChat );

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
      <h3>Nombre</h3>
      <input type="text" id="nameNewGroup"/>
      <br/>
      <br/>
      <h4>¡Elige la foto de perfil del grupo!</h4>
      <Input accept="image/*" type="file" id="photo-create-group">
      <br/>
      <img src="https://res.cloudinary.com/duvhgityi/image/upload/v1650761563/FotosGrupos/585e4d1ccb11b227491c339b_1_g7fpkh.png" id="img-photo-create-group" class="align-self-center m-3 imagen-perfil-chat" width ="300" height ="300">
      <br/>
      <br/>
      <h4>Descripción del grupo</h4>
      <Input type="text" id="description-create-group">
      <br/>
      <br/>
      <button  style="border-radius: 20px" class="btn btn-primary" name="newGroup">Siguiente</button>
    `;

  return ( formGroup );

}

const addClickButtonNewGroup = ( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection, myGroups, setIniciandoChat ) => {

  let imagen = 'https://res.cloudinary.com/duvhgityi/image/upload/v1650761563/FotosGrupos/585e4d1ccb11b227491c339b_1_g7fpkh.png';

  document.querySelectorAll( 'button[name="newGroup"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();
      if ( document.getElementById( 'nameNewGroup' ).value !== '' ) {

        const descripcion = document.getElementById( 'description-create-group' ).value;

        axios.post( URIGroup, { nombre: document.getElementById( 'nameNewGroup' ).value, nombre_creador: user.nombre, imagen, descripcion });

        Swal.close();
        Swal.fire({
          html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showFriends( user, users )}</div>`,
          background: '#f0eeee',
          showCloseButton: false,
          closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
          showCancelButton: false,
          showConfirmButton: false,
          focusConfirm: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          width: '25%',
          heightAuto: false,
          didOpen: () => {

            addClickButton( URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection, myGroups, setIniciandoChat );

          }

        });

      } else {

        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'El nombre del grupo no puede estar vacio!'
        }).then( () => {

          Swal.fire({
            html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showCreateNewGroup( user, users )}</div>`,
            background: '#f0eeee',
            showCloseButton: true,
            closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            width: '50%',
            heightAuto: false,
            didOpen: () => {

              addClickButtonNewGroup( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection, myGroups, setIniciandoChat );

            }

          });

        });

      }

    });

  });

  document.querySelectorAll( 'input[type="file"]' ).forEach( ( input ) => {

    input.addEventListener( 'change', async ( e ) => {

      e.preventDefault();
      const file = e.target.files;
      const formData = new FormData();
      formData.append( 'file', file[0]);
      formData.append( 'upload_preset', 'FotosGrupos' );
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/duvhgityi/image/upload',
        {
          method: 'POST',
          body: formData
        }
      );
      const result = await res.json();
      imagen = result.secure_url;
      document.getElementById( 'img-photo-create-group' ).src = imagen;

    });


  });

};

function showFriends( user, users ) {

  let friends = '';

  users.forEach( ( us ) => {

    if ( us.nombre !== user.nombre ) {

      const descripcion = formatDescription( us.descripcion );

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

  friends += '<button style="border-radius: 20px" class="btn btn-primary" name="añadirParticipantes">Crear grupo con los participantes seleccionados</button>';

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

const addClickButton = ( URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection, myGroups, setIniciandoChat ) => {

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

      if ( document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ) !== null ) {

        document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ).classList.remove( 'chatSeleccionado' );

      }
      if ( participantesAñadidios.length > 0 ) {

        participantesAñadidios.push( user.nombre );

        participantesAñadidios.forEach( ( participante ) => {

          axios.get( URIGroupLastByNameUser )
            .then( res => {

              setGroup( res.data );
              setReceptor( '' );
              setMiembrosGrupo( res.data.id, URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user, users, res.data, receptor, setReceptor, setConexion, setConfigurationGroups, setConection, myGroups, participantesAñadidios );
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
        }).then( ( result ) => {

          setIniciandoChat( true );

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

              addClickButton( URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection, myGroups );

            }

          });

        });

      }


    });

  });

};

const setMiembrosGrupo = ( id, URIGroupLastByNameUser, setGroup, URIparticipantsGroups, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection, myGroups, participantesAñadidios ) => {

  let groups = [];

  const participants = [];

  users.forEach( ( us ) => {

    if ( participantesAñadidios.indexOf( us.nombre ) !== -1 ) {

      participants.push( us );

    }

  });

  groups = myGroups;
  groups.push( group );
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
          onClick={() => infoGroup( groups, id, '', users, participants, user, setGroup )}>Ver información del grupo</button></li>
      </ul>
    </div> );


};
