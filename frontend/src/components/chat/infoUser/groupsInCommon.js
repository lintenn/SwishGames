import { formatMessage } from '../format/formatMessage';
import Swal from 'sweetalert2';
import { Global } from '../../../helper/Global';
import axios from 'axios';
import { setConection } from '../format/setConection';

const baseUrl = Global.baseUrl;

export const viewGroupsInCommon = ( setGroup, setReceptor, groups ) => {

  Swal.fire({
    html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showGroups( groups )}</div>`,
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

      addClickButtonViewGroups( setGroup, setReceptor );

    }
  });

};

function showGroups( groups ) {

  let friends = '';

  groups.forEach( ( group ) => {

    if ( group.id !== 1 ) {

      const descripcion = formatMessage( group.descripcion );

      friends += `
              <div class="d-flex flex-row mb-3">
              <button style="background-color: white; border-radius: 20px" name="viewGroup" value="${group.id}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
                <div class="align-items-center divObjectsSend">
                  <img src=${group.imagen}
                    alt="avatar"
                    class="d-flex align-self-center m-3 imagen-perfil-chat"
                    width="50"
                    height="50" />
                </div>
                <div class="pt-1">
                  <p class="fw-bold mb-0">${group.nombre}</p>
                  <p class="small text-muted">${descripcion}</p>
                </div>
              </button>
            </div>`;

    }

  });

  if ( friends === '' ) {

    friends += '<h1>No hay grupos en común</h1>';

  }

  return ( friends );

}

function addClickButtonViewGroups( setGroup, setReceptor ) {

  document.querySelectorAll( 'button[name="viewGroup"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      axios.get( `${baseUrl}groups/${boton.value}` ).then( res => {

        document.querySelectorAll( '.chatSeleccionado' ).forEach( ( chat ) => {

          chat.classList.remove( 'chatSeleccionado' );

        });

        setReceptor( '' );
        setConection( '', []);
        setGroup( res.data );

        if ( document.getElementById( `${boton.value}` ) !== null ) {

          document.getElementById( `${boton.value}` ).classList.add( 'chatSeleccionado' );

        }

        Swal.close();

      });

    });

  });

}
