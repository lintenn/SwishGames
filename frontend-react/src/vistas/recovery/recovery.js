import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../signup/signup.css';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { init } from '@emailjs/browser';
import emailjs from 'emailjs-com';
init( 'WznRYXdNmfA-nSsG0' );


// const URI = 'https://swishgames-backend.herokuapp.com/recovery';

const Recovery = () => {

  const navigate = useNavigate();

  function sendEmail( e ) {

    e.preventDefault();
    emailjs.sendForm( 'ID SERVICIO', 'ID TEMPLATE', e.target, 'ID USUARIO' )
      .then( ( result ) => {

        console.log( result.text );

      }, ( error ) => {

        console.log( error.text );

      });
    e.target.reset();
    alert( 'Mensaje enviado' );

  }

  return (
    <div className="signup">
      <h2>Retrieve password</h2>
      <form method="post">
        <InputLabel htmlFor="standard-adornment-password"
          style={{ color: 'black' }}>
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
            className="btn btn-primary btns">Send email</button>
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
