import Swal from 'sweetalert2';
import { Global } from '../../helper/Global';
import axios from 'axios';

const baseUrl = Global.baseUrl;

export function editInfo( type, groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, showInfoGroups, addClickButton ) {

  Swal.fire({
    html: `<div style="background-color: #f0eeee">${showEdit( type, groupAct )}</div>`,
    background: '#f0eeee',
    showCloseButton: true,
    closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    allowOutsideClick: false,
    width: '50%',
    didOpen: () => {

      addClickButtonEdit( type, groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, showInfoGroups, addClickButton );

    }

  });

}


function showEdit( type, group ) {

  let infoGroup = '';
  let edit = '';
  let editGroup = '';

  if ( type === 'descripcion' ) {

    edit = 'Descripción';
    editGroup = '<Input type="text" id="edit-group">';

  } else if ( type === 'nombre' ) {

    edit = 'Nombre';
    editGroup = '<Input type="text" id="edit-group">';

  } else if ( type === 'imagen' ) {

    edit = 'Imagen';
    editGroup = `
        <Input accept="image/*" type="file" id="edit-group">
        <img src=${group.imagen} name="img-photo-edit-group" id="img-photo-edit-group" class="align-self-center m-3 imagen-perfil-chat" width ="300" height ="300">`;

  }

  infoGroup += `
        <br/>
        <h1>Editar ${type} del grupo ${group.nombre}</h1>
        <br/>
        <br/>
        <h4>${edit} del grupo</h4>
        ${editGroup}
        <br/>
        <br/>
        <button style="border-radius: 20px" class="btn btn-primary" name="editGrupoSwal">Siguiente</button>
      `;


  return ( infoGroup );

}


function addClickButtonEdit( type, groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, showInfoGroups, addClickButton ) {

  const botonEditarDescripcion = document.querySelector( 'button[name="editGrupoSwal"]' );
  botonEditarDescripcion.addEventListener( 'click', ( event ) => {

    event.preventDefault();
    const descripcion = document.getElementById( 'edit-group' ).value;

    groupAct.descripcion = descripcion;

    axios.put( `${baseUrl}groups/${groupAct.id}`, { descripcion });

    Swal.fire(
      'Editado!',
      'La descripción del grupo ha sido editada',
      'success'
    ).then( () => {

      Swal.fire({
        html: `<div style="background-color: #f0eeee">${showInfoGroups( groupAct, admin, receptor, usuarioReceptor, participantes, userAct )}</div>`,
        background: '#f0eeee',
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        allowOutsideClick: false,
        width: '50%',
        didOpen: () => {

          addClickButton( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct );

          axios.get( `${baseUrl}groups/${groupAct.id}` )
            .then( res => setGroup( res.data ) );

        }

      });

    });

  });


}
