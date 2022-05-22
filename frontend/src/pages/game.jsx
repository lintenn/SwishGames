import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../helper/isAuthorized.js';

import 'bootstrap/dist/css/bootstrap.min.css';
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
  const [containedLists, setContainedLists] = useState([]);
  const [allLists, setAllLists] = useState([]);
  const [rate, setRate] = useState([]);
  const { id } = useParams();
  const isauthorized = isAuthorized();
  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}games/mostrar/`;
  const URIedit = `${baseUrl}games/`;
  const navigate = useNavigate();

  useEffect( () => {

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );

      setUpLists( us.nombre, setLists, setAllLists );

      axios.get( `${baseUrl}lists/user/${us.nombre}/game/${id}` )
        .then( res => {

          setContainedLists( res.data );

        }).catch( err => console.log( err ) );

    }

    getGameById();
    document.getElementById( 'div-buscar-juegos-header' ).classList.add( 'ocultar' );
    document.getElementById( 'input-buscar-juegos-header' ).classList.add( 'ocultar' );

  }, []);

  useEffect( () => {

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );

      axios.get( `${baseUrl}lists/user/${us.nombre}/game/${game.id}` )
        .then( res => {

          setContainedLists( res.data );

        }).catch( err => console.log( err ) );

    }

  }, [game]);

  useEffect( () => {

    setRate( game.valoracion );

  }, [game]);

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

  function contains( idList, lists ) {

    let contains = false;
    lists.forEach( l => {

      if ( ( l.id + '' ) === ( idList + '' ) ) {

        contains = true;

      }

    });

    return contains;

  }

  function showLists() {

    let divlists = '<h1>Selecciona la lista para añadir</h1>';

    lists.forEach( ( list ) => {

      contains( list.id, containedLists )
        ? divlists +=
            `<div class="d-flex flex-row mb-1">
            <button style="background-color: grey; border-radius: 20px" name="newGameInList" value="${list.id}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
              <div class="align-items-center divObjectsSend">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
              </div>
              <div class="pb-1">
                <p class="fw-bold mb-0">${list.nombre}</p>
              </div>
            </button>
          </div>`
        : divlists +=
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

    // añadimos un botón para crear una nueva lista
    divlists += `<button style="border-radius: 10px" name="newGameInList" value="new" class="button-dark align-items-center d-flex align-self-center me-3 mt-2 mb-2">
      Crear nueva lista
    </button>`;

    return divlists;

  }

  function nameOfSelectedList( id, lists ) {

    let name = '';
    lists.forEach( l => {

      if ( ( l.id + '' ) === ( id + '' ) ) {

        name = l.nombre;

      }

    });
    return name;

  }

  const addClickButton = () => {

    document.querySelectorAll( 'button[name="newGameInList"]' ).forEach( ( boton ) => {

      boton.addEventListener( 'click', ( e ) => {

        e.preventDefault();

        if ( boton.value !== null ) {

          if ( boton.value === 'new' ) {

            Swal.fire({
              title: 'Nueva lista',
              input: 'text',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              confirmButtonText: 'Crear',
              showLoaderOnConfirm: true,
              preConfirm: ( name ) => {

                if ( name === '' ) {

                  Swal.showValidationMessage( 'El nombre de la lista no puede estar vacío' );

                } else if ( name === 'Favoritos' ) {

                  Swal.showValidationMessage( 'El nombre de la lista no puede ser Favoritos' );

                } else {

                  const token = localStorage.getItem( 'user' );
                  const us = JSON.parse( token );

                  axios.post( `${baseUrl}lists/`, { nombre: name, nombre_usuario: us.nombre });

                  Swal.close();

                  Swal.fire({
                    title: 'Lista creada',
                    text: '¡La lista ha sido creada con éxito! Ahora puedes añadir el juego a esta lista',
                    focusConfirm: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  }).then( () => {

                    setUpLists( us.nombre, setLists, setAllLists );

                  });

                }

              }

            });

          } else

          if ( contains( boton.value, containedLists ) ) {

            Swal.close();

            Swal.fire(
              'Ya está en la lista',
              '¡El juego ya se encuentra en esa lista!',
              'error'
            );

          } else {

            axios.post( `${baseUrl}contentsLists/`, { id_lista: boton.value, id_juego: game.id });

            Swal.close();

            Swal.fire(
              'Juego añadido',
              'El juego ha sido añadido a la lista ' + nameOfSelectedList( boton.value, lists ),
              'success'
            ).then( () => {

              window.location.reload();

            });

          }

        }

      });

    });

  };

  /*
  const update = async ( e ) => {

    e.preventDefault();
    await axios.put( URIedit + game.id, {
      valoracion: rate
    });
    //navigate( '/' );
    //navigate( '/game/' + game.titulo );

  }; */

  const rateGame = () => {

    Swal.fire({
      title: '¿Desea valorar ' + game.titulo + ' con ' + rate + ( rate === 1 ? ' estrella' : ' estrellas' ) + '?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then( ( result ) => {

      if ( result.value ) {

        axios.put( URIedit + game.id, {
          valoracion: rate
        });

      }

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

        <div className="row container col-md-12 col-lg-9 col-xl-8 mt-5">

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
                    <p className="text-center text-break fs-2 fw-bold">{rate}</p>
                  </div>
                </td>
              </tr>
            </table>

          </div>

          <div className="col-12 d-lg-none row ms-0 mt-2 border card">
            <div className="col-12 my-3 d-flex justify-content-center">
              <img className="img-juego col-4"
                src={game.imagen}
                width="75%"
                height="100%"
                alt={`#ImgGame${game.titulo}`} />


              <table className="col-5 ms-3">
                <tr>
                  <td id="tdcontent">
                    <div id="content"
                      className="d-flex justify-content-center">
                      <p className="text-center text-break fs-6 h6 lh-base">{game.descripcion}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td id="tdcontent">
                    <div id="content"
                      className="mb-4 d-flex justify-content-center">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        fill="red"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>
                      <p className="text-center text-break fs-2 fw-bold">{rate}</p>
                    </div>
                  </td>
                </tr>
              </table>

            </div>
          </div>

        </div>

        <div className="row container col-md-12 col-lg-9 col-xl-8 mt-2 mb-5">

          <div className="col-md-6 col-lg-8 col-xl-7 col-xxl-6 border card">

            <div className="d-flex justify-content-evenly mt-2 mb-3">
              {/* onSubmit={rateGame} */}

              <button className="btn btn-outline-dark ms-3 mt-2"
                id="valorar"
                type="submit"
                onClick={rateGame}>
                <i className="fa fa-star"></i> Valorar juego
              </button>

              <div className="me-3 mb-2"
                id="rate">
                <input type="radio"
                  id="star5"
                  name="rate"
                  value="5"
                  onChange={e => setRate( e.target.value )}
                  checked={rate === 5}/>
                <label htmlFor="star5"
                  id="start"
                  title="5 estrellas">5 stars</label>
                <input type="radio"
                  id="star4"
                  name="rate"
                  value="4"
                  onChange={e => setRate( e.target.value )}
                  checked={rate === 4}/>
                <label htmlFor="star4"
                  id="start"
                  title="4 estrellas">4 stars</label>
                <input type="radio"
                  id="star3"
                  name="rate"
                  value="3"
                  onChange={e => setRate( e.target.value )}
                  checked={rate === 3}
                />
                <label htmlFor="star3"
                  id="start"
                  title="3 estrellas">3 stars</label>
                <input type="radio"
                  id="star2"
                  name="rate"
                  value="2"
                  onChange={e => setRate( e.target.value )}
                  checked={rate === 2}/>
                <label htmlFor="star2"
                  id="start"
                  title="2 estrellas">2 stars</label>
                <input type="radio"
                  id="star1"
                  name="rate"
                  value="1"
                  onChange={e => setRate( e.target.value )}
                  checked={rate === 1}/>
                <label htmlFor="star1"
                  id="start"
                  title="1 estrella">1 star</label>
              </div>

            </div>

          </div>

          <div className="col-md-6 col-lg-4 col-xl-5 col-xxl-6 border card">
            <div className="d-flex justify-content-end mt-2 mb-3">
              <button className="btn btn-outline-dark me-2 mt-2"
                id="valorar"
                onClick={() => newGameInList()}>
                <i className="fa-solid fa-message"></i> Publicar review
              </button>
            </div>
          </div>

        </div>

        <Footer/>
      </main>
    </div>

  );

};

export default Game;
