import axios from 'axios';
import Swal from 'sweetalert2';
import socket from '../Socket';
import { Global } from '../../../helper/Global';

const baseUrl = Global.baseUrl;

function eliminarMensaje( mensaje ) {

  Swal.fire({
    title: `¿Estás seguro de que quieres borrar el mensaje '${mensaje.mensaje}'?`,
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar'
  }).then( ( result ) => {

    if ( result.value ) {

      axios.delete( `${baseUrl}chats/${mensaje.id}` );

      Swal.fire(
        '¡Borrado!',
        `El mensaje '${mensaje.mensaje}' ha sido borrada`,
        'success'
      ).then( () => {

        socket.emit( 'mensaje' );

      });

    }

  });

}

export default eliminarMensaje;
