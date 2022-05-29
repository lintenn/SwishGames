import axios from 'axios';
import Swal from 'sweetalert2';
import socket from '../Socket';
import { Global } from '../../../helper/Global';
import { uploadImage } from '../uploadImage';

const baseUrl = Global.baseUrl;

function editarImagen( mensaje ) {

  Swal.fire({
    html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showEdit( mensaje )}</div>`,
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

      addClickButtonEdit( mensaje );

    }

  });

}

function showEdit( mensaje ) {

  let edit = '';

  edit += `
          <br/>
          <h1>Editar imagen</h1>
          <br/>
          <br/>
          <Input accept="image/*" type="file" id="imagen-edit">
          <img src=${mensaje.imagen} name="img-photo-edit" id="img-photo-edit" class="align-self-center m-3 imagen-mensaje-chat tamañoMaximoImagenEditar">
          <br/>
          <br/>
          <button style="border-radius: 20px" class="btn btn-primary" name="editImagen">Siguiente</button>
        `;

  return ( edit );

}

function addClickButtonEdit( mensaje ) {

  const botonEditar = document.querySelector( 'button[name="editImagen"]' );
  botonEditar.addEventListener( 'click', ( event ) => {

    event.preventDefault();

    let imagen = null;


    imagen = document.querySelector( '#img-photo-edit' ).src;
    mensaje.imagen = imagen;
    axios.put( `${baseUrl}chats/${mensaje.id}`, { imagen, editado: true });

    axios.get( `${baseUrl}chats/response/${mensaje.id}` )
      .then( ( res ) => {

        res.data.forEach( ( mensaje2 ) => {

          axios.put( `${baseUrl}chats/${mensaje2.id}`, { imagenRespuesta: imagen });

        });

      });

    Swal.fire(
      'Editado!',
      'La imagen ha sido editada',
      'success'
    ).then( () => {

      socket.emit( 'mensaje' );

    });

  });

  document.querySelectorAll( 'input[type="file"]' ).forEach( ( input ) => {

    input.addEventListener( 'change', async ( e ) => {

      e.preventDefault();
      uploadImage( e.target.files )
        .then( ( result ) => {

          document.querySelector( '#img-photo-edit' ).src = result;

        });

    });

  });

}

export default editarImagen;
