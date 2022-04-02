import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../../helper/isAuthorized.js';
import Swal from 'sweetalert2';
import logo from '../../static/SwishGamesLogo.png';
import logoSinLetras from '../../static/SwishGamesLogo_sin_letras.png';

const URI = 'http://localhost:8000/users/name/';

const User = () => {
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [birth_date, setBirthDate] = useState('')
    const [creation_date, setCreationDate] = useState('')

    const navigate = useNavigate();
    const { name } = useParams();
    const isauthorized = isAuthorized();

    useEffect( () => {
        getUserByName();
    }, []);

    const getUserByName = async () => {
        const res = await axios.get(URI + name);

        setDescription(res.data.descripcion)
        setEmail(res.data.email)
        setBirthDate(res.data.fecha_nacimiento)
        setCreationDate(res.data.fecha_creacion)
    };
    
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

    navigate( '/login' );

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
      
      <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top mat-shadow">
        <div className="container-fluid">
          <a className="navbar-brand"
            href="/">
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
                <a className="nav-link active navSelected"
                  aria-current="page"
                  href="/"><i className="fa-solid fa-gamepad"></i> Juegos</a>
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

            <button className="btn btn-outline-dark m-1"
              onClick={() => navigate( '/chat/' ) }>
              <i className="fa-solid fa-comments"></i></button>

            {nombreUsuario()}

            {doSesiones()}
          </div>
        </div>
      </header>
      

    <main class="row justify-content-center mt-5">
        <div class="col-3">
            <br></br>
            <br></br>
            <h1>{name}</h1>
            <h5>Descripción: {description}</h5>
            <h5>Email: {email}</h5>
            <h5>Fecha de nacimiento: {birth_date}</h5>
            <h5>Fecha de creación: {creation_date}</h5>
        </div>
        
        
        <div className="container bg-light fixed-bottom">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 my-3 border-top">
            <div className="col-md-4 d-flex align-items-center px-3">
              <span className="text-muted">© 2022 SwishGames, Inc</span>
            </div>

            <a href="/"
              className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
              <img className="bi me-2"
                width="32"
                height="32"
                src={logoSinLetras}></img>
            </a>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex px-3">
              <li className="nav-item"><a href="#"
                className="nav-link px-2 text-muted">Home</a></li>
              <li className="nav-item"><a href="#"
                className="nav-link px-2 text-muted">Contact</a></li>
              <li className="nav-item"><a href="#"
                className="nav-link px-2 text-muted">FAQs</a></li>
              <li className="nav-item"><a href="#"
                className="nav-link px-2 text-muted">About</a></li>
            </ul>
          </footer>
        </div>

      </main>

      

    </body>


  );

};

export default User;
