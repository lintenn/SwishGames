import Swal from 'sweetalert2';

export function copyInfo( type, groupAct, admin, receptor, usuarioReceptor, participantes, userAct, showInfoGroups, addClickButton ) {

  let tipo = '';
  let descripcion = null;
  let nombre = null;

  switch ( type ) {

    case 'descripcion':
      tipo = 'La descripcion';
      descripcion = document.querySelector( '#descripcionGrupo' );
      navigator.clipboard.writeText( descripcion.innerText );
      break;
    case 'nombre':
      tipo = 'El nombre';
      nombre = document.querySelector( '#nombreGrupo' );
      navigator.clipboard.writeText( nombre.innerText );
      break;

  }

  Swal.fire(
    'Copiado!',
    `${tipo} del grupo ha sido copiada al portapapeles`,
    'success'
  ).then( () => {

    Swal.fire({
      html: `<div class="max-tamaño-swal-Chat" style="background-color: #f0eeee">${showInfoGroups( groupAct, admin, receptor, usuarioReceptor, participantes, userAct )}</div>`,
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


        addClickButton( groupAct, admin, receptor, usuarioReceptor, participantes, userAct );

      }

    });

  });

}
