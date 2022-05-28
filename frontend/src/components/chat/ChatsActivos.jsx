import React, { useEffect, useState } from 'react';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import socket from './Socket';
import { Global } from '../../helper/Global';
import { chatUsers } from './createNewChats/newChat';
import { chatGroups } from './createNewChats/newGroup';
import { infoGroup } from './infoGroups/infoGroups';
import axios from 'axios';
import { eventKeyboard } from './eventsKeyboard';
import { formatDate } from './format/formatDate';
import { formatMessage } from './format/formatMessage';
import { setConection } from './format/setConection';
import { fotoPerfil } from './format/photoProfile';

export const ChatsActivos = ({ users, mensajes, user, setReceptor, setConexion, setMensaje, receptor, group, setGroup, myGroups, configurationGroups, setConfigurationGroups, setIniciandoChat, mensajesDESC, setResponder, mensajesBuscar, setMensajesBuscar, recienEnviado, setRecienEnviado }) => {

  const users2 = [];
  const baseUrl = Global.baseUrl;
  const URIGroup = `${baseUrl}groups/`;
  const URIGroupLastByNameUser = `${baseUrl}groups/groupByNameUser/${user.nombre}`;
  const URIparticipantsGroups = `${baseUrl}participantsGroups`;
  let numeroMensajeUser = 0;
  const [buscar, setBuscar] = useState( '' );

  useEffect( () => {

    socket.emit( 'conectado', user.nombre );

  }, [user.nombre]);

  useEffect( () => {

    if ( receptor === '' && group.nombre === undefined ) {

      let i = 0;
      const idGroups = [];

      myGroups.forEach( ( group ) => {

        idGroups.push( group.id );

      });

      mensajesBuscar.reverse().forEach( men => {

        if ( i === 0 ) {

          if ( men.nombre_usuario_emisor === user.nombre ) {

            if ( men.id_grupo_receptor !== null && men.nombre_usuario_receptor === null ) {

              myGroups.forEach( ( group ) => {

                if ( group.id === men.id_grupo_receptor ) {

                  setReceptor( '' );
                  setMiembrosGrupo( group.id );
                  setGroup( group );

                }

              });
              i++;

              if ( document.getElementById( `${( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) ? men.id_grupo_receptor : ( men.nombre_usuario_receptor === user.nombre ) ? men.nombre_usuario_emisor : men.nombre_usuario_receptor}` ) !== null ) {

                document.getElementById( `${( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) ? men.id_grupo_receptor : ( men.nombre_usuario_receptor === user.nombre ) ? men.nombre_usuario_emisor : men.nombre_usuario_receptor}` ).classList.add( 'chatSeleccionado' );

              }


            } else if ( men.id_grupo_receptor === null && men.nombre_usuario_receptor !== null ) {

              setConection( men.nombre_usuario_receptor, users, setConexion );
              setReceptor( men.nombre_usuario_receptor );
              setGroup({});
              i++;

              if ( document.getElementById( `${( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) ? men.id_grupo_receptor : ( men.nombre_usuario_receptor === user.nombre ) ? men.nombre_usuario_emisor : men.nombre_usuario_receptor}` ) !== null ) {

                document.getElementById( `${( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) ? men.id_grupo_receptor : ( men.nombre_usuario_receptor === user.nombre ) ? men.nombre_usuario_emisor : men.nombre_usuario_receptor}` ).classList.add( 'chatSeleccionado' );

              }

            }

          } else if ( men.nombre_usuario_receptor === user.nombre ) {

            setConection( men.nombre_usuario_emisor, users, setConexion );
            setReceptor( men.nombre_usuario_emisor );
            setGroup({});
            i++;

            if ( document.getElementById( `${( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) ? men.id_grupo_receptor : ( men.nombre_usuario_receptor === user.nombre ) ? men.nombre_usuario_emisor : men.nombre_usuario_receptor}` ) !== null ) {

              document.getElementById( `${( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) ? men.id_grupo_receptor : ( men.nombre_usuario_receptor === user.nombre ) ? men.nombre_usuario_emisor : men.nombre_usuario_receptor}` ).classList.add( 'chatSeleccionado' );

            }

          } else if ( idGroups.indexOf( men.id_grupo_receptor ) !== -1 ) {

            myGroups.forEach( ( group ) => {

              if ( group.id === men.id_grupo_receptor ) {

                setReceptor( '' );
                setMiembrosGrupo( group.id );
                setGroup( group );

              }

            });

            i++;

            if ( document.getElementById( `${( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) ? men.id_grupo_receptor : ( men.nombre_usuario_receptor === user.nombre ) ? men.nombre_usuario_emisor : men.nombre_usuario_receptor}` ) !== null ) {

              document.getElementById( `${( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) ? men.id_grupo_receptor : ( men.nombre_usuario_receptor === user.nombre ) ? men.nombre_usuario_emisor : men.nombre_usuario_receptor}` ).classList.add( 'chatSeleccionado' );

            }

          }

        }

      });

    } else {

      if ( receptor !== '' && group.nombre === undefined ) {

        setGroup({});
        setConection( receptor, users, setConexion );

      } else if ( receptor === '' && group.nombre !== undefined ) {

        setReceptor( '' );
        setMiembrosGrupo( group.id );

      }

      document.querySelectorAll( '.chatSeleccionado' ).forEach( document => {

        document.classList.remove( 'chatSeleccionado' );

      });

      if ( document.getElementById( `${( receptor === '' && group.nombre !== undefined ) ? group.id : receptor}` ) !== null ) {

        document.getElementById( `${( receptor === '' && group.nombre !== undefined ) ? group.id : receptor}` ).classList.add( 'chatSeleccionado' );

      }

    }

  }, [mensajesBuscar, buscar]);

  useEffect( () => {

    if ( configurationGroups !== '' ) {

      setReceptor( '' );
      setConexion( configurationGroups );

    }

  }, [configurationGroups]);

  useEffect( () => {

    document.querySelector( '#inputMensaje-enviar-chat' ).addEventListener( 'keyup', function ( event ) {

      event.preventDefault();
      numeroMensajeUser = eventKeyboard( event, setMensaje, mensajesDESC, user, receptor, numeroMensajeUser, group );

    });

  }, []);

  useEffect( () => {

    if ( buscar !== '' ) {

      axios.post( `${baseUrl}chats/chat_by_entry/`, { buscar, nombre_user: user.nombre })
        .then( res => {

          if ( res.data[0] === undefined ) {

            setMensajesBuscar([]);

          } else {

            setMensajesBuscar( res.data );

          }

        })
        .catch( () => {

          setMensajesBuscar([]);

        });

    } else {

      setMensajesBuscar( mensajes );

    }

  }, [buscar]);

  const putUsers2 = ( men ) => {

    if ( mensajesBuscar.length === mensajes.length || recienEnviado ) {

      users2.push( ( men.nombre_usuario_receptor !== null && men.id_grupo_receptor === null ) ? ( men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor ) : ( men.id_grupo_receptor ) );

    }
    return <div></div>;

  };

  const setMiembrosGrupo = ( id ) => {

    axios.get( `${baseUrl}participantsGroups/users/${id}` )
      .then( res =>
        setConfigurationGroups(
          <div className="dropdown">
            <button className="botonTransparente2 btnAñadirChats"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-three-dots-vertical"
                viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
              </svg>
            </button>
            <ul className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1">
              <li><button className="dropdown-item"
                onClick={() => infoGroup( myGroups, id, '', users, res.data, user, setGroup, setReceptor, setConection )}>Ver información del grupo</button></li>
            </ul>
          </div> ) );


  };

  const nombreEmisorOrId = ( men ) => {

    let nombre = '';

    if ( men.nombre_usuario_receptor !== null && men.id_grupo_receptor === null ) {

      men.nombre_usuario_emisor !== user.nombre ? nombre = men.nombre_usuario_emisor : nombre = men.nombre_usuario_receptor;

    } else if ( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) {

      nombre = men.id_grupo_receptor;

    }

    return nombre;

  };

  const nombreEmisor = ( men ) => {

    let nombre = '';

    if ( men.nombre_usuario_receptor !== null && men.id_grupo_receptor === null ) {

      men.nombre_usuario_emisor !== user.nombre ? nombre = men.nombre_usuario_emisor : nombre = men.nombre_usuario_receptor;

    } else if ( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) {

      nombre = getGrupo( men.id_grupo_receptor ).nombre;

    }

    return nombre;

  };

  const getGrupo = ( id ) => {

    let grupo = {};

    myGroups.forEach( ( group ) => {

      if ( group.id === id ) {

        grupo = group;

      }

    });

    return grupo;

  };

  return (
    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 botonTransparente marginChatActivos">

      <div className="p-3 botonTransparente">

        <div className="input-group rounded mb-3 botonTransparente divObjectsSend">
          <Input className="input3"
            type="search"
            size="15"
            placeholder="Busca un mensaje"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={( e ) => {

              setBuscar( e.target.value );
              setRecienEnviado( false );

            }} />
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
                onClick={() => chatUsers( user, users, receptor, setReceptor, setConection, group, setGroup, setIniciandoChat )}>Nuevo chat</button></li>
              <li><button className="dropdown-item"
                onClick={() => chatGroups( URIGroup, user, URIGroupLastByNameUser, URIparticipantsGroups, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, setConection, myGroups, setIniciandoChat )}>Nuevo grupo</button></li>
            </ul>
          </div>
        </div>
        <div className="table-wrapper-scroll-y my-custom-scrollbar panelChatUsers">
          <div data-mdb-perfect-scrollbar="true"
            position= "relative"
            height= "400px">
            <ul className="list-unstyled mb-0">

              {
                ( users.length !== 0 && mensajesBuscar.length !== 0 ) && mensajesBuscar.filter( men => men.id_grupo_receptor !== 1 ).reverse().map( ( men, index ) => (

                  ( ( users2.indexOf( men.nombre_usuario_receptor ) === -1 ) || ( users2.indexOf( men.nombre_usuario_emisor ) === -1 ) || ( users2.indexOf( men.id_grupo_receptor ) === -1 ) )
                    ? <li className="p-2 border-bottom"
                      key={index}>
                      <button className={'d-flex justify-content-between botonNaranja btn-chat-seleccionado-hover'}
                        id = {`${nombreEmisorOrId( men )}`}
                        onClick={() => {

                          setResponder( false );
                          document.querySelector( '#botonResponder' ).classList.add( 'ocultar' );

                          if ( document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ) !== null ) {

                            document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ).classList.remove( 'chatSeleccionado' );

                          }
                          document.getElementById( `${nombreEmisorOrId( men )}` ).classList.add( 'chatSeleccionado' );
                          if ( men.nombre_usuario_receptor !== null && men.id_grupo_receptor === null ) {

                            setReceptor( men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor );
                            setConection( men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor, users, setConexion );
                            setGroup({});

                          } else if ( men.nombre_usuario_receptor === null && men.id_grupo_receptor !== null ) {

                            setReceptor( '' );
                            setGroup( getGrupo( men.id_grupo_receptor ) );
                            setMiembrosGrupo( men.id_grupo_receptor );

                          }
                          setMensaje( '' );

                        }}>
                        <div className="d-flex flex-row">
                          <div className="align-items-center divObjectsSend margen-foto-chat-perfil">
                            {fotoPerfil( getGrupo( men.id_grupo_receptor ), men.nombre_usuario_receptor === null ? '' : ( men.nombre_usuario_emisor !== user.nombre ? men.nombre_usuario_emisor : men.nombre_usuario_receptor ), users, 60 )}
                          </div>
                          <div className="pt-1">
                            {putUsers2( men )}
                            <p className="fw-bold mb-0">{nombreEmisor( men )}</p>
                            <p className="small text-muted">{formatMessage( men )}</p>
                          </div>
                        </div>
                        <div className="pt-1">
                          <p className="small text-muted mb-1 textoTransparente textoDerecha tamnyoHora">&nbsp;</p>
                          <p className="small text-muted mb-1 textoTransparente textoDerecha tamnyoHora">&nbsp;</p>
                          <p className="small text-muted mb-1 textoDerecha tamnyoHora">{formatDate( men.fecha_envio )}</p>
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
  receptor: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired,
  setGroup: PropTypes.func.isRequired,
  myGroups: PropTypes.array.isRequired,
  setConfigurationGroups: PropTypes.func.isRequired,
  configurationGroups: PropTypes.node.isRequired,
  setIniciandoChat: PropTypes.func.isRequired,
  mensajesDESC: PropTypes.array.isRequired,
  setResponder: PropTypes.func.isRequired,
  mensajesBuscar: PropTypes.array.isRequired,
  setMensajesBuscar: PropTypes.func.isRequired,
  recienEnviado: PropTypes.bool.isRequired,
  setRecienEnviado: PropTypes.func.isRequired
};
