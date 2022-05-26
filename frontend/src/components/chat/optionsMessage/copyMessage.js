import Swal from 'sweetalert2';

function copiarMensaje( mensaje ) {

  Swal.fire({
    title: `¿Estás seguro de copiar el mensaje '${mensaje.mensaje}'?`,
    showCancelButton: true,
    confirmButtonColor: '#198754',
    cancelButtonColor: '#dc3545',
    confirmButtonText: 'Copiar',
    cancelButtonText: 'Cancelar'
  }).then( ( result ) => {

    if ( result.value ) {

      Swal.fire(
        '¡Copiado!',
        `El mensaje '${mensaje.mensaje}' ha sido copiado`,
        'success'
      ).then( () => {

        navigator.clipboard.writeText( mensaje.mensaje );

      });

    }

  });


}

export default copiarMensaje;
