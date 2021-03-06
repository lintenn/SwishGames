import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../helper/isAuthorized.js';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpMain } from '../helper/SetUpMain.js';
import { setUpFavorites } from '../helper/SetUpFavorites.js';
import Swal from 'sweetalert2';
import { Games } from '../components/games/Games.jsx';
import axios from 'axios';
import { Global } from '../helper/Global.js';

const Main = () => {

  const [games, setGames] = useState([]);
  const [favGames, setFavGames] = useState([]);
  const [favList, setFavList] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [buscado, setBuscado] = useState( '' );
  const isauthorized = isAuthorized();
  const baseUrl = Global.baseUrl;

  const montarFavGames = async ( setFavGames ) => {

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );

      await axios.get( `${baseUrl}lists/user/${us.nombre}/fav/` ).then( res => {

        setFavList( res.data );

      }).catch( err => {

        console.log( err );

      });

      setUpFavorites( us.nombre, setFavGames );

    }

    document.title = 'Juegos';

  };


  useEffect( () => {

    montarFavGames( setFavGames );

    setUpMain( setGames, setAllGames );

  }, []);

  return (
    allGames.length === 0
      ? <div>{Swal.showLoading()}</div>
      : <div>
        <Header
          buscado={ buscado }
          setBuscado={ setBuscado }
        />
        <main className="row justify-content-center main"
          id="main-content">

          <h1 className="invisible">SwishGames</h1>

          <div className="col-lg-8 list-group"
            data-bs-spy="scroll">
            <Games
              games={ games }
              setGames={ setGames }
              favGames={ favGames }
              setFavGames={ setFavGames }
              buscado={ buscado }
              setAllGames={ setAllGames }
              favList={ favList }
            />
          </div>
        </main>
        <Footer/>
      </div>
  );

};

export default Main;
