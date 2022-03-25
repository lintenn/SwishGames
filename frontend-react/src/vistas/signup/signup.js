import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator'
;
import './signup.css';

const URI = 'http://localhost:8000/users';

// const URI = 'https://swishgames-backend.herokuapp.com/users'

const Signup = () => {

  const [u, setNombre] = useState( '' );
  const [m, setEmail] = useState( '' );
  const [p, setPassword] = useState( '' );
  const [rp, setRPassword] = useState( '' );
  const [users, setUsers] = useState( '' );
  const navigate = useNavigate();

  useEffect( () => {

    getUsers();

  }, []);

  // procedimineto para obtener todos los usuarios
  const getUsers = async () => {

    const res = await axios.get( URI );
    setUsers( res.data );

  };

  function comprobarUser() {

    let esta = false;
    users.map( ( user ) => {

      if ( user.nombre === u ) {

        esta = true;

      }

    });
    return esta;

  }

  function comprobarEmail() {

    let esta = false;
    users.map( ( user ) => {

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

      document.getElementById( 'errorm' ).classList.add( 'mostrar' );

    } else if ( p !== rp ) {

      document.getElementById( 'error' ).classList.add( 'mostrar' );

    } else if ( comprobarUser() ) {

      document.getElementById( 'erroru' ).classList.add( 'mostrar' );

    } else if ( comprobarEmail() ) {

      document.getElementById( 'errore' ).classList.add( 'mostrar' );

    } else {

      await axios.post( URI, { nombre: u, email: m, password: p });
      document.getElementById( 'success' ).classList.add( 'mostrar' );

    }

  };

  function volver() {

    document.getElementById( 'errorm' ).classList.remove( 'mostrar' );
    document.getElementById( 'erroru' ).classList.remove( 'mostrar' );
    document.getElementById( 'errore' ).classList.remove( 'mostrar' );
    document.getElementById( 'error' ).classList.remove( 'mostrar' );
    document.getElementById( 'success' ).classList.remove( 'mostrar' );
    navigate( '/' );

  }

  function cerrar() {

    document.getElementById( 'error' ).classList.remove( 'mostrar' );

  }

  function cerrars() {

    document.getElementById( 'success' ).classList.remove( 'mostrar' );

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
    <div className="signup1">
      <h1>Sign Up</h1>
      <form onSubmit={store}>
        <input className="input"
          type="text"
          value={u}
          onChange={ ( e ) => setNombre( e.target.value )}
          placeholder="Username"
          minLength="6"
          size="15"
          required="required" />
        <input className="input"
          type="text"
          value={m}
          onChange={ ( e ) => setEmail( e.target.value )}
          placeholder="Email"
          size="50"
          required="required" />
        <input className="input"
          type="password"
          value={p}
          onChange={ ( e ) => setPassword( e.target.value )}
          placeholder="Password"
          minLength="6"
          size="15"
          required="required" />
        <input className="input"
          type="password"
          value={rp}
          onChange={ ( e ) => setRPassword( e.target.value )}
          placeholder="Repeat password"
          minLength="6"
          size="15"
          required="required" />

        <nav className="botones"
          style={{ marginTop: '5px' }}>
          <button style={{ marginRight: '10px' }}
            type="submit"
            className="btn1">Sign Up</button>
          <button style={{ marginLeft: '10px' }}
            type="submit"
            className="btn1"
            onClick={() => volver() }
          > Back</button>

        </nav>
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
          <span id="closebtnm"
            className="closebtn"
            onClick={ cerraru} >&times;</span>
                Usuario ya existente.
        </div>
        <div id="errore"
          className="alert alert-danger ocultar"
          role="alert">
          <span id="closebtnm"
            className="closebtn"
            onClick={ cerrare} >&times;</span>
                Email ya existente.
        </div>
        <div id="success"
          className="alert alert-success ocultar"
          role="alert">
          <span id="closebtns"
            className="closebtn"
            onClick={ cerrars} >&times;</span>
                Usuario creado con éxito.
        </div>

      </form>
    </div>
  );

};

export default Signup;
