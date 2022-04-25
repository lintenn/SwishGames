import Swal from 'sweetalert2';
import { Global } from '../../helper/Global';
import axios from 'axios';

const baseUrl = Global.baseUrl;

export const infoGroup = ( myGroups, id, receptor, users, participantes, userAct, setGroup ) => {

  let groupAct = {};
  let usuarioReceptor = {};
  let admin = false;

  if ( receptor === '' ) {

    myGroups.forEach( ( group ) => {

      if ( group.id === id ) {

        groupAct = group;
        admin = group.nombre_creador === userAct.nombre;

      }

    });

  } else {

    users.forEach( ( user ) => {

      if ( user.nombre === receptor ) {

        usuarioReceptor = user;

      }

    });

  }


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

      addClickButton( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup );

    }

  });


};

function addClickButton( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct ) {

  if ( admin ) {

    const botonCopiarDescripcion = document.querySelector( 'button[name="copiarDescripcionGrupo"]' );
    botonCopiarDescripcion.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      const descripcion = document.querySelector( '#descripcionGrupo' );
      navigator.clipboard.writeText( descripcion.innerText );

      Swal.fire(
        'Copiado!',
        'La descripción del grupo ha sido copiada al portapapeles',
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

            addClickButton( groupAct, admin, receptor, usuarioReceptor, participantes, userAct );

          }

        });

      });

    });

    const botonCopiarNombre = document.querySelector( 'button[name="copiarNombreGrupo"]' );
    botonCopiarNombre.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      const descripcion = document.querySelector( '#nombreGrupo' );
      navigator.clipboard.writeText( descripcion.innerText );

      Swal.fire(
        'Copiado!',
        'El nombre del grupo ha sido copiada al portapapeles',
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

            addClickButton( groupAct, admin, receptor, usuarioReceptor, participantes, userAct );

          }

        });

      });

    });

    const botonEditarDescripcion = document.querySelector( 'button[name="editDescripcionGrupo"]' );
    botonEditarDescripcion.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      Swal.fire({
        html: `<div style="background-color: #f0eeee">${showEditDescripcion( groupAct )}</div>`,
        background: '#f0eeee',
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        allowOutsideClick: false,
        width: '50%',
        didOpen: () => {

          addClickButtonEditDescripcion( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct );

        }

      });

    });

    const botonEditarNombre = document.querySelector( 'button[name="editNombreGrupo"]' );
    botonEditarNombre.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      Swal.fire({
        html: `<div style="background-color: #f0eeee">${showEditNombre( groupAct )}</div>`,
        background: '#f0eeee',
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        allowOutsideClick: false,
        width: '50%',
        didOpen: () => {

          addClickButtonEditNombre( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct );

        }

      });

    });

    const botonEditarImagen = document.querySelector( 'button[name="editImagenGrupo"]' );
    botonEditarImagen.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      Swal.fire({
        html: `<div style="background-color: #f0eeee">${showEditImagen( groupAct )}</div>`,
        background: '#f0eeee',
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        allowOutsideClick: false,
        width: '50%',
        didOpen: () => {

          addClickButtonEditImagen( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct );

        }

      });

    });

  }


}

function addClickButtonEditDescripcion( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct ) {

  const botonEditarDescripcion = document.querySelector( 'button[name="editDescripcionGrupoSwal"]' );
  botonEditarDescripcion.addEventListener( 'click', ( event ) => {

    event.preventDefault();
    const descripcion = document.getElementById( 'description-edit-group' ).value;

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

function showEditDescripcion( group ) {

  let infoGroup = '';


  infoGroup += `
      <br/>
      <h1>Editar descripción del grupo ${group.nombre}</h1>
      <br/>
      <br/>
      <h4>Descripción del grupo</h4>
      <Input type="text" id="description-edit-group">
      <br/>
      <br/>
      <button style="border-radius: 20px" class="btn btn-primary" name="editDescripcionGrupoSwal">Siguiente</button>
    `;


  return ( infoGroup );

}

function addClickButtonEditNombre( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct ) {

  const botonEditarNombre = document.querySelector( 'button[name="editNombreGrupoSwal"]' );
  botonEditarNombre.addEventListener( 'click', ( event ) => {

    event.preventDefault();
    const nombre = document.getElementById( 'nombre-edit-group' ).value;

    groupAct.nombre = nombre;

    axios.put( `${baseUrl}groups/${groupAct.id}`, { nombre });


    Swal.fire(
      'Editado!',
      'El nombre del grupo ha sido editada',
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

function showEditNombre( group ) {

  let infoGroup = '';


  infoGroup += `
      <br/>
      <h1>Editar nombre del grupo ${group.nombre}</h1>
      <br/>
      <br/>
      <h4>Nombre del grupo</h4>
      <Input type="text" id="nombre-edit-group">
      <br/>
      <br/>
      <button style="border-radius: 20px" class="btn btn-primary" name="editNombreGrupoSwal">Siguiente</button>
    `;


  return ( infoGroup );

}

function addClickButtonEditImagen( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct ) {

  let imagen = document.querySelector( 'img[name="img-photo-edit-group"]' ).src;

  const botonEditarNombre = document.querySelector( 'button[name="editImagenGrupoSwal"]' );
  botonEditarNombre.addEventListener( 'click', ( event ) => {

    groupAct.imagen = imagen;

    axios.put( `${baseUrl}groups/${groupAct.id}`, { imagen });


    Swal.fire(
      'Editado!',
      'La foto del grupo ha sido editada',
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
      imagen = result.secure_url;
      document.getElementById( 'img-photo-edit-group' ).src = imagen;

    });


  });


}

function showEditImagen( group ) {

  let infoGroup = '';


  infoGroup += `
      <br/>
      <h1>Editar imagen del grupo ${group.nombre}</h1>
      <br/>
      <br/>
      <h4>Imagen del grupo</h4>
      <Input accept="image/*" type="file" id="photo-edit-group">
      <img src=${group.imagen} name="img-photo-edit-group" id="img-photo-edit-group" class="align-self-center m-3 imagen-perfil-chat" width ="300" height ="300">
      <br/>
      <br/>
      <button style="border-radius: 20px" class="btn btn-primary" name="editImagenGrupoSwal">Siguiente</button>
    `;


  return ( infoGroup );

}

function showInfoGroups( group, admin, receptor, usuarioReceptor, participantes, userAct ) {

  let infoGroup = '';

  if ( receptor === '' ) {

    if ( admin ) {

      infoGroup += `
    <br/>
    <div>
      <img src=${group.imagen}
          alt="avatar"
          class="imagen-perfil-chat"
          width="300"
          height="300" />
      <button class="botonTransparente" name="editImagenGrupo">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
      </button>
    </div>
    <br/>
    <h1 id="nombreGrupo">
      ${group.nombre}
      <button class="botonTransparente" name="copiarNombreGrupo">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
      </button>
      <button class="botonTransparente" name="editNombreGrupo">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
      </button>
    </h1>
    <br/>
    <br/>
    <h5 id="descripcionGrupo">
      ${group.descripcion}
      <button class="botonTransparente" name="copiarDescripcionGrupo">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
      </button>
      <button class="botonTransparente" name="editDescripcionGrupo">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
      </button>
    </h5>
    <br/>
    <br/>
    <h5>Miembros:</h5>
    <br/>
    <br/>
    ${showMembers( participantes, admin, userAct )}
  `;

    } else {

      infoGroup += `
    <br/>
    <img src=${group.imagen}
        alt="avatar"
        class="imagen-perfil-chat"
        width="300"
        height="300" />
    <br/>
    <h1 id="nombreGrupo">
      ${group.nombre}
      <button class="botonTransparente" name="copiarNombreGrupo">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
      </button>
    </h1>
    <br/>
    <br/>
    <h5 id="descripcionGrupo">
      ${group.descripcion}
      <button class="botonTransparente" name="copiarDescripcionGrupo">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
      </button>
    </h5>
    <br/>
    <br/>
    <h5>Miembros:</h5>
    <br/>
    <br/>
    ${showMembers( participantes, admin, userAct )}
  `;

    }

  } else {

    infoGroup += `
    <br/>
    <img src=${usuarioReceptor.imagen}
        alt="avatar"
        class="imagen-perfil-chat"
        width="300"
        height="300" />
    <br/>
    <h1>${usuarioReceptor.nombre}</h1>
    <br/>
    <br/>
    <h5>${usuarioReceptor.descripcion}</h5>
  `;

  }


  return ( infoGroup );

}

const formatDescription = ( descripcion ) => {

  let ultimoDescripcion = descripcion;
  if ( ultimoDescripcion.length > 15 ) {

    ultimoDescripcion = ultimoDescripcion.substring( 0, 12 );
    ultimoDescripcion += '...';

  }
  return ultimoDescripcion;

};

function showMembers( users, admin, userAct ) {

  let friends = '';

  users.forEach( ( us ) => {

    const descripcion = formatDescription( us.descripcion );

    let remove = '';
    admin && us.nombre !== userAct.nombre ? remove = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/><path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/></svg>' : remove = '';
    friends += `
        <div class="d-flex flex-row mb-3">
          <button style="background-color: white; border-radius: 20px" value="${us.nombre}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
            <div class="align-items-center divObjectsSend">
              <img src=${us.imagen}
                alt="avatar"
                class="d-flex align-self-center m-3 imagen-perfil-chat"
                width="50"
                height="50" />
            </div>
            <div class="pt-1">
              <p class="fw-bold mb-0">${us.nombre}</p>
              <p class="small text-muted">${descripcion}</p>
              <button class="botonTransparente">
                ${remove}
              </button>
            </div>
          </button>
        </div>`;

  });

  admin ? friends += '<button style="border-radius: 20px" class="btn btn-primary" name="añadirParticipantes">Añadir participantes al grupo</button>&nbsp;&nbsp;&nbsp;<button style="border-radius: 20px" class="btn btn-danger" name="eliminarGrupo">Eliminar grupo</button>' : friends += '';

  return ( friends );

}
