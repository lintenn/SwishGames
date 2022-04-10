import Swal from 'sweetalert2';

export const chatUsers = ( user, users, receptor, setReceptor, setConection ) => {

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

      addClickButton( receptor, setReceptor, setConection );

    }

  });


};

function showFriends( user, users ) {

  let friends = '';

  users.forEach( ( us ) => {

    if ( us.nombre !== user.nombre ) {

      friends += `
        <div class="d-flex flex-row mb-3">
          <button style="background-color: white; border-radius: 20px" name="newChat" value="${us.nombre}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
            <div class="align-items-center divObjectsSend">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                alt="avatar"
                class="d-flex align-self-center me-3"
                width="60"/>
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

const addClickButton = ( receptor, setReceptor, setConection ) => {

  document.querySelectorAll( 'button[name="newChat"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();
      document.getElementById( `${receptor}` ).classList.remove( 'chatSeleccionado' );
      setReceptor( boton.value );
      setConection( boton.value );
      document.getElementById( `${boton.value}` ).classList.add( 'chatSeleccionado' );
      Swal.close();

    });

  });

};

