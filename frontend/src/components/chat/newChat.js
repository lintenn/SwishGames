import Swal from 'sweetalert2';

export const chatUsers = ( user, users, receptor, setReceptor, setConection, group, setGroup ) => {

  Swal.fire({
    html: `<div style="background-color: #f0eeee">${showFriends( user, users )}</div>`,
    background: '#f0eeee',
    showCloseButton: true,
    closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    allowOutsideClick: false,
    width: '25%',
    didOpen: () => {

      addClickButton( receptor, setReceptor, setConection, group, setGroup );

    }

  });


};

/* const fotoPerfil = ( user ) => {

  let imagen = '';

  imagen =
    <svg xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="50"
      fill="currentColor"
      className="bi bi-person-fill d-flex align-self-center m-3"
      viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>;

  return imagen;

}; */

function showFriends( user, users ) {

  let friends = '';

  users.forEach( ( us ) => {

    if ( us.nombre !== user.nombre ) {

      // const imagen = fotoPerfil( user );
      friends += `
        <div class="d-flex flex-row mb-3">
          <button style="background-color: white; border-radius: 20px" name="newChat" value="${us.nombre}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
            <div class="align-items-center divObjectsSend">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="50"
              fill="currentColor"
              className="bi bi-person-fill d-flex align-self-center m-3"
              viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
            </div>
            <div class="pt-1">
              <p class="fw-bold mb-0">${us.nombre}</p>
            </div>
          </button>
        </div>`;

    }

  });

  return ( friends );

}

const addClickButton = ( receptor, setReceptor, setConection, group, setGroup ) => {

  document.querySelectorAll( 'button[name="newChat"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();
      if ( document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ) !== null ) {

        document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ).classList.remove( 'chatSeleccionado' );

      }
      setReceptor( boton.value );
      setConection( boton.value );
      setGroup({});
      if ( document.getElementById( `${boton.value}` ) !== null ) {

        document.getElementById( `${boton.value}` ).classList.add( 'chatSeleccionado' );

      }
      Swal.close();

    });

  });

};

