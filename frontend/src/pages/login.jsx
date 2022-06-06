import { useNavigate, Link, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import '../styles/login.css';
import { isAuthorized } from '../helper/isAuthorized.js';
import Swal from 'sweetalert2';
import { setUpLogin } from '../helper/SetUpLogin';
import logo from '../static/SwishGamesLogo.png';
import logoSinLetras from '../static/SwishGamesLogo_sin_letras.png';


const Login = () => {

  const [u, setNombre] = useState( '' );
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const isauthorized = isAuthorized();

  useEffect( () => {

    if ( isauthorized ) {

      Swal.fire( 'Ya has iniciado sesión' ).then( () => {

        navigate( '/' );

      });

    }
    setUpLogin( setUsers );
    document.title = 'Login';
    document.getElementById( 'loginPsw' ).addEventListener( 'keyup', ( event ) => {

      if ( event.key === 'Enter' ) {

        event.preventDefault();
        document.getElementById( 'loginBtnPsw' ).click();

      }

    }, false );

  }, []);

  function comprobarUser() {

    let esta = false;
    users.forEach( ( user ) => {

      if ( user.nombre === u && user.password === values.password ) {

        esta = true;
        document.getElementById( 'error' ).classList.remove( 'mostrar' );
        localStorage.setItem( 'user', JSON.stringify({ id: user.id, nombre: user.nombre, email: user.email, password: user.password }) );
        navigate( '/' );

      }

    });

    if ( !esta ) {

      document.getElementById( 'error' ).classList.add( 'mostrar' );

    }

    return esta;


  }

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false

  });

  const handleClickShowPassword = () => {

    setValues({ ...values, showPassword: !values.showPassword });

  };

  const handleMouseDownPassword = ( event ) => {

    event.preventDefault();

  };

  const handlePasswordChange = ( prop ) => ( event ) => {

    setValues({ ...values, [prop]: event.target.value });

  };

  function cerrar() {

    document.getElementById( 'error' ).classList.remove( 'mostrar' );

  }

  return (
    <div className="login"
      id="login" >
      <h1>Iniciar sesión</h1>
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
        <InputLabel
          htmlFor="usuario"
          style={{ color: 'black' }}>
          Usuario
        </InputLabel>
        <Input className="input"
          id="usuario"
          type="text"
          value={u}
          onChange={ ( e ) => setNombre( e.target.value )}
          inputProps={{ required: true }}
        />
        <InputLabel
          htmlFor="loginPsw"
          style={{ color: 'black' }}>
          Contraseña
        </InputLabel>
        <Input className="input"
          id="loginPsw"
          type= {values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handlePasswordChange( 'password' )}
          inputProps={{ required: true }}
          endAdornment={
            <InputAdornment position="end"
            >
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                tabIndex="-1">

                {values.showPassword ? <Visibility /> : <VisibilityOff />}

              </IconButton>
            </InputAdornment>
          } />
        <nav className="remember mb-3">
          <input
            style={{ marginTop: '4px', marginRight: '5px' }}
            type="checkbox"
            value="lsRememberMe"
            id="rememberMe"/>
          <InputLabel style={{ color: 'black', marginTop: '3px', fontSize: '14px', fontFamily: 'Open sans' }}
            htmlFor="rememberMe"> Recordarme</InputLabel>
        </nav>
        <nav className="botones"
          style={{ marginTop: '5px' }}>
          <button style={{ marginRight: '10px' }}
            id="loginBtnPsw"
            type="submit"
            className="btn btn-primary btns"
            onClick={() => comprobarUser()}
          >Iniciar sesión</button>
          <button style={{ marginLeft: '10px' }}
            type="submit"
            className="btn btn-primary btns"
            onClick={() => navigate( '/signup/' ) }
          > Registrarse</button>
        </nav>
        <br/>


        <section className="recovery" >
          <Link to={'/recovery/'} > <u>¿Olvidaste tu contraseña?</u></Link>
        </section>

        <div id="error"
          className="alert alert-danger ocultar"
          role="alert">
          <span id="closebtn"
            className="closebtn"
            onClick={ cerrar} >&times;</span>
                Usuario o contraseña incorrectos.
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
                className="nav-link px-2 greytext"><span lang="es">Inicio</span></a></li>
              <li className="nav-item"><a href="#Contact"
                className="nav-link px-2 greytext"><span lang="es">Contacto</span></a></li>
              <li className="nav-item"><a href="#FAQs"
                className="nav-link px-2 greytext"><span lang="en">FAQs</span></a></li>
              <li className="nav-item"><a href="#About"
                className="nav-link px-2 greytext"><span lang="es">Acerca de</span></a></li>
            </ul>
          </footer>
        </div>
      </div>
    </div>
  );

};

export default Login;
