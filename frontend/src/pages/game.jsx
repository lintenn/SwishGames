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
import { Params } from '../../node_modules/react-router-dom/index.js';
import { SidePanel } from '../components/game/SidePanel.jsx'

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

///////////////////////////////////////////////////////////////////////////////////////////////////


  const [hid, setHid] = useState(false);
  const [count, setCount] = React.useState(0);

  function divclicked() {
    if (!hid) {
      setHid(true)
    }
   else {
      setHid(false)
   }
  }

  const publicReview = () => {

    Swal.fire({

      title: '¿Está seguro que desea publicar esta review del juego ' + game.titulo + '?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'

    })

  }

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

          <section className="col-12 border card">

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
          
          
          {/*

////////////////////////////////////////////

          <section className="d-none d-lg-block col-lg-4 me-0 mt-2 border card">

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
                    <p className="text-center text-break fs-2 fw-bold">{averageRate}</p>
                  </div>
                </td>
              </tr>
            </table>

          </section>



////////////////////////////////////////////////////////


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
                      <p className="text-center text-break fs-2 fw-bold">{averageRate}</p>
                    </div>
                  </td>
                </tr>
              </table>

            </div>
          </div>
*/}
        </div>
{/* 
        <div className="row container col-md-12 col-lg-10 col-xl-9 col-xxl-8 mt-2 mb-5">

          <div className="col-md-6 col-lg-7 col-xl-7 col-xxl-8 border card alto"></div>
{/*
          <div className="col-md-6 col-lg-5 col-xl-5 col-xxl-6 border card alto">
            <div className="d-flex justify-content-end mt-2 mb-3">
            
            {/* 
            <p className='mt-3'>
            <i class="fa-solid fa-thumbs-up me-2"></i>Reviews positivas</p>

            <p className='mt-3 fs-6 h6 lh-base'>
              ¡Publica tu review!
            </p>
              

              <button className="btn btn-outline-dark me-2 mt-2"
                id="valorar"
                onClick={divclicked}>
                <i className="fa-solid fa-message"></i> {(hid) ? "Descartar" : "Publicar"} review
              </button>
           
            </div>

          </div>

          
          <div id="seconddiv" className={(hid) ? "coolclass col-6" : "col-6"}></div>

          <div id="seconddiv" className={(hid) ? "coolclass col-6 border card" : "col-6"}>

            <div className='d-flex justify-content-between'>
              <h4 className="fw-bold ms-2 mt-3">
                Escribe tu review
              </h4>
              <p className=' mt-3'>Caracteres restantes: {200 - count}</p>
            </div>

            <div>
              <textarea className={(count > 0 && count < 201) ? "form-control my-1 border-success" : "form-control my-1 border-danger"}  onChange={e => setCount(e.target.value.length)}></textarea>
            </div>

            <div className='d-flex justify-content-start'>
              <p className=''>¿Recomiendas el juego?</p>
              <div class="form-check form-check-inline mt-2">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                <label class="form-check-label" for="inlineRadio1">Si</label>
              </div>
              <div class="form-check form-check-inline mt-2">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                <label class="form-check-label" for="inlineRadio2">No</label>
              </div>
            </div>

            <button className="btn btn-outline-dark me-2 my-2"
                id="valorar"
                onClick={publicReview}>
                <i className="fa-solid fa-message"></i> Publicar
              </button>



          </div> 
          
          

          
          <div className='col-md-12 col-lg-4 mt-2 border card mb-5'>
            <div className='d-flex justify-content-between'>
              <p className='fw-bold fs-5'>Usuario123</p>
              <p className='fst-italic'>
              <i class="fa-solid fa-thumbs-up me-1"></i>Recomienda el juego</p>
            </div>

            <div className='d-flex justify-content-start'>
              <p>Este es un comentario de un usuario que que le ha gustado el juego mucho</p>
            </div>

            <div className='d-flex justify-content-end'>
              <p>25/05/2022</p>
            </div>

          </div>

          <div className='col-md-12 col-lg-4 mt-2 border card mb-5'>
          <i src="https://res.cloudinary.com/duvhgityi/image/upload/v1650761808/FotosGrupos/585e4bf3cb11b227491c339a_1_bwucjs.png"></i>
            <div className='d-flex justify-content-between'>
              <p className='fw-bold fs-5'>Usuario123</p>
              <p className='fst-italic'>
              <i class="fa-solid fa-thumbs-up me-1"></i>Recomienda el juego</p>
            </div>

            <div className='d-flex justify-content-start'>
              <p>Este es un comentario de un usuario que que le ha gustado el juego mucho</p>
            </div>

            <div className='d-flex justify-content-end'>
              <p>25/05/2022</p>
            </div>

          </div>

          <div className='col-md-12 col-lg-4 mt-2 border card mb-5'>
            <div className='d-flex justify-content-between'>
              <p className='fw-bold fs-5'>Usuario123</p>
              <p className='fst-italic'>
              <i class="fa-solid fa-thumbs-down me-1"></i>No recomienda el juego</p>
            </div>

            <div className='d-flex justify-content-start'>
              <p>Este es un comentario de un usuario que que le ha gustado el juego mucho</p>
            </div>

            <div className='d-flex justify-content-end'>
              <p>25/05/2022</p>
            </div>

          </div>



        </div>
*/}
        <Footer/>
      </main>
    </div>

  );

};

export default Game;
