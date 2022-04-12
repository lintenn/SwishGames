import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import '../styles/login.css';
import { Global } from '../helper/Global';
import { isAuthorized } from '../helper/isAuthorized.js';
import Swal from 'sweetalert2';

const Login = () => {

  const [u, setNombre] = useState( '' );
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}users`;
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
      <div>
        <InputLabel htmlFor="standard-adornment-password"
          style={{ color: 'black' }}>
          Usuario
        </InputLabel>
        <Input className="input"
          type="text"
          value={u}
          onChange={ ( e ) => setNombre( e.target.value )}
          required={true} />
        <InputLabel htmlFor="standard-adornment-password"
          style={{ color: 'black' }}>
          Contraseña
        </InputLabel>
        <Input className="input"
          type= {values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handlePasswordChange( 'password' )}
          required={true}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          } />
        <nav className="remember">
          <input className="input"
            style={{ marginTop: '4px', marginRight: '5px' }}
            type="checkbox"
            value="lsRememberMe"
            id="remember_me"/>
          <label style={{ marginBottom: '10px' }}
            forhtml="rememberMe"> Recordarme</label>
        </nav>
        <nav className="botones"
          style={{ marginTop: '5px' }}>
          <button style={{ marginRight: '10px' }}
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
      </div>
    </div>
  );

};

export default Login;