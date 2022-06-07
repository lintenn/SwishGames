import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import '../styles/signup.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import emailjs, { init } from '@emailjs/browser';
import { isAuthorized } from '../helper/isAuthorized.js';
import Swal from 'sweetalert2';
import logoSinLetras from '../static/SwishGamesLogo_sin_letras.png';
import logo from '../static/SwishGamesLogo.png';
import { setUpLogin } from '../helper/SetUpLogin';


init( 'WznRYXdNmfA-nSsG0' );

const Recovery = () => {

  const [m, setEmail] = useState( '' );
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const isauthorized = isAuthorized();

  useEffect( () => {

    if ( isauthorized ) {

      Swal.fire( 'Ya has iniciado sesión' ).then( () => {

        navigate( '/' );

      });

    }

    setUpLogin( setUsers );

    document.title = 'Recupera tu contraseña';
    document.getElementById( 'recoveryEmail' ).addEventListener( 'keyup', ( event ) => {

      if ( event.key === 'Enter' ) {

        event.preventDefault();
        document.getElementById( 'recoveryBtnEmail' ).click();

      }

    }, false );

  }, []);

  async function comprobarUser() {

    let esta = false;
    users.forEach( ( user ) => {

      if ( user.email === m ) {

        emailjs.send( 'service_b05hnvr', 'template_e54pr46', { email: m, to_name: user.name, password: user.password }, 'WznRYXdNmfA-nSsG0' )
          .then( ( result ) => {

            console.log( result.text );

          }, ( error ) => {

            console.log( error.text );

          });
        esta = true;
        document.getElementById( 'error' ).classList.remove( 'mostrar' );
        document.getElementById( 'successRec' ).classList.add( 'mostrar' );

      }

    });

    if ( !esta ) {

      document.getElementById( 'error' ).classList.add( 'mostrar' );

    }


  }

  function cerrar() {

    document.getElementById( 'error' ).classList.remove( 'mostrar' );

  }

  function cerrars() {

    document.getElementById( 'successRec' ).classList.remove( 'mostrar' );

  }

  return (
    <div className="signup">
      <h1>Recuperar contraseña</h1>
      <div>
        <header className="navbar navbar-expand-lg navbar-light fixed-top ">
          <div className="container-fluid">
            <NavLink className="navbar-brand"
              to="/">
              <img src={logo}
                width="80px"
                height="50px"
                alt="Logo" >
              </img>
            </NavLink>
          </div>
        </header>
        <div>
          <InputLabel htmlFor="standard-adornment-password"
            for="recoveryEmail"
            style={{ color: 'black' }}
          >
          Email
          </InputLabel>
          <Input className="input"
            type="text"
            id="recoveryEmail"
            value={m}
            name="e"
            inputProps={{ required: true }}
            onChange={ ( e ) => setEmail( e.target.value )}/>

          <nav className="botones"
            style={{ marginTop: '5px' }}>
            <button style={{ marginRight: '10px' }}
              type="submit"
              id= "recoveryBtnEmail"
              className="btn btn-primary btns"
              onClick={() => comprobarUser() }>
              Enviar email</button>
            <button style={{ marginLeft: '10px' }}
              type="submit"
              className="btn btn-secondary btns"
              onClick={() => navigate( '/login/' ) }
            > Volver</button>

          </nav>
        </div>

        <div id="successRec"
          className="alert alert-success ocultar"
          role="alert">
          <span id="closebtns"
            className="closebtn"
            onClick={ cerrars} >&times;</span>
                Correo enviado con éxito. No olvide revisar la carpeta &quot;spam&quot;.
        </div>
        <div id="error"
          className="alert alert-danger ocultar"
          role="alert">
          <span id="closebtn"
            className="closebtn"
            onClick={ cerrar} >&times;</span>
                El correo indicado no se ecuentra asociado a ninguna cuenta.
        </div>
        <div className="container-fluid fixed-bottom tamañoFooter">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-1 my-1">
            <div className="col-md-4 d-flex align-items-center px-3">
              <span className="greytext">© 2022 SwishGames, Inc</span>
            </div>
            <NavLink to="/"
              className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
              <img className="bi me-2"
                width="32"
                height="32"
                src={logoSinLetras}
                alt="logo_sin_letras"></img>
            </NavLink>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex px-3">
              <li className="nav-item"><a href="/"
                className="nav-link px-2 greytext">Inicio</a></li>
              <li className="nav-item"><a href="#Contact"
                className="nav-link px-2 greytext">Contacto</a></li>
              <li className="nav-item"><a href="#FAQs"
                className="nav-link px-2 greytext">FAQs</a></li>
              <li className="nav-item"><a href="#About"
                className="nav-link px-2 greytext">Acerca de</a></li>
            </ul>
          </footer>
        </div>
      </div>
    </div>
  );

};

export default Recovery;
