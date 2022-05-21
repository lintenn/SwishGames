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
        `<div class="d-flex flex-row mb-1">
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

        <div className="row container col-md-10 col-lg-9 col-xl-8 mt-5">

          <div className="col-12 border card">

            <div className="d-flex justify-content-between mt-3">
              <div className="d-flex justify-content-between">
                <h1 className="fw-bold ms-2">{game.titulo}</h1>
                <p className="text-muted overtexte mt-4 ms-3">{game.genero}</p>
              </div>

              {isauthorized
                ? <button className="btn btn-outline-dark me-2 mb-3"
                  onClick={() => newGameInList()}>
                  <i className="fa fa-plus-circle"></i> Añadir a lista
                </button>
                : <div></div>
              }

            </div>

          </div>

          <div className="mt-2 col-md-12 col-lg-8 border card d-flex justify-content-center">

            <div className="col-4 ratio ratio-16x9 my-2">
              <iframe width="560"
                height="315"
                src={game.video}
                title={game.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>

          </div>

            &nbsp;

          <div className="d-none d-lg-block col-lg-4 row ms-0 mt-2 border card">

            <table id="gameinfo">
              <tr>
                <td id="tdimg">
                  <div id="img"
                    className="col-12 mt-4 d-flex justify-content-center">
                    <img className="img-juego"
                      src={game.imagen}
                      width="75%"
                      height="100%"
                      alt={`#ImgGame${game.titulo}`} />
                  </div>
                </td>
              </tr>
              <tr>
                <td id="tdcontent">
                  <div id="content"
                    className="col-12 mt-2 d-flex justify-content-center">
                    <p className="text-center text-break fs-6 h6 lh-base">{game.descripcion}</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td id="tdcontent">
                  <div id="content"
                    className="col-12 mb-4 d-flex justify-content-center">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      fill="red"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    <p className="text-center text-break fs-2 fw-bold">{game.valoracion}</p>
                  </div>
                </td>
              </tr>
            </table>

          </div>

          <div className="col-12 d-lg-none row ms-0 mt-2 border card">
            <div id="img"
              className="col-12 mt-4 d-flex justify-content-center">
              <img className="img-juego"
                src={game.imagen}
                width="75%"
                height="100%"
                alt={`#ImgGame${game.titulo}`} />

              <table>
                <tr>
                  <td id="tdcontent">
                    <div id="content"
                      className="col-12 mt-2 d-flex justify-content-center">
                      <p className="text-center text-break fs-6 h6 lh-base">{game.descripcion}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td id="tdcontent">
                    <div id="content"
                      className="col-12 mb-4 d-flex justify-content-center">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        fill="red"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>
                      <p className="text-center text-break fs-2 fw-bold">{game.valoracion}</p>
                    </div>
                  </td>
                </tr>
              </table>

            </div>
          </div>

        </div>

        <div className="row container col-md-10 col-lg-9 col-xl-8 mt-2 mb-5">

          <div className="col-md-8 col-lg-8 col-xl-7 col-xxl-6 border card">

            <div className="d-flex justify-content-evenly mt-2 mb-3">

              <button className="btn btn-outline-dark ms-3 mt-2"
                id="valorar"
                onClick={() => newGameInList()}>
                <i className="fa fa-star"></i> Valorar juego
              </button>

              <div className="me-3 mb-2"
                id="rate">
                <input type="radio"
                  id="star5"
                  name="rate"
                  value="5" />
                <label htmlFor="star5"
                  id="start"
                  title="5 estrellas">5 stars</label>
                <input type="radio"
                  id="star4"
                  name="rate"
                  value="4" />
                <label htmlFor="star4"
                  id="start"
                  title="4 estrellas">4 stars</label>
                <input type="radio"
                  id="star3"
                  name="rate"
                  value="3" />
                <label htmlFor="star3"
                  id="start"
                  title="3 estrellas">3 stars</label>
                <input type="radio"
                  id="star2"
                  name="rate"
                  value="2" />
                <label htmlFor="star2"
                  id="start"
                  title="2 estrellas">2 stars</label>
                <input type="radio"
                  id="star1"
                  name="rate"
                  value="1" />
                <label htmlFor="star1"
                  id="start"
                  title="1 estrella">1 star</label>
              </div>

            </div>

          </div>

        </div>

        <Footer/>
      </main>
    </div>

  );

};

export default Game;
