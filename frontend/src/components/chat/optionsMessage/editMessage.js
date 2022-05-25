import axios from 'axios';
import Swal from 'sweetalert2';
import socket from '../Socket';
import { Global } from '../../../helper/Global';

const baseUrl = Global.baseUrl;

function editarMensaje( mensaje ) {

  console.log( mensaje );

  Swal.fire({
    title: 'Editar mensaje',
    input: 'text',
    inputValue: mensaje.mensaje,
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Editar',
    cancelButtonText: 'Cancelar'
  }).then( ( result ) => {

    if ( result.value ) {

      axios.put( `${baseUrl}chats/${mensaje.id}`, { mensaje: result.value });

      Swal.fire(
        '¡Editado!',
        `El mensaje '${mensaje.mensaje}' ha sido editado por '${result.value}'`,
        'success'
      ).then( () => {

        socket.emit( 'mensaje' );

      });

    }

  });

}

export default editarMensaje;
