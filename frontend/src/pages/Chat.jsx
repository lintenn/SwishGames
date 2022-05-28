import React, { useEffect, useState } from 'react';
import { setUpChat } from '../helper/SetUpChat';
import { ChatsActivos } from '../components/chat/ChatActivos.jsx/ChatsActivos.jsx';
import { Conversacion } from '../components/chat/Conversacion/Conversacion';
import '../styles/Chat.css';
import { isAuthorized } from '../helper/isAuthorized.js';
import { useNavigate, useParams } from '../../node_modules/react-router/index';
import socket from '../components/chat/Socket';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { IniciarChat } from '../components/chat/IniciarChat';

export const Chat = () => {

  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  const { receptorActual } = useParams();
  const [receptor, setReceptor] = useState( '' );
  const [conexion, setConexion] = useState( '' );
  const [mensaje, setMensaje] = useState( '' );
  const [configurationGroups, setConfigurationGroups] = useState( '' );
  const [user, setUser] = useState( null );
  const [conMensajes, setConMensajes] = useState( false );
  const [iniciandoChat, setIniciandoChat] = useState( false );
  const [responder, setResponder] = useState( false );
  const [recienEnviado, setRecienEnviado] = useState( false );
  const [group, setGroup] = useState({});
  const [mensajesDESC, setMensajesDESC] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [users, setUsers] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [mensajesBuscar, setMensajesBuscar] = useState([]);

  useEffect( () => {

    if ( !isauthorized ) {

      navigate( '/noLogin' );

    } else {

      setUser( JSON.parse( localStorage.getItem( 'user' ) ) );
      if ( receptorActual !== undefined ) {

        setReceptor( receptorActual );

      }

    }

  }, []);

  useEffect( () => {

    if ( user !== null ) {

      setUpChat( user, setUsers, setMensajes, setMensajesDESC, setMyGroups, setMensajesBuscar );

    }

  }, [user]);

  useEffect( () => {

    socket.on( 'mensajes', () => {

      setUpChat( user, setUsers, setMensajes, setMensajesDESC, setMyGroups, setMensajesBuscar );

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

        if ( mensaje.id_grupo_receptor !== 1 ) {

          setConMensajes( true );

        }

      });

    }

  }, [mensajes, myGroups, user]);

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
                          mensajes={ mensajes }
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
                          setResponder={ setResponder }
                          mensajesBuscar={ mensajesBuscar }
                          setMensajesBuscar={ setMensajesBuscar }
                          recienEnviado={ recienEnviado }
                          setRecienEnviado={ setRecienEnviado }
                        />
                        <Conversacion
                          users={ users }
                          mensajes={ mensajes }
                          user={ user }
                          receptor={ receptor }
                          conexion={ conexion }
                          mensaje={ mensaje }
                          setMensaje={ setMensaje }
                          group={ group }
                          myGroups={ myGroups }
                          setGroup={ setGroup }
                          setReceptor={ setReceptor }
                          setConexion={ setConexion }
                          responder={ responder }
                          setResponder={ setResponder }
                          setRecienEnviado={ setRecienEnviado }
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
