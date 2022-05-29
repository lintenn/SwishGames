import axios from 'axios';
import Swal from 'sweetalert2';
import socket from '../Socket';
import { Global } from '../../../helper/Global';
import { eliminarEspaciosMensajes } from '../format/removeSpacesMessages';

const baseUrl = Global.baseUrl;

function editarMensaje( mensaje ) {

  Swal.fire({
    title: 'Editar mensaje',
    input: 'text',
    inputValue: mensaje.mensaje,
    showCancelButton: true,
    confirmButtonColor: '#198754',
    cancelButtonColor: '#dc3545',
    confirmButtonText: 'Editar',
    cancelButtonText: 'Cancelar'
  }).then( ( result ) => {

    if ( eliminarEspaciosMensajes( result.value ) && result.value !== mensaje.mensaje ) {

      axios.put( `${baseUrl}chats/${mensaje.id}`, { mensaje: result.value, editado: true, reenviado: false });

      axios.get( `${baseUrl}chats/response/${mensaje.id}` )
        .then( ( res ) => {

          res.data.forEach( ( mensaje2 ) => {

            axios.put( `${baseUrl}chats/${mensaje2.id}`, { mensajeRespuesta: result.value });

          });

        });

      Swal.fire(
        '¡Editado!',
        `El mensaje '${mensaje.mensaje}' ha sido editado por '${result.value}'`,
        'success'
      ).then( () => {

        socket.emit( 'mensaje' );

      });

    } else if ( !eliminarEspaciosMensajes( result.value ) ) {

      Swal.fire( 'Error', 'El mensaje no puede estar vacio', 'error' ).then( () => {

        editarMensaje( mensaje );

      });

    } else if ( result.value === mensaje.mensaje ) {

      Swal.fire( 'Error', 'El mensaje no ha sido editado', 'error' ).then( () => {

        editarMensaje( mensaje );

      });

    }

  });

}

export default editarMensaje;
