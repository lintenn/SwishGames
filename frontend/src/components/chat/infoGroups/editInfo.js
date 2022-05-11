import Swal from 'sweetalert2';
import { Global } from '../../../helper/Global';
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

  switch ( type ) {

    case 'descripcion':
      edit = 'Descripción';
      editGroup = `<Input type="text" id="descripcion-edit-group" value=${group.descripcion}>`;
      break;
    case 'nombre':
      edit = 'Nombre';
      editGroup = `<Input type="text" id="nombre-edit-group" value=${group.nombre}>`;
      break;
    case 'imagen':
      edit = 'Imagen';
      editGroup = `
        <Input accept="image/*" type="file" id="imagen-edit-group">
        <img src=${group.imagen} name="img-photo-edit-group" id="img-photo-edit-group" class="align-self-center m-3 imagen-perfil-chat" width ="300" height ="300">`;
      break;

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

  const botonEditar = document.querySelector( 'button[name="editGrupoSwal"]' );
  botonEditar.addEventListener( 'click', ( event ) => {

    event.preventDefault();

    let descripcion = null;
    let nombre = null;
    let imagen = null;
    let tipo = '';

    switch ( type ) {

      case 'descripcion':
        descripcion = document.querySelector( '#descripcion-edit-group' ).value;
        groupAct.descripcion = descripcion;
        axios.put( `${baseUrl}groups/${groupAct.id}`, { descripcion });
        tipo = 'La descripcion';
        break;
      case 'nombre':
        nombre = document.querySelector( '#nombre-edit-group' ).value;
        if ( nombre === '' ) {

          Swal.fire( 'Error', 'El nombre no puede estar vacio', 'error' ).then( () => {

            editInfo( type, groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, showInfoGroups, addClickButton );

          });

        } else {

          groupAct.nombre = nombre;
          axios.put( `${baseUrl}groups/${groupAct.id}`, { nombre });
          tipo = 'El nombre';

        }
        break;
      case 'imagen':
        imagen = document.querySelector( '#img-photo-edit-group' ).src;
        groupAct.imagen = imagen;
        axios.put( `${baseUrl}groups/${groupAct.id}`, { imagen });
        tipo = 'La imagen';
        break;

    }


    if ( nombre !== '' ) {

      Swal.fire(
        'Editado!',
        `${tipo} del grupo ha sido editada`,
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

    }

  });

  document.querySelectorAll( 'input[type="file"]' ).forEach( ( input ) => {

    input.addEventListener( 'change', async ( e ) => {

      e.preventDefault();
      const file = e.target.files;
      const formData = new FormData();
      formData.append( 'file', file[0]);
      formData.append( 'upload_preset', 'FotosGrupos' );
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/duvhgityi/image/upload',
        {
          method: 'POST',
          body: formData
        }
      );
      const result = await res.json();
      const imagen = result.secure_url;
      document.querySelector( '#img-photo-edit-group' ).src = imagen;

    });


  });


}
