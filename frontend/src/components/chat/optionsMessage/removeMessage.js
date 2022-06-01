import axios from 'axios';
import Swal from 'sweetalert2';
import socket from '../Socket';
import { Global } from '../../../helper/Global';

const baseUrl = Global.baseUrl;

function eliminarMensaje( mensaje ) {

  let eliminarMensaje = mensaje.mensaje === null ? 'la imagen' : 'el mensaje "' + mensaje.mensaje + '"';

  Swal.fire({
    title: `¿Estás seguro de que quieres borrar ${eliminarMensaje}?`,
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#198754',
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar'
  }).then( ( result ) => {

    if ( result.value ) {

      axios.delete( `${baseUrl}chats/${mensaje.id}` );

      eliminarMensaje = mensaje.mensaje === null ? 'La imagen' : 'El mensaje "' + mensaje.mensaje + '"';

      Swal.fire(
        '¡Borrado!',
        `${eliminarMensaje} ha sido borrada`,
        'success'
      ).then( () => {

        socket.emit( 'mensaje' );

      });

    }

  });

}

export default eliminarMensaje;
