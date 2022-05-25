import React, { useEffect } from 'react';
import { isAuthorized } from '../helper/isAuthorized.js';
import { useNavigate } from '../../node_modules/react-router/index';

export const NoLogin = () => {

  const isauthorized = isAuthorized();
  const navigate = useNavigate();

  useEffect( () => {

    if ( isauthorized ) {

      navigate( '/' );

    }

  }, []);

  return (
    <div className="centrar-vertical-padre">
      <div>
        <h1>No has iniciado sesión</h1>
        <div className=" centrar-vertical-hijo">
          <button className="btn btn-primary"
            onClick={
              () => {

                navigate( '/login' );

              }
            }>Inicia sesión</button>
        </div>
      </div>
    </div>
  );

};
