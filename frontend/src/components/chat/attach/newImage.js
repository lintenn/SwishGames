import axios from 'axios';
import Swal from 'sweetalert2';
import socket from '../Socket';
import { Global } from '../../../helper/Global';
import { uploadImage } from '../uploadImage';

const baseUrl = Global.baseUrl;

function enviarImagen( userAct, receptor, group ) {

  Swal.fire({
    html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showEdit()}</div>`,
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

      addClickButtonEdit( userAct, receptor, group );

    }

  });

}

function showEdit() {

  let edit = '';

  edit += `
          <br/>
          <h1>Enviar una imagen</h1>
          <br/>
          <br/>
          <Input accept="image/*" type="file" id="imagen-edit">
          <img src="" name="img-photo-edit" id="img-photo-edit" class="align-self-center m-3 imagen-mensaje-chat" width ="300" height ="300">
          <br/>
          <br/>
          <button style="border-radius: 20px" class="btn btn-primary" name="editImagen">Siguiente</button>
        `;


  return ( edit );

}

function addClickButtonEdit( userAct, receptor, group ) {

  const botonEditar = document.querySelector( 'button[name="editImagen"]' );
  botonEditar.addEventListener( 'click', ( event ) => {

    event.preventDefault();

    let imagen = null;

    imagen = document.querySelector( '#img-photo-edit' ).src;

    if ( receptor === '' ) {

      axios.post( `${baseUrl}chats/`, { nombre_usuario_emisor: userAct.nombre, id_grupo_receptor: group.id, imagen });

    } else {

      axios.post( `${baseUrl}chats/`, { nombre_usuario_emisor: userAct.nombre, nombre_usuario_receptor: receptor, imagen });

    }

    Swal.fire(
      'Enviado!',
      'La imagen ha sido enviado',
      'success'
    ).then( () => {

      socket.emit( 'mensaje' );

    });


  });

  document.querySelectorAll( 'input[type="file"]' ).forEach( ( input ) => {

    input.addEventListener( 'change', async ( e ) => {

      e.preventDefault();
      document.querySelector( '#img-photo-edit' ).src = uploadImage( e.target.files );

    });


  });


}

export default enviarImagen;
