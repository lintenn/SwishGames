import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { setUpUsers } from '../../helper/SetUpUsers';
import { Global } from '../../helper/Global';
import axios from 'axios';


export const UserCards = ({ users, setUsers, buscado }) => {

  const baseUrl = Global.baseUrl;
  const URIUsers = `${baseUrl}users`;
  const navigate = useNavigate();

  useEffect( () => {

    buscar();

  }, [buscado]);

  async function buscar() {

    if ( buscado === '' ) {

      setUpUsers( setUsers );

    } else {

      axios.get( `${URIUsers}name/${buscado}` )
        .then( res => {

          setUsers( res.data );

        });

    }

  };

  const contains = ( array, value ) => {

    let result = false;

    array.forEach( element => {

      if ( element.id === value ) {

        result = true;

      }

    });

    return result;

  };

  return (
    <div>
      {users.length !== 0
        ? users.map( ( user, index ) => (
          <button
            key = {index}
            onClick={() => navigate( `user/${user.nombre}` )}
            className="botonGameTransparente">
            <div className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <img className="img-juego"
                  src={user.imagen}
                  width="200"
                  height="170"
                  alt={`#ImgGame${user.titulo}`} />
                <div className="px-2">
                  <p className="mb-4 texte">{user.descripcion}</p>
                  <br/>
                </div>
              </div>
            </div>
          </button>
        ) )
        : <div className="mt-5 text-dark"><h1><b>Lo sentimos, pero no hemos encontrado el juego deseado :(</b></h1></div>}
    </div> );

};

UserCards.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
  buscado: PropTypes.string.isRequired
};
