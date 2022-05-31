import Swal from 'sweetalert2';
import enviarImagen from './newImage';

export const mostrarPosibilidadesEnviar = ( user, receptor, group ) => {

  Swal.fire({
    html: `<div class="col-12">
                <button class="btn btn-primary btn-block" id="enviarImagen">Enviar Imagen</button>
              </div>`,
    background: '#f0eeee',
    showCloseButton: true,
    closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    allowOutsideClick: false,
    didOpen: () => {

      document.querySelector( '#enviarImagen' ).addEventListener( 'click', () => {

        enviarImagen( user, receptor, group );

      });

    }
  });

};
