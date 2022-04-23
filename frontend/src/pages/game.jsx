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
import { setUpLists } from '../helper/SetUpLists.js';
import Swal from 'sweetalert2';

const Game = () => {

  const [game, setGame] = useState([]);
  const [lists, setLists] = useState([]);
  const [allLists, setAllLists] = useState([]);
  const { id } = useParams();
  const isauthorized = isAuthorized();
  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}games/mostrar/`;

  useEffect( () => {

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );

      setUpLists( us.nombre, setLists, setAllLists );

    }

    getGameById();
    document.getElementById( 'div-buscar-juegos-header' ).classList.add( 'ocultar' );
    document.getElementById( 'input-buscar-juegos-header' ).classList.add( 'ocultar' );

  }, []);

  const getGameById = async () => {

    const res = await axios.get( URI + id );
    setGame( res.data );

  };

  const newGameInList = () => {

    Swal.fire({
      html: `<div style="background-color: #f0eeee">${showLists( )}</div>`,
      background: '#f0eeee',
      showCloseButton: true,
      closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: false,
      width: '35%',
      didOpen: () => {
  
        addClickButton();
  
      }
  
    });

  };

  function showLists() {

    let divlists = '<h1>Selecciona la lista para añadir</h1>';

    lists.forEach( ( list ) => {

      divlists += 
        `<div class="d-flex flex-row mb-3">
        <button style="background-color: white; border-radius: 20px" name="newGameInList" value="${list.id}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
          <div class="align-items-center divObjectsSend">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
          </div>
          <div class="pb-1">
            <p class="fw-bold mb-0">${list.nombre}</p>
          </div>
        </button>
      </div>`;

    });

    return divlists;

  }

  const addClickButton = () => {
    
    document.querySelectorAll( 'button[name="newGameInList"]' ).forEach( ( boton ) => {

      boton.addEventListener( 'click', ( e ) => {
  
        e.preventDefault();
        //if ( document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ) !== null ) {
  
          //document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ).classList.remove( 'chatSeleccionado' );
  
        //}
        console.log(boton.value + ' : ' + document.getElementById( `${boton.value}` ));
        
        if ( boton.value !== null ) {
  
          axios.post( `${baseUrl}contentsLists/`, { id_lista: boton.value, id_juego: game.id });
  
        }
        Swal.close();

        Swal.fire({
          title: 'Juego añadido',
          text: '¡El juego ha sido añadido a la lista con éxito!',
          focusConfirm: false,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
  
      });
  
    });
  
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

          <div className="rate">
            <input type="radio"
              id="star5"
              name="rate"
              value="5" />
            <label htmlFor="star5"
              title="5 estrellas">5 stars</label>
            <input type="radio"
              id="star4"
              name="rate"
              value="4" />
            <label htmlFor="star4"
              title="4 estrellas">4 stars</label>
            <input type="radio"
              id="star3"
              name="rate"
              value="3" />
            <label htmlFor="star3"
              title="3 estrellas">3 stars</label>
            <input type="radio"
              id="star2"
              name="rate"
              value="2" />
            <label htmlFor="star2"
              title="2 estrellas">2 stars</label>
            <input type="radio"
              id="star1"
              name="rate"
              value="1" />
            <label htmlFor="star1"
              title="1 estrella">1 star</label>
          </div>
          {isauthorized ? 
            <button className="btn btn-outline-dark btn-lg mt-1 mb-1"
            onClick={() => newGameInList()}>
              <i className="fa-solid fa-plus"></i> Añadir a lista
            </button>
            : <div></div>
          }
          

        </div>
        <Footer/>
      </main>
    </div>


  );

};

export default Game;
