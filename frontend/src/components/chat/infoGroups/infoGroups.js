import Swal from 'sweetalert2';
import { Global } from '../../../helper/Global';
import axios from 'axios';
import { editInfo } from './editInfo';
import { copyInfo } from './copyInfo';

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

      addClickButton( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct );

    }

  });


};

function addClickButton( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct ) {

  if ( receptor === '' ) {

    if ( groupAct.descripcion !== '' ) {

      const botonCopiarDescripcion = document.querySelector( 'button[name="copiarDescripcionGrupo"]' );
      botonCopiarDescripcion.addEventListener( 'click', ( event ) => {

        event.preventDefault();
        copyInfo( 'descripcion', groupAct, admin, receptor, usuarioReceptor, participantes, userAct, showInfoGroups, addClickButton );

      });

    }

    const botonCopiarNombre = document.querySelector( 'button[name="copiarNombreGrupo"]' );
    botonCopiarNombre.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      copyInfo( 'nombre', groupAct, admin, receptor, usuarioReceptor, participantes, userAct, showInfoGroups, addClickButton );

    });

  }

  if ( admin ) {

    const botonEditarDescripcion = document.querySelector( 'button[name="editDescripcionGrupo"]' );
    botonEditarDescripcion.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      editInfo( 'descripcion', groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, showInfoGroups, addClickButton );

    });

    const botonEditarNombre = document.querySelector( 'button[name="editNombreGrupo"]' );
    botonEditarNombre.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      editInfo( 'nombre', groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, showInfoGroups, addClickButton );

    });

    const botonEditarImagen = document.querySelector( 'button[name="editImagenGrupo"]' );
    botonEditarImagen.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      editInfo( 'imagen', groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct, showInfoGroups, addClickButton );

    });

    const botonEliminarGrupo = document.querySelector( 'button[name="eliminarGrupo"]' );
    botonEliminarGrupo.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, eliminarlo!'
      }).then( ( result ) => {

        if ( result.value ) {

          axios.delete( `${baseUrl}groups/${groupAct.id}` );

          Swal.fire(
            '¡Eliminado!',
            'El grupo ha sido eliminado',
            'success'
          ).then( () => {

            window.location.reload();

          });

        }

      });


    });

    document.querySelectorAll( 'button[name="removeParticipante"]' ).forEach( ( boton ) => {

      boton.addEventListener( 'click', ( event ) => {

        event.preventDefault();
        const nombreParticipante = boton.value;

        Swal.fire({
          title: '¿Estás seguro?',
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Sí, eliminarlo!'
        }).then( ( result ) => {

          if ( result.value ) {

            axios.delete( `${baseUrl}participantsGroups/${groupAct.id}/participant/${nombreParticipante}` );

            Swal.fire(
              '¡Eliminado!',
              'El participante ha sido eliminado',
              'success'
            ).then( () => {

              axios.get( `${baseUrl}participantsGroups/users/${groupAct.id}` )
                .then( res => {

                  Swal.fire({
                    html: `<div style="background-color: #f0eeee">${showInfoGroups( groupAct, admin, receptor, usuarioReceptor, res.data, userAct )}</div>`,
                    background: '#f0eeee',
                    showCloseButton: true,
                    closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
                    showCancelButton: false,
                    showConfirmButton: false,
                    focusConfirm: false,
                    allowOutsideClick: false,
                    width: '50%',
                    didOpen: () => {

                      addClickButton( groupAct, admin, receptor, usuarioReceptor, res.data, setGroup, userAct );

                    }

                  });

                });

            });

          }

        });

      });

    });

    const botonAñadirParticipantes = document.querySelector( 'button[name="añadirParticipantes"]' );
    botonAñadirParticipantes.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      axios.get( `${baseUrl}participantsGroups/notUsers/${groupAct.id}` )
        .then( res => {

          Swal.fire({
            html: `<div style="background-color: #f0eeee">${showAddParticipantes( groupAct, res.data )}</div>`,
            background: '#f0eeee',
            showCloseButton: true,
            closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
            width: '50%',
            didOpen: () => {

              addClickButtonAddParticipantes( groupAct, admin, receptor, usuarioReceptor, res.data, setGroup, userAct );

            }

          });

        });


    });

  } else if ( receptor === '' ) {


    const botonEliminarGrupo = document.querySelector( 'button[name="salirDelGrupo"]' );
    botonEliminarGrupo.addEventListener( 'click', ( event ) => {

      event.preventDefault();
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, salir del grupo!'
      }).then( ( result ) => {

        if ( result.value ) {

          axios.delete( `${baseUrl}participantsGroups/${groupAct.id}/participant/${userAct.nombre}` );

          Swal.fire(
            '¡Eliminado!',
            'Has salido del grupo',
            'success'
          ).then( () => {

            window.location.reload();

          });

        }

      });


    });

  }


}

function showAddParticipantes( user, users ) {

  let friends = '';

  users.forEach( ( us ) => {

    if ( us.nombre !== user.nombre ) {

      const descripcion = formatDescription( us.descripcion );

      friends += `
          <div class="d-flex flex-row mb-3">
            <button style="background-color: white; border-radius: 20px" name="añadir" value="${us.nombre}" id="${us.nombre}AñadirGrupo" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
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

    }

  });

  friends += '<button style="border-radius: 20px" class="btn btn-primary" name="añadirParticipantes">Añadir participantes seleccionados</button>';

  return ( friends );

}

function addClickButtonAddParticipantes( groupAct, admin, receptor, usuarioReceptor, participantes, setGroup, userAct ) {

  const participantesAñadidos = [];

  document.querySelectorAll( 'button[name="añadir"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      if ( participantesAñadidos.indexOf( boton.value ) === -1 ) {

        participantesAñadidos.push( boton.value );
        document.getElementById( `${boton.value}AñadirGrupo` ).style.backgroundColor = '#c6daf8';

      } else {

        participantesAñadidos.pop( boton.value );
        document.getElementById( `${boton.value}AñadirGrupo` ).style.backgroundColor = '#ffffff';

      }

    });

  });

  document.querySelectorAll( 'button[name="añadirParticipantes"]' ).forEach( ( boton ) => {

    boton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      if ( participantesAñadidos.length > 0 ) {

        participantesAñadidos.forEach( ( participante ) => {

          axios.post( `${baseUrl}participantsGroups/`, { id_grupo: groupAct.id, nombre_usuario: participante });


        });

        Swal.fire(
          '¡Añadido!',
          'Los participantes han sido añadidos',
          'success'
        ).then( () => {


          axios.get( `${baseUrl}participantsGroups/users/${groupAct.id}` )
            .then( res => {

              Swal.fire({
                html: `<div style="background-color: #f0eeee">${showInfoGroups( groupAct, admin, receptor, usuarioReceptor, res.data, userAct )}</div>`,
                background: '#f0eeee',
                showCloseButton: true,
                closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
                showCancelButton: false,
                showConfirmButton: false,
                focusConfirm: false,
                allowOutsideClick: false,
                width: '50%',
                didOpen: () => {

                  addClickButton( groupAct, admin, receptor, usuarioReceptor, res.data, setGroup, userAct );

                }

              });

            });

        });

      } else if ( participantesAñadidos.length === 0 ) {

        axios.get( `${baseUrl}participantsGroups/users/${groupAct.id}` )
          .then( res => {

            Swal.fire({
              html: `<div style="background-color: #f0eeee">${showInfoGroups( groupAct, admin, receptor, usuarioReceptor, res.data, userAct )}</div>`,
              background: '#f0eeee',
              showCloseButton: true,
              closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
              showCancelButton: false,
              showConfirmButton: false,
              focusConfirm: false,
              allowOutsideClick: false,
              width: '50%',
              didOpen: () => {

                addClickButton( groupAct, admin, receptor, usuarioReceptor, res.data, setGroup, userAct );

              }

            });

          });

      }


    });

  });

};

function showInfoGroups( group, admin, receptor, usuarioReceptor, participantes, userAct ) {

  let infoGroup = '';

  if ( receptor === '' ) {

    let buttonCopyDescription = '';
    group.descripcion !== '' ? buttonCopyDescription = '<button class="botonTransparente" name="copiarDescripcionGrupo"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg></button>' : buttonCopyDescription = '';
    let buttonEditImagen = '';
    admin ? buttonEditImagen = '<button class="botonTransparente" name="editImagenGrupo"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button>' : buttonEditImagen = '';
    let buttonEditNombre = '';
    admin ? buttonEditNombre = '<button class="botonTransparente" name="editNombreGrupo"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button>' : buttonEditNombre = '';
    let buttonEditDescription = '';
    admin ? buttonEditDescription = '<button class="botonTransparente" name="editDescripcionGrupo"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg></button>' : buttonEditDescription = '';
    infoGroup += `
    <br/>
    <div>
      <img src=${group.imagen}
          alt="avatar"
          class="imagen-perfil-chat"
          width="300"
          height="300" />
      ${buttonEditImagen}
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
      ${buttonEditNombre}
    </h1>
    <br/>
    <br/>
    <h5 id="descripcionGrupo">
      ${group.descripcion}
      ${buttonCopyDescription}
      ${buttonEditDescription}
    </h5>
    <br/>
    <br/>
    <h4 class="d-flex">Miembros:</h4>
    <br/>
    ${showMembers( participantes, admin, userAct )}
  `;

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
              <button class="botonTransparente" name="removeParticipante" value=${us.nombre}>
                ${remove}
              </button>
            </div>
          </button>
        </div>`;

  });

  admin ? friends += '<button style="border-radius: 20px" class="btn btn-primary" name="añadirParticipantes">Añadir participantes al grupo</button>&nbsp;&nbsp;&nbsp;<button style="border-radius: 20px" class="btn btn-danger" name="eliminarGrupo">Eliminar grupo</button>' : friends += '<button style="border-radius: 20px" class="btn btn-danger" name="salirDelGrupo">Salir del grupo</button>';

  return ( friends );

}
