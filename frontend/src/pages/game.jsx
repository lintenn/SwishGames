import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../helper/isAuthorized.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/game.css';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global.js';

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

          <div class="rate">
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="5 estrellas">5 stars</label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="4 estrellas">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="3 estrellas">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="2 estrellas">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="1 estrella">1 star</label>
          </div>

        </div>
        <Footer/>
      </main>
    </div>


  );

};

export default Game;
