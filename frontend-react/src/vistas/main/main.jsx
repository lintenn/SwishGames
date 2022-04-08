import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../../helper/isAuthorized.js';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../chat/components/Socket.js';
import { Header } from '../../helper/header.jsx';
import { Footer } from '../../helper/footer.jsx';
import { setUpMain } from '../../helper/SetUpMain.js';
import Swal from 'sweetalert2';
import { Games } from './components/Games.jsx';

const Main = () => {

  const [games, setGames] = useState([]);
  const [buscado, setBuscado] = useState( '' );
  const isauthorized = isAuthorized();


  useEffect( () => {

    setUpMain( setGames );

  }, []);


  useEffect( () => {

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );

    }

  }, []);

  return (
    games === null
      ? <div>{Swal.showLoading()}</div>
      : <div>
        <Header
          setGames={ setGames }
          buscado={ buscado }
          setBuscado={ setBuscado }
        />
        <main className="row justify-content-center main"
          id="main-content">
          <div className="col-lg-8 list-group"
            data-bs-spy="scroll">
            <Games
              games={ games }
              setGames={ setGames }
              buscado={ buscado }
            />
          </div>
          <Footer/>
        </main>
      </div>
  );

};

export default Main;
