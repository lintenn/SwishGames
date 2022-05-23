import React, { useEffect, useState } from 'react';
import { setUpChat } from '../helper/SetUpChat';
import { ChatsActivos } from '../components/chat/ChatsActivos.jsx';
import { Conversacion } from '../components/chat/Conversacion';
import Swal from 'sweetalert2';
import '../styles/Chat.css';
import { isAuthorized } from '../helper/isAuthorized.js';
import { useNavigate } from '../../node_modules/react-router/index';
import socket from '../components/chat/Socket';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { IniciarChat } from '../components/chat/IniciarChat';
import axios from 'axios';
import { Global } from '../helper/Global';

export const Chat = () => {

  const [mensajesDESC, setMensajesDESC] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState( null );
  const [receptor, setReceptor] = useState( '' );
  const [conexion, setConexion] = useState( '' );
  const [mensaje, setMensaje] = useState( '' );
  const [group, setGroup] = useState({});
  const [myGroups, setMyGroups] = useState([]);
  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  const [conMensajes, setConMensajes] = useState( false );
  const [iniciandoChat, setIniciandoChat] = useState( false );
  const [configurationGroups, setConfigurationGroups] = useState( '' );
  const baseUrl = Global.baseUrl;

  useEffect( () => {

    if ( !isauthorized ) {

      Swal.fire( 'No has iniciado sesión' ).then( () => {

        navigate( '/' );

      });


    } else {

      setUser( JSON.parse( localStorage.getItem( 'user' ) ) );

    }

  }, []);

  useEffect( () => {

    if ( user !== null ) {

      setUpChat( user, setUsers, setMensajes, setMensajesDESC, setMyGroups );

    }

  }, [user]);

  useEffect( () => {

    socket.on( 'mensajes', () => {

      setUpChat( user, setUsers, setMensajes, setMensajesDESC, setMyGroups );

    });


    return () => {

      socket.off();

    };

  }, [mensajes, users]);

  useEffect( () => {

    if ( mensajes.length !== 0 && myGroups.length !== 0 && user !== null ) {

      const idGroups = [];

      myGroups.forEach( ( group ) => {

        idGroups.push( group.id );

      });

      mensajes.forEach( ( mensaje ) => {

        if ( mensaje.nombre_usuario_emisor === user.nombre ) {

          setConMensajes( true );

        } else if ( mensaje.nombre_usuario_receptor === user.nombre ) {

          setConMensajes( true );

        } else if ( idGroups.indexOf( mensaje.id_grupo_receptor ) !== -1 ) {

          setConMensajes( true );

        }

      });

    }

  }, [mensajes, myGroups, user]);

  const eliminarMensaje = ( mensaje ) => {

    Swal.fire({
      title: `¿Estás seguro de que quieres borrar el mensaje '${mensaje.mensaje}'?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then( ( result ) => {

      if ( result.value ) {

        axios.delete( `${baseUrl}chats/${mensaje.id}` );

        Swal.fire(
          '¡Borrado!',
          `El mensaje '${mensaje.mensaje}' ha sido borrada`,
          'success'
        ).then( () => {

          setUpChat( user, setUsers, setMensajes, setMensajesDESC, setMyGroups );
          socket.emit( 'mensaje' );

        });

      }

    });


  };

  return (
    user === null || users.length === 0 || mensajes.length === 0 || mensajesDESC.length === 0 || myGroups.length === 0
      ? <div></div>
      : conMensajes || iniciandoChat
        ? <div className="row justify-content-center">
          <Header
            buscado={ '' }
            setBuscado={ () => {

              '';

            } }
          />
          <section className="botonTransparente mt-5">
            <div className="container py-5 botonTransparente" >
              <div className="row botonTransparente">
                <div className="col-md-12 botonTransparente">
                  <div className="card botonTransparente"
                    id="chat3"
                    border-radius= "15px">
                    <div className="card-body botonTransparente">
                      <div className="row botonTransparente">
                        <ChatsActivos
                          users={ users }
                          mensajes={ mensajesDESC }
                          user={ user }
                          setReceptor={ setReceptor }
                          setConexion={ setConexion }
                          setMensaje={ setMensaje }
                          receptor={ receptor }
                          group={ group }
                          setGroup={ setGroup }
                          myGroups={ myGroups }
                          configurationGroups={ configurationGroups }
                          setConfigurationGroups={ setConfigurationGroups }
                          setIniciandoChat={ setIniciandoChat }
                          mensajesDESC={ mensajesDESC }
                        />
                        <Conversacion
                          users={ users }
                          mensajes={ mensajes }
                          user={ user }
                          receptor={ receptor }
                          conexion={ conexion }
                          mensajesDESC={ mensajesDESC }
                          mensaje={ mensaje }
                          setMensaje={ setMensaje }
                          group={ group }
                          myGroups={ myGroups }
                          setGroup={ setGroup }
                          eliminarMensaje={ eliminarMensaje }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer/>
        </div>
        : <div className="row justify-content-center">
          <Header
            buscado={ '' }
            setBuscado={ () => {

              '';

            } }
          />
          <IniciarChat
            setIniciandoChat={ setIniciandoChat }
            users={ users }
            mensajes={ mensajesDESC }
            user={ user }
            setReceptor={ setReceptor }
            setConexion={ setConexion }
            setMensaje={ setMensaje }
            receptor={ receptor }
            group={ group }
            setGroup={ setGroup }
            myGroups={ myGroups }
            configurationGroups={ configurationGroups }
            setConfigurationGroups={ setConfigurationGroups }
          />
          <Footer/>
        </div>
  );

};
