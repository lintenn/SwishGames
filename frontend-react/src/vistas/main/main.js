import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../../helper/isAuthorized.js';
import Swal from 'sweetalert2';
import logo from '../../static/SwishGamesLogo.png';

// import '../login/login.css'
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const URI = 'http://localhost:8000/games/';

// const URI = 'https://swishgames-backend.herokuapp.com/games/'

const Main = () => {

  const [games, setGames] = useState([]);
  const [buscado, setBuscado] = useState( '' );
  const navigate = useNavigate();
  const isauthorized = isAuthorized();


  useEffect( () => {

    getGames();

  }, []);

  // procedimineto para obtener todos los usuarios
  const getGames = async () => {

    const res = await axios.get( URI );
    setGames( res.data );

  };

  const buscar = async () => {

    const res = await axios.get( URI + 'buscar/' + buscado );
    setGames( res.data );
    console.log( buscado );

    // navigate( '/' );

  };

  function doGames() {

    const listado = [];

    games.map( ( game ) => {

      listado.push(
        <Link to={'/game/game/' + game.id}>
          <a href="#"
            className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <img className="img-juego"
                src={game.imagen}
                width="200"
                height="150" />
              <div className="px-2">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{game.titulo}</h5>
                  <small className="text-muted">Valoración: {game.valoracion}</small>
                </div>
                <p className="mb-1">{game.descripcion}</p>
                <small className="text-muted">Género: {game.genero}</small>
              </div>
            </div>
          </a>
        </Link>
      );

    });

    return ( listado );

  }

  function doSesiones() {

    const listado = [];

    if ( isauthorized ) {

      listado.push(
        <button className="btn btn-outline-dark m-1"
          onClick={() => cerrarSesion() }>
          <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
      );

    }

    return ( listado );

  }

  function cerrarSesion() {

    localStorage.clear();
    navigate( '/' );
    Swal.fire( 'Has cerrado sesión', 'La sesión ha sido cerrada con éxito.', 'success' );

  }

  function iniciarSesion() {

    navigate( '/login/login' );

  }

  function nombreUsuario() {

    const listado = [];

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const user = JSON.parse( token );

      listado.push(
        <button className="btn btn-outline-dark m-1">
          <i className="fa-solid fa-user"></i> {user.nombre}
        </button>
      );

    } else {

      listado.push(
        <button className="btn btn-outline-dark m-1"
          onClick={() => iniciarSesion() }>
          <i className="fa-solid fa-user"></i> Identifícate
        </button>
      );

    }

    return ( listado );

  }


  return (
    <body>

      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand"
            href="">
            <img src={logo}
              width="80px"
              height="50px" >
            </img>
          </a>
          <button className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse"
            id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active"
                  aria-current="page"
                  href=""><i className="fa-solid fa-gamepad"></i> Juegos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link"
                  href="#"><i className="fa-solid fa-rectangle-list"></i> Listas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link"
                  href="#"><i className="fa-solid fa-users"></i> Usuarios</a>
              </li>
            </ul>
            <form method="GET"
              className="d-flex m-2">
              <input className="form-control me-2"
                type="search"
                name="titulo"
                placeholder="Buscar juego"
                aria-label="Search"
                value={buscado}
                onChange={ ( b ) => setBuscado( b.target.value ) }/>
              <button className="btn btn-outline-success "
                type="submit"
                onClick={() => buscar()}>Buscar</button>
            </form>

            <button className="btn btn-outline-dark m-1"
              onClick={() => navigate( '/chat/Chat/' ) }>
              <i className="fa-solid fa-comments"></i></button>

            {nombreUsuario()}

            {doSesiones()}
          </div>
        </div>
      </header>

      <main className="main">

        <div className="list-group">
          {doGames()}
        </div>
      </main>


    </body>

  );

};

export default Main;
