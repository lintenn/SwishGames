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

    if ( allLists.length === 0 ) {

      Swal.fire(
        'No tienes listas',
        'Debes crear una lista para poder agregar un juego',
        'warning'
      );

    } else {

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

    }

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

        // if ( document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ) !== null ) {

        // document.getElementById( `${( receptor === '' && group !== {}) ? group.id : receptor}` ).classList.remove( 'chatSeleccionado' );

        // }
        console.log( boton.value + ' : ' + document.getElementById( `${boton.value}` ) );

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

        <div className="row container col-8 mt-5">

          <div className="col-12 border card">

            <div className="d-flex justify-content-between mt-3">
              <h2 className="fw-bold ms-2">{game.titulo}</h2>

              {isauthorized
                ? <button className="btn btn-outline-dark me-2 mb-3"
                  onClick={() => newGameInList()}>
                  <i className="fa fa-plus-circle"></i> Añadir a lista
                </button>
                : <div></div>
              }

            </div>

          </div>

          <div className="mt-2 col-8 border card">

            <div className="col-4 ratio ratio-16x9 my-2 mx-2">
              <iframe width="560"
                height="315"
                src="https://www.youtube-nocookie.com/embed/qkQTMXCR-cE"
                title={game.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>

          </div>

          <div className="mt-2 col-4 border card">

            <div className="col-12 d-flex justify-content-center">
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
