import Swal from 'sweetalert2';
import { Global } from '../../../helper/Global';
import axios from 'axios';
import { editInfo } from './editInfo';
import { copyInfo } from './copyInfo';
import socket from '../Socket';
import { viewGroupsInCommon } from '../infoUser/groupsInCommon';
import { viewParticipantsGroup } from './viewParticipantsGroup';

const baseUrl = Global.baseUrl;

export const infoGroup = ( myGroups, id, receptor, users, participantes, userAct, setGroup, setReceptor, setConexion ) => {

  let groupAct = {};
  let usuarioReceptor = {};
  let admin = false;

  if ( receptor === '' ) {

    myGroups.forEach( ( group ) => {

      if ( group.id === id ) {

        groupAct = group;
        admin = group.nombre_creador === userAct.nombre;

      }

    });

  } else {

    users.forEach( ( user ) => {

      if ( user.nombre === receptor ) {

        usuarioReceptor = user;

      }

    });

  }

  viewInfoGroup( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, setReceptor, setConexion );

};

function viewInfoGroup( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, setReceptor, setConexion ) {

  Swal.fire({
    html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showInfoGroups( groupAct, admin, receptor, usuarioReceptor )}</div>`,
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

      addClickButton( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, setReceptor, setConexion );

    }

  });

}

function showInfoGroups( group, admin, receptor, usuarioReceptor ) {

  let infoGroup = '';

  if ( receptor === '' ) {

    let buttonCopyDescription = '';
    group.descripcion !== '' ? buttonCopyDescription = '<button class="botonTransparente" name="copiarDescripcionGrupo"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg></button>' : buttonCopyDescription = '';
    let buttonEditImagen = '';
    admin ? buttonEditImagen = '<button class="botonTransparente" name="editImagenGrupo"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button>' : buttonEditImagen = '';
    let buttonEditNombre = '';
    admin ? buttonEditNombre = '<button class="botonTransparente" name="editNombreGrupo"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button>' : buttonEditNombre = '';
    let buttonEditDescription = '';
    admin ? buttonEditDescription = '<button class="botonTransparente" name="editDescripcionGrupo"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button>' : buttonEditDescription = '';
    infoGroup += `
    <br/>
    <div>
      <img src=${group.imagen}
          alt="avatar"
          class="imagen-perfil-chat"
          width="300"
          height="300" />
      ${buttonEditImagen}
    </div>
    <br/>
    <h1 id="nombreGrupo">
      ${group.nombre}
      <button class="botonTransparente" name="copiarNombreGrupo">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
      </button>
      ${buttonEditNombre}
    </h1>
    <br/>
    <br/>
    <h5 id="descripcionGrupo">
      ${group.descripcion}
      ${buttonCopyDescription}
      ${buttonEditDescription}
    </h5>
    <br/>
    <button style="border-radius: 20px" class="btn btn-primary" name="verParticipantes">Ver participantes del grupo</button>&nbsp;&nbsp;&nbsp;
  `;
    admin ? infoGroup += '<button style="border-radius: 20px" class="btn btn-danger" name="eliminarGrupo">Eliminar grupo</button>' : infoGroup += '<button style="border-radius: 20px" class="btn btn-danger" name="salirDelGrupo">Salir del grupo</button>';

  } else {

    infoGroup += `
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

  }


  return ( infoGroup );

}

function addClickButton( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, setReceptor, setConexion ) {

  if ( receptor === '' ) {

    if ( groupAct.descripcion !== '' ) {

      const botonCopiarDescripcion = document.querySelector( 'button[name="copiarDescripcionGrupo"]' );
      botonCopiarDescripcion.addEventListener( 'click', ( event ) => {

        event.preventDefault();
        copyInfo( 'descripcion', groupAct, receptor, participantes, userAct, setReceptor, setConexion, setGroup );

      });

    }

    const botonCopiarNombre = document.querySelector( 'button[name="copiarNombreGrupo"]' );
    botonCopiarNombre.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      copyInfo( 'nombre', groupAct, receptor, participantes, userAct, setReceptor, setConexion, setGroup );

    });

    document.querySelector( 'button[name="verParticipantes"]' ).addEventListener( 'click', ( event ) => {

      event.preventDefault();
      viewParticipantsGroup( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, setReceptor, setConexion );

    });

  } else {

    const botonVerGruposEnComun = document.querySelector( 'button[name="verGrupos"]' );
    botonVerGruposEnComun.addEventListener( 'click', ( event ) => {

      axios.get( `${baseUrl}groups/groups/${userAct.nombre}/${usuarioReceptor.nombre}` ).then( res => {

        viewGroupsInCommon( groupAct, receptor, setGroup, setReceptor, res.data );

      });

    });

  }

  if ( admin ) {

    const botonEditarDescripcion = document.querySelector( 'button[name="editDescripcionGrupo"]' );
    botonEditarDescripcion.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      editInfo( 'descripcion', groupAct, receptor, participantes, setGroup, userAct, setReceptor, setConexion );

    });

    const botonEditarNombre = document.querySelector( 'button[name="editNombreGrupo"]' );
    botonEditarNombre.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      editInfo( 'nombre', groupAct, receptor, participantes, setGroup, userAct, setReceptor, setConexion );

    });

    const botonEditarImagen = document.querySelector( 'button[name="editImagenGrupo"]' );
    botonEditarImagen.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      editInfo( 'imagen', groupAct, receptor, participantes, setGroup, userAct, setReceptor, setConexion );

    });

    const botonEliminarGrupo = document.querySelector( 'button[name="eliminarGrupo"]' );
    botonEliminarGrupo.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      deleteGroup( groupAct );

    });

  } else if ( receptor === '' ) {


    const botonEliminarGrupo = document.querySelector( 'button[name="salirDelGrupo"]' );
    botonEliminarGrupo.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      exitGroup( groupAct, userAct );

    });

  }


}

function exitGroup( groupAct, userAct ) {

  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, salir del grupo!'
  }).then( ( result ) => {

    if ( result.value ) {

      axios.delete( `${baseUrl}participantsGroups/${groupAct.id}/participant/${userAct.nombre}` );

      Swal.fire(
        '¡Eliminado!',
        'Has salido del grupo',
        'success'
      ).then( () => {

        axios.post( `${baseUrl}chats/`, { id_grupo_receptor: groupAct.id, mensaje: `${userAct.nombre} ha salido del grupo`, administracion: 1 });
        socket.emit( 'mensaje' );
        window.location.reload();

      });

    }

  });

}

function deleteGroup( groupAct ) {

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

      axios.delete( `${baseUrl}groups/${groupAct.id}` );

      Swal.fire(
        '¡Eliminado!',
        'El grupo ha sido eliminado',
        'success'
      ).then( () => {

        socket.emit( 'mensaje' );
        window.location.reload();

      });

    }

  });

}
