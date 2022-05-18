import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isAuthorized } from '../helper/isAuthorized.js';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpList } from '../helper/SetUpList.js';
import { useNavigate } from '../../node_modules/react-router/index';

import Swal from 'sweetalert2';
import { Global } from '../helper/Global.js';
import { GamesPreviewList } from '../components/lists/GamesPreviewList.jsx';
import axios from 'axios';

const List = () => {

  const [games, setGames] = useState([]);
  const { id } = useParams();
  const [list, setList] = useState( null );
  const [user, setUser] = useState( null );
  const [buscado, setBuscado] = useState( '' );
  const isauthorized = isAuthorized();
  const baseUrl = Global.baseUrl;
  const navigate = useNavigate();

  // const URI = `${baseUrl}contentsLists/`;

  useEffect( () => {

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );

    }

    setUpList( id, setList, setGames );


  }, []);

  useEffect( () => {

    if ( list !== null && list.length > 0 ) {

      axios.get( `${baseUrl}users/${list[0].nombre_usuario}/` )
        .then( res => {

          setUser( res.data );

        }).catch( err => console.log( err ) );

    }

  }, [list]);

  const comprobarDuenyo = () => {

    let duenyo = false;
    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      duenyo = us.nombre === list[0].nombre_usuario;

    }
    return duenyo;

  };

  const showAdvertenciaBorrar = () => {

    if ( list[0].nombre === 'Favoritos' ) {

      Swal.fire(
        'No puedes borrar esta lista',
        '',
        'error'
      );

    } else {

      Swal.fire({
        title: '¿Estás seguro de que quieres borrar la lista?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
      }).then( ( result ) => {

        if ( result.value ) {

          axios.delete( `${baseUrl}lists/${id}` );

          Swal.fire(
            '¡Borrada!',
            'La lista ha sido borrada',
            'success'
          ).then( () => {

            navigate( '/lists/' );

          });

        }

      });

    }

  };

  return (
    list !== null && user !== null
      ? <div>
        <Header
          buscado={ buscado }
          setBuscado={ setBuscado }
        />
        <main className="row justify-content-center main mt-5"
          id="main-content">
          <div className="col-lg-8 list-group mt-5"
            data-bs-spy="scroll">

              <div className="d-flex w-100 justify-content-between">

                <div className="col-12 border card mb-2">

                  <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex justify-content-between">
                      <h1 className="text-dark fw-bold ms-3">{list[0].nombre}</h1>
                      <h6 className="text-muted overtexte mt-4 ms-3">Lista de {list[0].nombre_usuario}</h6>
                    </div>

                    {comprobarDuenyo()
                      ? 
                    <div>
                      <button className="btn btn-outline-dark me-2 mb-3">
                        <i className="fa fa-pencil"></i> Editar nombre
                      </button>
                      <button className="btn btn-outline-dark me-3 mb-3"
                        onClick={ () => showAdvertenciaBorrar() }>
                        <i className="fa fa-trash-can"></i> Eliminar lista
                      </button>
                    </div>
                    : <div></div>}
                  </div>
                  
                </div>
                
                
                {/*
                {comprobarDuenyo()
                  ? <div className="input-group rounded botonTransparente">
                    <div className="dropdown">
                       
                      <button className="botonTransparente2 btnAñadirChats pb-1"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i className="fa-solid fa-bars fa-2xl mt-3"></i>
                      </button>


                      <ul className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item"
                        >Editar nombre</button></li>
                        <li><button className="dropdown-item"
                          onClick={ () => showAdvertenciaBorrar() }>Borrar</button></li>
                      </ul>
                    </div>
                  </div>
                  : <div></div>}*/}


              </div>
            
            <GamesPreviewList
              id={ id }
              list={ list }
              setList={ setList }
              games={ games }
              setGames={ setGames }
              buscado={ buscado }

            />

          </div>
        </main>
        <Footer/>
      </div>
      : <div> </div>
  );

};

export default List;
