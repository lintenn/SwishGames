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

      navigate( '/noLogin' );

    } else {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );

      setUpLists( us.nombre, setLists, setAllLists );

    }

  }, []);

  useEffect( () => {

    if ( allLists.length !== 0 ) {

      document.getElementById( 'input-buscar-juegos-header' ).placeholder = 'Buscar listas';

    }

  }, [allLists]);

  const newList = () => {

    Swal.fire({
      title: 'Introduce el nombre de la nueva lista',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: 30
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true,
      preConfirm: ( name ) => {

        if ( name === '' ) {

          Swal.showValidationMessage( 'El nombre de la lista no puede estar vacío' );

        } else if ( name === 'Favoritos' ) {

          Swal.showValidationMessage( 'El nombre de la lista no puede ser Favoritos' );

        } else if ( lists.find( list => list.nombre === name ) ) {

          Swal.showValidationMessage( 'Ya tienes una lista con ese nombre' );

        } else {

          const token = localStorage.getItem( 'user' );
          const us = JSON.parse( token );

          axios.post( `${baseUrl}lists/`, { nombre: name, nombre_usuario: us.nombre });

          Swal.close();

          Swal.fire({
            title: 'Lista creada',
            text: '¡La lista ' + name + ' ha sido creada con éxito!',
            focusConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then( () => {

            setUpLists( us.nombre, setLists, setAllLists );

          });

        }

      }

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
              <button className="btn btn-outline-dark btn-lg mb-2 mt-1"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => newList()}>
                <i className="fa-solid fa-plus-circle"></i> Crear lista
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
