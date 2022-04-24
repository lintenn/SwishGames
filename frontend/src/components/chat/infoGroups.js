import Swal from 'sweetalert2';

export const infoGroup = ( myGroups, id, admin, receptor, users, participantes ) => {

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
    html: `<div style="background-color: #f0eeee">${showInfoGroups( groupAct, admin, receptor, usuarioReceptor, participantes )}</div>`,
    background: '#f0eeee',
    showCloseButton: true,
    closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
    allowOutsideClick: false,
    width: '50%'

  });


};

function showInfoGroups( group, admin, receptor, usuarioReceptor, participantes ) {

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
    <br/>
    <br/>
    <h5>Miembros:</h5>
    <br/>
    <br/>
    ${showMembers( participantes )}
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
    <br/>
    <br/>
    <h3>Miembros:</h3>
    <br/>
    ${showMembers( participantes )}
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

function showMembers( users ) {

  let friends = '';

  users.forEach( ( us ) => {

    const descripcion = formatDescription( us.descripcion );

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
            </div>
          </button>
        </div>`;

  });

  friends += '<button style="border-radius: 20px" class="btn btn-primary" name="añadirParticipantes">Añadir participantes al grupo</button>';

  return ( friends );

}
