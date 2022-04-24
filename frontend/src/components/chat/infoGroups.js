import Swal from 'sweetalert2';

export const infoGroup = ( myGroups, id, admin, receptor, users ) => {

  let groupAct = {};
  let usuarioReceptor = {};

  if ( receptor === '' ) {

    myGroups.forEach( ( group ) => {

      if ( group.id === id ) {

        groupAct = group;

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
    html: `<div style="background-color: #f0eeee">${showInfoGroups( groupAct, admin, receptor, usuarioReceptor )}</div>`,
    background: '#f0eeee',
    showCloseButton: true,
    closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    allowOutsideClick: false,
    width: '25%'

  });


};

function showInfoGroups( group, admin, receptor, usuarioReceptor ) {

  let infoGroup = '';

  if ( receptor === '' ) {

    if ( admin ) {

      infoGroup += `
    <br/>
    <img src=${group.imagen}
        alt="avatar"
        class="imagen-perfil-chat"
        width="300"
        height="300" />
    <br/>
    <h1>${group.nombre}</h1>
    <br/>
    <br/>
    <h5>${group.descripcion}</h5>
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
    <h1>${group.nombre}</h1>
    <br/>
    <br/>
    <h5>${group.descripcion}</h5>
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
