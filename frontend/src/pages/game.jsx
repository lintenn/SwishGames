import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../helper/isAuthorized.js';

// import 'bootstrap/dist/css/bootstrap.min.css';
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

        <div className="row container col-8 mt-5">

          <div className="col-12 border card">

            <div class="d-flex justify-content-between mt-3">
              <h2 className='fw-bold ms-2'>{game.titulo}</h2>
  
              <button className="btn btn-outline-dark me-2 mb-3">
                <i className="fa fa-plus-circle"></i> Añadir a lista
              </button>
            </div>

          </div>

          <div className="mt-2 col-8 border card">

            <div className="col-4 ratio ratio-16x9 my-2 mx-2">
              <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/qkQTMXCR-cE" title={game.titulo}
              frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
              </iframe>
            </div>
            
          </div>

          <div className='mt-2 col-4 border card'>

            <div className='col-12 d-flex justify-content-center'>
              <img className="img-juego mt-2"
                  src={game.imagen}
                  width="75%"
                  height="100%"
                  alt={`#ImgGame${game.titulo}`} />
            </div>

            

          </div>

        </div>





        <Footer/>
      </main>
    </div>


  );

};

export default Game;
