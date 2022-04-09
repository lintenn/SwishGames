import React, { useEffect, useState } from 'react';
import { setUpChat } from '../../helper/SetUpChat';
import { ChatsActivos } from './components/ChatsActivos.jsx';
import { Conversacion } from './components/Conversacion.jsx';
import Swal from 'sweetalert2';
import './Chat.css';
import { isAuthorized } from '../../helper/isAuthorized.js';
import { useNavigate } from '../../../node_modules/react-router/index';
import socket from './components/Socket';
import { Header } from '../../helper/header';
import { Footer } from '../../helper/footer';

export const Chat = () => {

  const [mensajesDESC, setMensajesDESC] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState( null );
  const [receptor, setReceptor] = useState( '' );
  const [conexion, setConexion] = useState( '' );
  const [mensaje, setMensaje] = useState( '' );
  const isauthorized = isAuthorized();
  const navigate = useNavigate();

  useEffect( () => {

    if ( !isauthorized ) {

      Swal.fire( 'No has iniciado sesión' );
      navigate( '/' );

    }

    setUpChat( setUser, setUsers, setMensajes, setMensajesDESC );


  }, []);

  useEffect( () => {

    socket.on( 'mensajes', () => {

      setUpChat( setUser, setUsers, setMensajes, setMensajesDESC );

    });

    return () => {

      socket.off();

    };

  }, [mensajes, users]);

  return (
    user === null || users.length === 0 || mensajes.length === 0 || mensajesDESC.length === 0
      ? <div>{Swal.showLoading()}</div>
      : <div className="row justify-content-center">
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
                      />
                      <Conversacion
                        mensajes={ mensajes }
                        user={ user }
                        receptor={ receptor }
                        conexion={ conexion }
                        mensajesDESC={ mensajesDESC }
                        mensaje={ mensaje }
                        setMensaje={ setMensaje }
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
  );

};
