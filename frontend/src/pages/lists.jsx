import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../helper/isAuthorized.js';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpLists } from '../helper/SetUpLists.js';
import Swal from 'sweetalert2';
import { ListsPreview } from '../components/lists/ListsPreview.jsx';
import { useNavigate } from '../../node_modules/react-router/index';
import axios from 'axios';
import { Global } from '../helper/Global';


const Lists = () => {

  const [lists, setLists] = useState([]);
  const [allLists, setAllLists] = useState([]);
  const [buscado, setBuscado] = useState( '' );
  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  const baseUrl = Global.baseUrl;

  useEffect( () => {

    if ( !isauthorized ) {

      Swal.fire( 'No has iniciado sesión' ).then( () => {

        navigate( '/' );

      });

    } else {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );

      setUpLists( us.nombre, setLists, setAllLists );

    }

  }, []);

  const newList = () => {

    Swal.fire({
      html: `<div style="background-color: #f0eeee">${showCreateNewList()}</div>`,
      background: '#f0eeee',
      showCloseButton: true,
      closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      width: '35%',
      didOpen: () => {

        addClickButtonNewList();

      }

    });

  };

  const showCreateNewList = () => {

    let formList = '';

    formList += `
          <br/>
          <h1>Crear nueva lista</h1>
          <br/>
          <br/>
          Nombre
          <br/>
          <input type="text" id="nameNewList"/>
          <br/>
          <br/>
          <button style="background-color: white; border-radius: 5px" name="newList">Crear</button>
          `;

    return ( formList );

  };

  const addClickButtonNewList = () => {

    document.querySelectorAll( 'button[name="newList"]' ).forEach( ( boton ) => {

      boton.addEventListener( 'click', ( e ) => {

        e.preventDefault();
        if ( document.getElementById( 'nameNewList' ).value === '' ) {

          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: '¡El nombre de la lista no puede estar vacio!'
          }).then( () => {

            Swal.fire({
              html: `<div style="background-color: #f0eeee">${showCreateNewList()}</div>`,
              background: '#f0eeee',
              showCloseButton: true,
              closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
              showCancelButton: false,
              showConfirmButton: false,
              focusConfirm: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
              width: '35%',
              didOpen: () => {

                addClickButtonNewList();

              }

            });

          });

        } else if ( document.getElementById( 'nameNewList' ).value === 'Favoritos' ) {

          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: '¡No puedes crear otra lista de Favoritos! Prueba con otro nombre.'
          }).then( () => {

            Swal.fire({
              html: `<div style="background-color: #f0eeee">${showCreateNewList()}</div>`,
              background: '#f0eeee',
              showCloseButton: true,
              closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
              showCancelButton: false,
              showConfirmButton: false,
              focusConfirm: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
              width: '35%',
              didOpen: () => {

                addClickButtonNewList();

              }

            });

          });

        } else {

          const token = localStorage.getItem( 'user' );
          const us = JSON.parse( token );

          axios.post( `${baseUrl}lists/`, { nombre: document.getElementById( 'nameNewList' ).value, nombre_usuario: us.nombre });

          Swal.close();

          Swal.fire({
            title: 'Lista creada',
            text: '¡La lista ha sido creada con éxito!',
            focusConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then( () => {

            setUpLists( us.nombre, setLists, setAllLists );

          });

        }

      });

    });

  };


  return (
    allLists.length === 0
      ? <div></div>
      : <div>
        <Header
          buscado={ buscado }
          setBuscado={ setBuscado }
        />
        <main className="row justify-content-center main"
          id="main-content">
          <div className="col-lg-8 list-group"
            data-bs-spy="scroll">
            <div className="d-flex w-100 justify-content-between">
              <h1 className="mt-1 text-dark fw-bold px-3"> Tus listas: </h1>
              <button className="btn btn-outline-dark btn-lg mb-1"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => newList()}>
                <i className="fa-solid fa-plus"></i> Crear lista
              </button>
            </div>
            <ListsPreview
              lists={ lists }
              setLists={ setLists }
              buscado={ buscado }
              setAllLists={ setAllLists }
            />
          </div>
        </main>
        <Footer/>
      </div>
  );


};

export default Lists;
