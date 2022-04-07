import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../../helper/isAuthorized.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../chat/components/Socket.js';
import { Header } from '../../helper/header.jsx';
import { Footer } from '../../helper/footer.jsx';
import { Global } from '../../helper/Global.js';

const Game = () => {

  const [game, setGame] = useState([]);
  const { id } = useParams();
  const isauthorized = isAuthorized();
  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}games/mostrar/`;

  useEffect( () => {

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );

    }

    getGameById();
    document.getElementById( 'btn-chat-header' ).classList.remove( 'ocultar' );
    document.getElementById( 'div-buscar-juegos-header' ).classList.add( 'ocultar' );
    document.getElementById( 'input-buscar-juegos-header' ).classList.add( 'ocultar' );

  }, []);

  const getGameById = async () => {

    const res = await axios.get( URI + id );
    setGame( res.data );

  };

  return (
    <div>
      <Header
        setGames={ () => {

          '';

        } }
        buscado={ '' }
        setBuscado={ () => {

          '';

        } }
      />
      <main className="row justify-content-center mt-5">
        <div className="col-2">
          <br></br>
          <br></br>
          <h1 >Game</h1>
          <h5>Titulo: {game.titulo}</h5>
        </div>
        <Footer/>
      </main>
    </div>


  );

};

export default Game;
