import Swal from 'sweetalert2';
import { infoUser } from './infoUser';

export function copyInfoUser( type, receptor, userAct, setReceptor, setGroup ) {

  let tipo = '';
  let descripcion = null;
  let nombre = null;

  switch ( type ) {

    case 'descripcion':
      tipo = 'La descripcion';
      descripcion = document.querySelector( '#descripcionUser' );
      navigator.clipboard.writeText( descripcion.innerText );
      break;
    case 'nombre':
      tipo = 'El nombre';
      nombre = document.querySelector( '#nombreUser' );
      navigator.clipboard.writeText( nombre.innerText );
      break;
    default:
      break;

  }

  Swal.fire(
    'Copiado!',
    `${tipo} del usuario ha sido copiada al portapapeles`,
    'success'
  ).then( () => {

    const users = [];
    users.push( receptor );
    infoUser( users, receptor.nombre, userAct, setGroup, setReceptor );

  });

}
