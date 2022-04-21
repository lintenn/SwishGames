import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isAuthorized } from '../helper/isAuthorized.js';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpList } from '../helper/SetUpList.js';

// import Swal from 'sweetalert2';
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

          console.log( `${baseUrl}users/${list[0].nombre_usuario}/` );
          setUser( res.data );

        }).catch( err => console.log( err ) );

    }

  }, [list]);

  const comprobarDuenyo = () => {

    let duenyo = false;
    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      duenyo = us.id === list[0].id_usuario;

    }
    return duenyo;

  };


  return (
    list !== null && user !== null
      ? <div>
        <Header
          buscado={ buscado }
          setBuscado={ setBuscado }
        />
        <main className="row justify-content-center main"
          id="main-content">
          <div className="col-lg-8 list-group"
            data-bs-spy="scroll">

            <div className="d-flex w-100 justify-content-between">
              <div>
                <h1 className="mt-1 text-dark fw-bold px-3"> {list[0].nombre} </h1>
                <h6 className="text-muted px-3"> Lista de {list[0].nombre_usuario} </h6>
              </div>
              {comprobarDuenyo()
                ? <div className="input-group rounded botonTransparente">
                  <div className="dropdown">
                    <button className="botonTransparente2 btnAñadirChats"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <i className="fa-solid fa-ellipsis-vertical fa-2xl"></i>
                    </button>
                    <ul className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1">
                      <li><button className="dropdown-item"
                      >Editar</button></li>
                      <li><button className="dropdown-item"
                      >Borrar</button></li>
                    </ul>
                  </div>
                </div>
                : <div></div>}
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
