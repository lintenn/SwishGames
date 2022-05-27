import axios from 'axios';
import Swal from 'sweetalert2';
import socket from '../Socket';
import { Global } from '../../../helper/Global';

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

    if ( result.value ) {

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

    }

  });

}

export default editarMensaje;
