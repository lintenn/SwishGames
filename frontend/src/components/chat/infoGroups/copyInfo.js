import Swal from 'sweetalert2';
import { infoGroup } from './infoGroups';

export function copyInfo( type, groupAct, participantes, userAct, setReceptor, setConexion, setGroup ) {

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
    default:
      break;

  }

  Swal.fire(
    'Copiado!',
    `${tipo} del grupo ha sido copiada al portapapeles`,
    'success'
  ).then( () => {

    const myGroups = [];
    myGroups.push( groupAct );
    infoGroup( myGroups, groupAct.id, participantes, userAct, setGroup, setReceptor, setConexion );

  });

}
