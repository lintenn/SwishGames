import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
;

// import '../login/login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const URI = 'http://localhost:8000/games/';

// const URI = 'https://swishgames-backend.herokuapp.com/games/';

const Game = () => {

  const [game, setGame] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect( () => {

    getGameById();

  }, []);

  const getGameById = async () => {

    const res = await axios.get( URI + id );
    setGame( res.data );

  };

  function doGames() {

    const listado = [];

    game.forEach( ( gam ) => {

      listado.push( gam.titulo );

    });


    return ( listado );

  }


  return (
    <div>
      <body>
        <h1>Game</h1>
        <h5>Titulo: {doGames()}</h5>
      </body>
    </div>


  );

};

export default Game;
