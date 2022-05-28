import Swal from 'sweetalert2';
import { Global } from '../../../helper/Global';
import axios from 'axios';
import { viewGroupsInCommon } from './groupsInCommon';

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

  infoUser += `
    <br/>
    <img src=${usuarioReceptor.imagen}
        alt="avatar"
        class="imagen-perfil-chat"
        width="300"
        height="300" />
    <br/>
    <h1>${usuarioReceptor.nombre}</h1>
    <br/>
    <br/>
    <h5>${usuarioReceptor.descripcion}</h5>
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

}
