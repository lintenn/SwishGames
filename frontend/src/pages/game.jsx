import { useParams } from 'react-router-dom';
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
import { SidePanel } from '../components/game/SidePanel.jsx';
import { ReviewPanel } from '../components/game/ReviewPanel.jsx';

const Game = () => {

  const [game, setGame] = useState([]);
  const [lists, setLists] = useState([]);
  const [containedLists, setContainedLists] = useState([]);
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
            <button style="background-color: #c6daf8; border-radius: 20px; border-color: grey" name="newGameInList" value="${list.id}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
              <div class="align-items-center divObjectsSend mx-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
              </div>
              <div class="pb-1 mb-1">
                <p class="fw-bold mb-0">${list.nombre}</p>
              </div>
              <i class="fa-solid fa-square-check"></i>
            </button>
          </div>`
        : divlists +=
            `<div class="d-flex flex-row mb-1">
            <button style="background-color: white; border-radius: 20px; border-color: grey " name="newGameInList" value="${list.id}" class="align-items-center divObjectsSend botonTransparente d-flex align-self-center me-3 w-100 mt-2 mb-2">
              <div class="align-items-center divObjectsSend mx-1">
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
    divlists += `<button style="border-radius: 5px" name="newGameInList" value="new" class="btn btn-outline-dark align-items-center  align-self-center me-3 mt-2 mb-2">
      <i class="fa fa-plus-circle"></i> Crear nueva lista
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
            ).then( () => {

              newGameInList();

            });

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

  return (
    <div>
      <Header
        buscado={ '' }
        setBuscado={ () => {

          '';

        } }
      />

      <main className="row d-flex justify-content-center mt-5">

        <div className="row container col-md-12 col-lg-10 col-xl-9 col-xxl-8 mt-5">

          <section className="col-12 border card me-4">

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

          </section>

          <SidePanel game={game}></SidePanel>

          <section className="col-md-12 col-lg-8 border card d-flex justify-content-center mt-2">

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

          </section>

          <ReviewPanel game={game}></ReviewPanel>

        </div>

        <Footer/>
      </main>
    </div>

  );

};

export default Game;
