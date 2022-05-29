import eliminarMensaje from './removeMessage';
import editarMensaje from './editMessage';
import reenviarMensaje from './resendMessage';
import copiarMensaje from './copyMessage';
import editarImagen from './editImage';
import Swal from 'sweetalert2';

export const mostrarOpcionesMensaje = ( mensaje, user, users, myGroups, setResponder, setIdMensajeRespuesta, setMensajeRespuesta, setImagenRespuesta, setNombreMensajeRespuesta ) => {

  let opciones = '';


  if ( mensaje.mensaje !== null ) {

    opciones += `
                  <br/>
                  <br/>
                  <button class="btn btn-success btn-block" id="copiarMensaje">Copiar Mensaje</button>
                  `;

  }

  if ( mensaje.nombre_usuario_emisor === user.nombre ) {

    opciones += `
                  <br/>
                  <br/>
                  <button class="btn btn-primary btn-block" id="editarMensaje">Editar Mensaje</button>
                  <br/>
                  <br/>
                  <button class="btn btn-danger btn-block" id="eliminarMensaje">Eliminar Mensaje</button>`;

  }

  Swal.fire({
    title: 'Opciones',
    html: `<div class="col-12">
                <button class="btn btn-primary btn-block" id="responderMensaje">Responder Mensaje</button>
                <br/>
                <br/>
                <button class="btn btn-primary btn-block" id="reenviarMensaje">Reenviar Mensaje</button>
                ${opciones}
              </div>`,
    background: '#f0eeee',
    showCloseButton: true,
    closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    allowOutsideClick: false,
    didOpen: () => {

      if ( mensaje.nombre_usuario_emisor === user.nombre ) {

        document.querySelector( '#editarMensaje' ).addEventListener( 'click', () => {

          if ( mensaje.mensaje !== null ) {

            editarMensaje( mensaje );

          } else {

            editarImagen( mensaje );

          }

        });

        document.querySelector( '#eliminarMensaje' ).addEventListener( 'click', () => {

          eliminarMensaje( mensaje );

        });

      }

      if ( mensaje.mensaje !== null ) {

        document.querySelector( '#copiarMensaje' ).addEventListener( 'click', () => {

          copiarMensaje( mensaje, users, myGroups, user );

        });

      }

      document.querySelector( '#reenviarMensaje' ).addEventListener( 'click', () => {

        reenviarMensaje( mensaje, users, myGroups, user );

      });

      document.querySelector( '#responderMensaje' ).addEventListener( 'click', () => {

        setResponder( true );
        setIdMensajeRespuesta( mensaje.id );
        if ( mensaje.mensaje !== null ) {

          setMensajeRespuesta( mensaje.mensaje );
          setImagenRespuesta( '' );

        } else {

          setMensajeRespuesta( '' );
          setImagenRespuesta( mensaje.imagen );

        }
        setNombreMensajeRespuesta( mensaje.nombre_usuario_emisor );
        document.querySelector( '#botonResponder' ).classList.remove( 'ocultar' );
        Swal.close();

      });

    }
  });

};
