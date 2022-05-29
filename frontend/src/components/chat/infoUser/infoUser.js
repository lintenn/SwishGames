import Swal from 'sweetalert2';
import { Global } from '../../../helper/Global';
import axios from 'axios';
import { viewGroupsInCommon } from './groupsInCommon';
import { copyInfoUser } from './copyInfoUser';

const baseUrl = Global.baseUrl;

export function infoUser( users, receptor, userAct, setGroup, setReceptor ) {

  let usuarioReceptor = {};

  users.forEach( ( user ) => {

    if ( user.nombre === receptor ) {

      usuarioReceptor = user;

    }

  });

  viewInfoUser( userAct, usuarioReceptor, setGroup, setReceptor );

}

function viewInfoUser( userAct, usuarioReceptor, setGroup, setReceptor ) {

  Swal.fire({
    html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showInfoUser( usuarioReceptor )}</div>`,
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

      addClickButton( userAct, usuarioReceptor, setGroup, setReceptor );

    }

  });

}

function showInfoUser( usuarioReceptor ) {

  let infoUser = '';
  let buttonCopyDescription = '';
  usuarioReceptor.descripcion !== '' ? buttonCopyDescription = '<button class="botonTransparente" name="copiarDescripcionUser"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg></button>' : buttonCopyDescription = '';

  infoUser += `
    <br/>
    <img src=${usuarioReceptor.imagen}
        alt="avatar"
        class="imagen-perfil-chat"
        width="300"
        height="300" />
    <br/>
    <h1 id="nombreUser">
      ${usuarioReceptor.nombre}
      <button class="botonTransparente" name="copiarNombreUser">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
      </button>
    </h1>
    <br/>
    <br/>
    <h5 id="descripcionUser">
      ${usuarioReceptor.descripcion}
      ${buttonCopyDescription}
    </h5>
    <br/>
    <br/>
    <button style="border-radius: 20px" class="btn btn-primary" name="verGrupos">Ver grupos en común</button>
  `;

  return ( infoUser );

}

function addClickButton( userAct, usuarioReceptor, setGroup, setReceptor ) {

  const botonVerGruposEnComun = document.querySelector( 'button[name="verGrupos"]' );
  botonVerGruposEnComun.addEventListener( 'click', ( event ) => {

    axios.get( `${baseUrl}groups/groups/${userAct.nombre}/${usuarioReceptor.nombre}` )
      .then( res => {

        viewGroupsInCommon( setGroup, setReceptor, res.data );

      });

  });

  if ( usuarioReceptor.descripcion !== '' ) {

    const botonCopiarDescripcion = document.querySelector( 'button[name="copiarDescripcionUser"]' );
    botonCopiarDescripcion.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      copyInfoUser( 'descripcion', usuarioReceptor, userAct, setReceptor, setGroup );

    });

  }

  const botonCopiarNombre = document.querySelector( 'button[name="copiarNombreUser"]' );
  botonCopiarNombre.addEventListener( 'click', ( event ) => {

    event.preventDefault();
    copyInfoUser( 'nombre', usuarioReceptor, userAct, setReceptor, setGroup );

  });

}
