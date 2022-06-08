import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { setUpUsers } from '../../helper/SetUpUsers';
import { Global } from '../../helper/Global';
import axios from 'axios';


export const UserCards = ({ users, setUsers, buscado, userAct }) => {

  const baseUrl = Global.baseUrl;
  const URIUsers = `${baseUrl}users/`;
  const navigate = useNavigate();

  useEffect( () => {

    buscar();

  }, [buscado]);

  async function buscar() {

    if ( buscado === '' ) {

      setUpUsers( setUsers );

    } else {

      axios.get( `${URIUsers}user/${buscado}` )
        .then( res => {

          setUsers( res.data );

        });

    }

  };

  return (
    <div className="row">
      {users.length !== 0
        ? users.filter( user => ( user.nombre !== userAct.nombre ) ).map( ( user, index ) => (
          <button
            key = {index}
            id = {'UserCard' + user.nombre}
            onClick={() => navigate( `/user/${user.nombre}` )}
            className="botonGameTransparente col-12">
            <div className="list-group-item list-group-item-action">
              <div className="d-flex w-100">
                <img className="img-user"
                  src={user.imagen}
                  alt={`#UserImg${user.nombre}`} />
                <div className="px-2 tamanyoMaxDesc">
                  <div className="d-flex w-100 pt-1">
                    <h4 className="mb-0 ttexte"> &nbsp; {user.nombre}</h4>
                  </div>
                  <p className="texte">{user.descripcion}</p>
                </div>
              </div>
            </div>
          </button>
        ) )
        : <div className="mt-5 text-dark"><h1><b>Lo sentimos, pero no hemos encontrado el usuario deseado :(</b></h1></div>}
    </div> );

};

UserCards.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
  buscado: PropTypes.string.isRequired,
  userAct: PropTypes.object.isRequired
};
