import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../signup/signup.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { init, emailjs } from '@emailjs/browser';
init( 'WznRYXdNmfA-nSsG0' );

const URI = 'http://localhost:8000/users';

// const URI = 'https://swishgames-backend.herokuapp.com/recovery';

const Recovery = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [m, setEmail] = useState( '' );

  useEffect( () => {

    getUsers();

  }, []);

  const getUsers = async () => {

    const res = await axios.get( URI );
    setUsers( res.data );

  };

  function comprobarUser() {

    users.forEach( ( user ) => {

      if ( user.email === m ) {

        emailjs.sendForm( 'service_b05hnvr', 'template_e54pr46', { email: m, to_name: user.name, password: user.password }, 'WznRYXdNmfA-nSsG0' )
          .then( ( result ) => {

            console.log( result.text );

          }, ( error ) => {

            console.log( error.text );

          });

      }

    });

  }

  /* function sendEmail( e ) {

    e.preventDefault();
    emailjs.sendForm( 'service_b05hnvr', 'template_e54pr46', templateParams, 'WznRYXdNmfA-nSsG0' )
      .then( ( result ) => {

        console.log( result.text );

      }, ( error ) => {

        console.log( error.text );

      });
    e.target.reset();
    alert( 'Mensaje enviado' );

  } */

  return (
    <div className="signup">
      <h2>Retrieve password</h2>
      <form method="post">
        <InputLabel htmlFor="standard-adornment-password"
          style={{ color: 'black' }}
          value={m}
          onChange={ ( e ) => setEmail( e.target.value )}>
          Email
        </InputLabel>
        <Input className="input"
          type="text"
          name="e"
          required="required" />

        <nav className="botones"
          style={{ marginTop: '5px' }}>
          <button style={{ marginRight: '10px' }}
            type="submit"
            className="btn btn-primary btns"
            onClick={() => comprobarUser()}
          >
              Send email</button>
          <button style={{ marginLeft: '10px' }}
            type="submit"
            className="btn btn-primary btns"
            onClick={() => navigate( '/login/login/' ) }
          > Back</button>

        </nav>

      </form>
    </div>
  );

};

export default Recovery;
