import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import emailjs, { init } from '@emailjs/browser';
import { Global } from '../helper/Global';
import { isAuthorized } from '../helper/isAuthorized.js';
import Swal from 'sweetalert2';

init( 'WznRYXdNmfA-nSsG0' );

const Recovery = () => {

  const [m, setEmail] = useState( '' );
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
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

  const getUsers = async () => {

    const res = await axios.get( URI );
    setUsers( res.data );

  };

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
      <h2>Recuperar contraseña</h2>
      <div>
        <InputLabel htmlFor="standard-adornment-password"
          style={{ color: 'black' }}
          value="">
          Email
        </InputLabel>
        <Input className="input"
          type="text"
          value={m}
          name="e"
          required={true}
          onChange={ ( e ) => setEmail( e.target.value )}/>

        <nav className="botones"
          style={{ marginTop: '5px' }}>
          <button style={{ marginRight: '10px' }}
            type="submit"
            className="btn btn-primary btns"
            onClick={() => comprobarUser() }>
              Send email</button>
          <button style={{ marginLeft: '10px' }}
            type="submit"
            className="btn btn-primary btns"
            onClick={() => navigate( '/login/' ) }
          > Back</button>

        </nav>

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

      </div>
    </div>
  );

};

export default Recovery;
