import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../signup/signup.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import  emailjs  from '@emailjs/browser';
import { init } from '../../../node_modules/@emailjs/browser/es/index';
init( 'WznRYXdNmfA-nSsG0' );

const URI = 'http://localhost:8000/users';

// const URI = 'https://swishgames-backend.herokuapp.com/recovery';

const Recovery = () => {

  const [m, setEmail] = useState( '' );
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect( () => {

    getUsers();

  }, []);

  const getUsers = async () => {

    const res = await axios.get( URI );
    setUsers( res.data );

  };

  async function comprobarUser() {

    users.forEach( ( user ) => {

      if ( user.email === m ) {

        emailjs.send( 'service_b05hnvr', 'template_e54pr46', { email: m, to_name: user.name, password: user.password }, 'WznRYXdNmfA-nSsG0' )
          .then( ( result ) => {

            console.log( result.text );

          }, ( error ) => {

            console.log( error.text );

          });
          alert( 'Correo enviado. No olvide revisar la carpeta "spam".' );
          setEmail('');
      }

    });      

  }

  return (
    <div className="signup">
      <h2>Retrieve password</h2>
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
          required="required" 
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
            onClick={() => navigate( '/login/login/' ) }
          > Back</button>

        </nav>

      </div>
    </div>
  );

};

export default Recovery;
