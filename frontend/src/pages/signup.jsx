import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import validator from 'validator';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import '../styles/signup.css';
import { Global } from '../helper/Global';
import { isAuthorized } from '../helper/isAuthorized.js';
import logo from '../static/SwishGamesLogo.png';
import Swal from 'sweetalert2';
import logoSinLetras from '../static/SwishGamesLogo_sin_letras.png';


const Signup = () => {

  const [u, setNombre] = useState( '' );
  const [m, setEmail] = useState( '' );
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}users`;
  const URIList = `${baseUrl}lists/`;
  const URIParticipantsGroups = `${baseUrl}participantsGroups`;
  const URIMensajes = `${baseUrl}chats/`;
  const isauthorized = isAuthorized();

  useEffect( () => {

    if ( isauthorized ) {

      Swal.fire( 'Ya has iniciado sesión' ).then( () => {

        navigate( '/' );

      });

    }
    getUsers();

  }, []);

  // procedimineto para obtener todos los usuarios
  const getUsers = async () => {

    const res = await axios.get( URI );
    setUsers( res.data );

  };

  function comprobarUser() {

    let esta = false;
    users.forEach( ( user ) => {

      if ( user.nombre === u ) {

        esta = true;

      }

    });
    return esta;

  }

  const [values, setValues] = React.useState({
    password: '',
    rpassword: '',
    showPassword: false,
    showrPassword: false
  });

  const handleClickShowPassword = () => {

    setValues({ ...values, showPassword: !values.showPassword });

  };

  const handleClickShowrPassword = () => {

    setValues({ ...values, showrPassword: !values.showrPassword });

  };

  const handleMouseDownPassword = ( event ) => {

    event.preventDefault();

  };

  const handleMouseDownrPassword = ( event ) => {

    event.preventDefault();

  };

  const handlePasswordChange = ( prop ) => ( event ) => {

    setValues({ ...values, [prop]: event.target.value });

  };

  function comprobarEmail() {

    let esta = false;
    users.forEach( ( user ) => {

      if ( user.email === m ) {

        esta = true;

      }

    });
    return esta;

  }


  const store = async ( e ) => {

    e.preventDefault();

    comprobarUser();
    if ( !validator.isEmail( m ) ) {

      document.getElementById( 'erroru' ).classList.remove( 'mostrar' );
      document.getElementById( 'errore' ).classList.remove( 'mostrar' );
      document.getElementById( 'error' ).classList.remove( 'mostrar' );
      document.getElementById( 'errorl' ).classList.remove( 'mostrar' );

      document.getElementById( 'errorm' ).classList.add( 'mostrar' );

    } else if ( values.password !== values.rpassword ) {

      document.getElementById( 'errorm' ).classList.remove( 'mostrar' );
      document.getElementById( 'erroru' ).classList.remove( 'mostrar' );
      document.getElementById( 'errore' ).classList.remove( 'mostrar' );

      document.getElementById( 'error' ).classList.add( 'mostrar' );

    } else if ( comprobarUser() ) {

      document.getElementById( 'errorm' ).classList.remove( 'mostrar' );
      document.getElementById( 'errore' ).classList.remove( 'mostrar' );
      document.getElementById( 'error' ).classList.remove( 'mostrar' );

      document.getElementById( 'erroru' ).classList.add( 'mostrar' );

    } else if ( comprobarEmail() ) {

      document.getElementById( 'errorm' ).classList.remove( 'mostrar' );
      document.getElementById( 'erroru' ).classList.remove( 'mostrar' );
      document.getElementById( 'error' ).classList.remove( 'mostrar' );

      document.getElementById( 'errore' ).classList.add( 'mostrar' );

    } else {

      await axios.post( URI, { nombre: u, email: m, password: values.password });
      await axios.post( URIParticipantsGroups, { nombre_usuario: u, id_grupo: 1 });
      axios.post( URIList, { nombre: 'Favoritos', nombre_usuario: u });
      axios.post( URIMensajes, { id_grupo_receptor: 1, mensaje: `${u} ha entrado en el grupo`, nombre_usuario_emisor: u });

      document.getElementById( 'errorm' ).classList.remove( 'mostrar' );
      document.getElementById( 'erroru' ).classList.remove( 'mostrar' );
      document.getElementById( 'errore' ).classList.remove( 'mostrar' );
      document.getElementById( 'error' ).classList.remove( 'mostrar' );

      Swal.fire(
        'Usuario creado con éxito',
        '',
        'success'
      );

    }

  };

  function volver() {

    document.getElementById( 'errorm' ).classList.remove( 'mostrar' );
    document.getElementById( 'erroru' ).classList.remove( 'mostrar' );
    document.getElementById( 'errore' ).classList.remove( 'mostrar' );
    document.getElementById( 'error' ).classList.remove( 'mostrar' );
    navigate( '/login/' );

  }

  function cerrar() {

    document.getElementById( 'error' ).classList.remove( 'mostrar' );

  }

  function cerrarm() {

    document.getElementById( 'errorm' ).classList.remove( 'mostrar' );

  }

  function cerraru() {

    document.getElementById( 'erroru' ).classList.remove( 'mostrar' );

  }
  function cerrare() {

    document.getElementById( 'errore' ).classList.remove( 'mostrar' );

  }

  return (
    <div className="signup">
      <h1>Registro</h1>
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
      <form onSubmit={store}>
        <InputLabel htmlFor="standard-adornment-password"
          for="usuario"
          style={{ color: 'black' }}>
          Usuario
        </InputLabel>
        <Input className="input"
          id="usuario"
          type="text"
          value={u}
          onChange={ ( e ) => setNombre( e.target.value )}
          inputProps={{ minLength: 6, size: 15, required: true }}/>
        <InputLabel htmlFor="standard-adornment-password"
          for="email"
          style={{ color: 'black' }}>
          Email
        </InputLabel>
        <Input className="input"
          id="email"
          type="text"
          value={m}
          onChange={ ( e ) => setEmail( e.target.value )}
          inputProps={{ size: 50, required: true }} />
        <InputLabel htmlFor="standard-adornment-password"
          for="password"
          style={{ color: 'black' }}
          className="mb-0">
          Contraseña
        </InputLabel>
        <p className="small text-muted mx-0 my-0">La contraseña debe tener mínimo 8 caracteres</p>
        <Input className="input"
          id="password"
          type={values.showPassword ? 'text' : 'password'}
          onChange={handlePasswordChange( 'password' )}
          value={values.password}
          inputProps={{ minLength: 8, size: 15, required: true }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <InputLabel htmlFor="standard-adornment-password"
          for="rpassword"
          style={{ color: 'black' }}>
        Confirmar contraseña
        </InputLabel>
        <Input className="input"
          id="rpassword"
          type={values.showrPassword ? 'text' : 'password'}
          onChange={handlePasswordChange( 'rpassword' )}
          value={values.rpassword}
          inputProps={{ required: true }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowrPassword}
                onMouseDown={handleMouseDownrPassword}
              >
                {values.showrPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />

        <nav className="botones"
          style={{ marginTop: '10px' }}>
          <button style={{ marginRight: '10px' }}
            type="submit"
            className="btn btn-primary btns">Registrarse</button>
          <button style={{ marginLeft: '10px' }}
            type="submit"
            className="btn btn-secondary btns"
            onClick={() => volver() }
          > Volver</button>

        </nav>

        <div className="container-fluid fixed-bottom tamañoFooter">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-1 my-1">
            <div className="col-md-4 d-flex align-items-center px-3">
              <span className="text-muted">© 2022 SwishGames, Inc</span>
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
              <li className="nav-item"><a href="#Home"
                className="nav-link px-2 text-muted">Home</a></li>
              <li className="nav-item"><a href="#Contact"
                className="nav-link px-2 text-muted">Contact</a></li>
              <li className="nav-item"><a href="#FAQs"
                className="nav-link px-2 text-muted">FAQs</a></li>
              <li className="nav-item"><a href="#About"
                className="nav-link px-2 text-muted">About</a></li>
            </ul>
          </footer>
        </div>

        <div id="error"
          className="alert alert-danger ocultar"
          role="alert">
          <span id="closebtn"
            className="closebtn"
            onClick={ cerrar} >&times;</span>
                Las Contraseñas no coinciden.
        </div>
        <div id="errorm"
          className="alert alert-danger ocultar"
          role="alert">
          <span id="closebtnm"
            className="closebtn"
            onClick={ cerrarm} >&times;</span>
                Formato de email incorrecto.
        </div>
        <div id="erroru"
          className="alert alert-danger ocultar"
          role="alert">
          <span id="closebtnu"
            className="closebtnu"
            onClick={ cerraru} >&times;</span>
                Usuario ya existente.
        </div>
        <div id="errore"
          className="alert alert-danger ocultar"
          role="alert">
          <span id="closebtne"
            className="closebtne"
            onClick={ cerrare} >&times;</span>
                Email ya existente.
        </div>
      </form>
    </div>
  );

};

export default Signup;
