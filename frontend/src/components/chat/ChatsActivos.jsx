import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import socket from './Socket';

export const ChatsActivos = ({ users, mensajes, user, setReceptor, setConexion, setMensaje, receptor }) => {

  const users2 = [];


  useEffect( () => {

    socket.emit( 'conectado', user.nombre );

  }, [user.nombre]);


  useEffect( () => {

    let i = 0;
    mensajes.forEach( men => {

      if ( i === 0 ) {

        if ( men.nombre_usuario_emisor === user.nombre ) {

          setReceptor( men.nombre_usuario_receptor );
          document.getElementById( `${men.nombre_usuario_receptor}` ).classList.add( 'chatSeleccionado' );
          setConection( men.nombre_usuario_receptor );
          i++;

        } else if ( men.nombre_usuario_receptor === user.nombre ) {

          setReceptor( men.nombre_usuario_emisor );
          document.getElementById( `${men.nombre_usuario_emisor}` ).classList.add( 'chatSeleccionado' );
          setConection( men.nombre_usuario_emisor );
          i++;

        }

      }

    });

  }, [mensajes]);

  const chatUsers = () => {

    Swal.fire({
      html: `<div style="background-color: #f0eeee">${showFriends( users )}</div>`,
      background: '#f0eeee',
      showCloseButton: true,
      closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: false,
      width: '25%',
      didOpen: () => {

        addClickButton();

      }

    });


  };

  function showFriends( users ) {

    let friends = '';

    users.forEach( ( us ) => {

      friends += `
        <div class="d-flex flex-row mb-3">
          <button style="background-color: white; border-radius: 20px" name="newChat" value="${us.nombre}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 botonShowFriends w-100 mt-2 mb-2">
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

    });

    return ( friends );

  }

  const addClickButton = () => {

    document.querySelectorAll( 'button[name="newChat"]' ).forEach( ( boton ) => {

      boton.addEventListener( 'click', ( e ) => {

        e.preventDefault();
        setReceptor( boton.value );
        setConection( boton.value );
        Swal.close();

      });

    });

  };

  const formatDate = ( date ) => {

    const d = new Date( date );
    return d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + ( d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes() );

  };

  const formatMessage = ( mensaje ) => {

    let ultimoMensaje = mensaje;
    if ( ultimoMensaje.length > 15 ) {

      ultimoMensaje = ultimoMensaje.substring( 0, 12 );
      ultimoMensaje += '...';

    }
    return ultimoMensaje;

  };

  const putUsers2 = ( men ) => {

    users2.push( men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor );
    return <div></div>;

  };

  const setConection = ( rec ) => {

    users.forEach( ( us ) => {

      if ( us.nombre === rec ) {

        if ( us.online ) {

          setConexion(
            <div id="divOnline">
              <div id="online"></div>
              Online
            </div> );

        } else {

          setConexion(
            <div id="divOffline">
              <div id="offline"></div>
              Offline
            </div> );

        }

      }

    });

  };

  return (
    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 botonTransparente">

      <div className="p-3 botonTransparente">

        <div className="input-group rounded mb-3 botonTransparente">
          <Input className="input3"
            type="search"
            size="15"
            placeholder="Busca un chat"
            aria-label="Search"
            aria-describedby="search-addon" />
          <span className="input-group-text border-0 botonTransparente"
            id="search-addon">
            <i className="fas fa-search searchIcon"></i>
          </span>
          <div className="dropdown">
            <button className="botonTransparente2 btnAñadirChats"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16">
                <path fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
              </svg>
            </button>
            <ul className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1">
              <li><button className="dropdown-item"
                onClick={() => chatUsers()}>Nuevo chat</button></li>
              <li><button className="dropdown-item">Nuevo grupo</button></li>
            </ul>
          </div>
        </div>
        <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatUsers">
          <div data-mdb-perfect-scrollbar="true"
            position= "relative"
            height= "400px">
            <ul className="list-unstyled mb-0">

              {
                ( users.length !== 0 && mensajes.length !== 0 ) && mensajes.filter( men => ( ( men.nombre_usuario_emisor === user.nombre ) || ( men.nombre_usuario_receptor === user.nombre ) ) ).map( ( men, index ) => (

                  ( ( men.nombre_usuario_emisor === user.nombre && users2.indexOf( men.nombre_usuario_receptor ) === -1 ) || ( men.nombre_usuario_receptor === user.nombre && users2.indexOf( men.nombre_usuario_emisor ) === -1 ) )
                    ? <li className="p-2 border-bottom"
                      key={index}>
                      <button className={`d-flex justify-content-between botonNaranja btn-chat-seleccionado-hover`}
                        id = {`${men.nombre_usuario_emisor === user.nombre ? men.nombre_usuario_receptor : men.nombre_usuario_emisor}`}
                        onClick={() => {

                          document.getElementById( `${receptor}` ).classList.remove( 'chatSeleccionado' );
                          document.getElementById( `${men.nombre_usuario_emisor === user.nombre ? men.nombre_usuario_receptor : men.nombre_usuario_emisor}` ).classList.add( 'chatSeleccionado' );
                          setReceptor( men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor );
                          setConection( men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor );
                          setMensaje( '' );

                        }}>
                        <div className="d-flex flex-row">
                          <div className="align-items-center divObjectsSend">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                              alt="avatar"
                              className="d-flex align-self-center me-3"
                              width="60"/>
                          </div>
                          <div className="pt-1">
                            {putUsers2( men )}
                            <p className="fw-bold mb-0">{men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor}</p>
                            <p className="small text-muted">{formatMessage( men.mensaje )}</p>
                          </div>
                        </div>
                        <div className="pt-1">
                          <p className="small text-muted mb-1 textoTransparente textoDerecha tamañoHora">&nbsp;</p>
                          <p className="small text-muted mb-1 textoTransparente textoDerecha tamañoHora">&nbsp;</p>
                          <p className="small text-muted mb-1 textoDerecha tamañoHora">{formatDate( men.fecha_envio )}</p>
                        </div>
                      </button>
                    </li>
                    : <div key={index}></div> )
                )
              }
            </ul>
          </div>
        </div>

      </div>

    </div>
  );

};

ChatsActivos.propTypes = {
  users: PropTypes.array.isRequired,
  mensajes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setReceptor: PropTypes.func.isRequired,
  setConexion: PropTypes.func.isRequired,
  setMensaje: PropTypes.func.isRequired,
  receptor: PropTypes.string.isRequired
};
