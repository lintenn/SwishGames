import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
;
import './login.css';

const URI = 'http://localhost:8000/users';

// const URI = 'https://swishgames-backend.herokuapp.com/users';

const Login = () => {

  const [u, setNombre] = useState( '' );
  const [p, setPassword] = useState( '' );
  const [users, setUsers] = useState([]);
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

    users.forEach( ( user ) => {

      if ( user.nombre === u && user.password === p ) {

        localStorage.setItem( 'user', JSON.stringify({ id: user.id, nombre: user.nombre, email: user.email, password: user.password }) );
        navigate( '/' );

      }

    });

  }

  return (
    <div className="login1"
      id="login" >
      <h1>Log In</h1>
      <form method="post">
        <input className="input"
          type="text"
          value={u}
          onChange={ ( e ) => setNombre( e.target.value )}
          placeholder="Username"
          required="required" />
        <input className="input1"
          type="password"
          value={p}
          onChange={ ( e ) => setPassword( e.target.value )}
          placeholder="Password"
          required="required" />
        <nav className="remember">
          <input className="input"
            style={{ marginRight: '5px' }}
            type="checkbox"
            value="lsRememberMe"
            id="remember_me"></input>
          <label style={{ marginBottom: '10px' }}
            forhtml="rememberMe">Remember me</label>
        </nav>
        <nav className="botones"
          style={{ marginTop: '5px' }}>
          <button style={{ marginRight: '10px' }}
            type="submit"
            className="btn1"
            onClick={() => comprobarUser()}
          >Log In</button>
          <button style={{ marginLeft: '10px' }}
            type="submit"
            className="btn1"
            onClick={() => navigate( '/signup/signup/' ) }
          > Register</button>
        </nav>
        <br/>


        <section className="recovery1" >
          <Link to={'/recovery/recovery/'} > <u>Forgot your password?</u></Link>
        </section>

      </form>
    </div>
  );

};

export default Login;
