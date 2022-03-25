import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../signup/signup.css';

const URI = 'http://localhost:3000/recovery';

// const URI = 'https://swishgames-backend.herokuapp.com/recovery'

const Recovery = () => {

  const navigate = useNavigate();

  return (
    <div className="signup1">
      <h1>Reset password</h1>
      <form method="post">
        <input className="input"
          type="text"
          name="e"
          placeholder="Email"
          required="required" />

        <nav className="botones"
          style={{ marginTop: '5px' }}>
          <button style={{ marginRight: '10px' }}
            type="submit"
            className="btn1">Retrieve account</button>
          <button style={{ marginLeft: '10px' }}
            type="submit"
            className="btn1"
            onClick={() => navigate( '/login/login/' ) }
          > Back</button>

        </nav>

      </form>
    </div>
  );

};

export default Recovery;
