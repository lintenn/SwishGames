import Swal from 'sweetalert2';
import { Global } from '../../../helper/Global';
import axios from 'axios';
import socket from '../Socket';
import { infoGroup } from './infoGroups';
import { uploadImage } from '../uploadImage';

const baseUrl = Global.baseUrl;
const URIMensajes = `${baseUrl}chats/`;

export function editInfo( type, groupAct, receptor, participantes, setGroup, userAct, setReceptor, setConexion ) {

  Swal.fire({
    html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showEdit( type, groupAct )}</div>`,
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

      addClickButtonEdit( type, groupAct, receptor, participantes, userAct, setGroup, setReceptor, setConexion );

    }

  });

}


function showEdit( type, group ) {

  let infoGroup = '';
  let edit = '';
  let editGroup = '';

  switch ( type ) {

    case 'descripcion':
      edit = 'Descripción';
      editGroup = `<Input type="text" id="descripcion-edit-group" value=${group.descripcion}>`;
      break;
    case 'nombre':
      edit = 'Nombre';
      editGroup = `<Input type="text" id="nombre-edit-group" value=${group.nombre}>`;
      break;
    case 'imagen':
      edit = 'Imagen';
      editGroup = `
        <Input accept="image/*" type="file" id="imagen-edit-group">
        <img src=${group.imagen} name="img-photo-edit-group" id="img-photo-edit-group" class="align-self-center m-3 imagen-perfil-chat" width ="300" height ="300">`;
      break;
    default:
      break;

  }

  infoGroup += `
        <br/>
        <h1>Editar ${type} del grupo ${group.nombre}</h1>
        <br/>
        <br/>
        <h4>${edit} del grupo</h4>
        ${editGroup}
        <br/>
        <br/>
        <button style="border-radius: 20px" class="btn btn-primary" name="editGrupoSwal">Siguiente</button>
      `;


  return ( infoGroup );

}


function addClickButtonEdit( type, groupAct, receptor, participantes, userAct, setGroup, setReceptor, setConexion ) {

  const botonEditar = document.querySelector( 'button[name="editGrupoSwal"]' );
  botonEditar.addEventListener( 'click', ( event ) => {

    event.preventDefault();

    let descripcion = null;
    let nombre = null;
    let imagen = null;
    let tipo = '';

    switch ( type ) {

      case 'descripcion':
        descripcion = document.querySelector( '#descripcion-edit-group' ).value;
        groupAct.descripcion = descripcion;
        axios.put( `${baseUrl}groups/${groupAct.id}`, { descripcion });
        tipo = 'La descripcion';
        axios.post( URIMensajes, { id_grupo_receptor: groupAct.id, mensaje: `${userAct.nombre} ha modificado la descripción del grupo`, administracion: 1 });
        break;
      case 'nombre':
        nombre = document.querySelector( '#nombre-edit-group' ).value;
        if ( nombre === '' ) {

          Swal.fire( 'Error', 'El nombre no puede estar vacio', 'error' ).then( () => {

            editInfo( type, groupAct, receptor, participantes, setGroup, userAct, setReceptor, setConexion );

          });

        } else {

          groupAct.nombre = nombre;
          axios.put( `${baseUrl}groups/${groupAct.id}`, { nombre });
          tipo = 'El nombre';
          axios.post( URIMensajes, { id_grupo_receptor: groupAct.id, mensaje: `${userAct.nombre} ha modificado el nombre del grupo`, administracion: 1 });

        }
        break;
      case 'imagen':
        imagen = document.querySelector( '#img-photo-edit-group' ).src;
        groupAct.imagen = imagen;
        axios.put( `${baseUrl}groups/${groupAct.id}`, { imagen });
        tipo = 'La imagen';
        axios.post( URIMensajes, { id_grupo_receptor: groupAct.id, mensaje: `${userAct.nombre} ha modificado la foto de perfil del grupo `, administracion: 1 });
        break;
      default:
        break;

    }

    if ( nombre !== '' ) {

      setGroup( groupAct );

      axios.get( `${baseUrl}users` )
        .then(

          socket.emit( 'mensaje' )

        );

      axios.get( `${baseUrl}users` )
        .then( res => {

          Swal.fire(
            'Editado!',
            `${tipo} del grupo ha sido editada`,
            'success'
          ).then( () => {

            const myGroups = [];
            myGroups.push( groupAct );
            infoGroup( myGroups, groupAct.id, participantes, userAct, setGroup, setReceptor, setConexion );

          });

        });

    }

  });

  document.querySelectorAll( 'input[type="file"]' ).forEach( ( input ) => {

    input.addEventListener( 'change', async ( e ) => {

      e.preventDefault();
      uploadImage( e.target.files )
        .then( ( result ) => {

          document.querySelector( '#img-photo-edit-group' ).src = result;

        });

    });

  });

}
