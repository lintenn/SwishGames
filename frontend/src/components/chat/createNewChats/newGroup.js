import Swal from 'sweetalert2';
import axios from 'axios';
import { Global } from '../../../helper/Global';
import socket from '../Socket';
import { uploadImage } from '../uploadImage';
import { setMiembrosGrupo } from '../format/setMiembrosGrupo';
import { formatMessage } from '../format/formatMessage';

let participantesAñadidios = [];
const baseUrl = Global.baseUrl;
const URIMensajes = `${baseUrl}chats/`;
const URIGroup = `${baseUrl}groups/`;
let URIGroupLastByNameUser = '';
const URIparticipantsGroups = `${baseUrl}participantsGroups`;

export const chatGroups = ( user, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, myGroups, setIniciandoChat ) => {

  participantesAñadidios = [];
  URIGroupLastByNameUser = `${baseUrl}groups/groupByNameUser/${user.nombre}`;
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

      addClickButtonNewGroup( user, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, myGroups, setIniciandoChat );

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

const addClickButtonNewGroup = ( user, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, myGroups, setIniciandoChat ) => {

  const imagen = 'https://res.cloudinary.com/duvhgityi/image/upload/v1650761563/FotosGrupos/585e4d1ccb11b227491c339b_1_g7fpkh.png';

  document.querySelectorAll( 'button[name="newGroup"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();
      if ( document.getElementById( 'nameNewGroup' ).value !== '' ) {

        const descripcion = document.getElementById( 'description-create-group' ).value;

        axios.post( URIGroup, { nombre: document.getElementById( 'nameNewGroup' ).value, nombre_creador: user.nombre, imagen, descripcion });

        Swal.close();

        participantsGroups( setGroup, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, myGroups, setIniciandoChat );

      } else {

        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'El nombre del grupo no puede estar vacio!'
        }).then( () => {

          chatGroups( user, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, myGroups, setIniciandoChat );

        });

      }

    });

  });

  document.querySelectorAll( 'input[type="file"]' ).forEach( ( input ) => {

    input.addEventListener( 'change', async ( e ) => {

      e.preventDefault();
      document.getElementById( 'img-photo-create-group' ).src = uploadImage( e.target.files );

    });


  });

};

const participantsGroups = ( setGroup, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, myGroups, setIniciandoChat ) => {

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

      addClickButton( setGroup, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, myGroups, setIniciandoChat );

    }

  });

};

function showFriends( user, users ) {

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

  friends += '<button style="border-radius: 20px" class="btn btn-primary" name="añadirParticipantes">Crear grupo con los participantes seleccionados</button>';

  return ( friends );

}

const addClickButton = ( setGroup, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, myGroups, setIniciandoChat ) => {

  document.querySelectorAll( 'button[name="añadir"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      if ( participantesAñadidios.indexOf( boton.value ) === -1 ) {

        participantesAñadidios.push( boton.value );
        document.getElementById( `${boton.value}AñadirGrupo` ).style.backgroundColor = '#c6daf8';

      } else {

        participantesAñadidios.splice( participantesAñadidios.indexOf( boton.value ), 1 );
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

        const participantesAAnadir = [];
        participantesAAnadir.push( user.nombre );
        participantesAAnadir.push( ...participantesAñadidios );

        participantesAAnadir.forEach( ( participante ) => {

          axios.get( URIGroupLastByNameUser )
            .then( res => {

              setGroup( res.data );
              setReceptor( '' );
              myGroups.push( res.data );
              setMiembrosGrupo( res.data.id, setConfigurationGroups, myGroups, users, user, setGroup, setReceptor, setConexion );
              axios.post( URIparticipantsGroups, { id_grupo: res.data.id, nombre_usuario: participante });
              axios.post( URIMensajes, { id_grupo_receptor: res.data.id, mensaje: participante === user.nombre ? `${user.nombre} ha creado el grupo` : `${user.nombre} ha añadido al grupo a ${participante}`, administracion: 1 });

            });

        });
        Swal.close();

        Swal.fire({
          title: 'Grupo creado',
          text: '¡El grupo ha sido creado con éxito!',
          focusConfirm: false,
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then( () => {

          setIniciandoChat( true );
          socket.emit( 'mensaje' );

        });

      } else if ( participantesAñadidios.length === 0 ) {

        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: '¡No has añadido ningun participante al grupo! Añade al menos un participante.'
        }).then( () => {

          participantsGroups( setGroup, user, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, myGroups );

        });

      }

    });

  });

};
