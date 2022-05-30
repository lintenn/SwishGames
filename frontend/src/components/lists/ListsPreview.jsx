import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Global } from '../../helper/Global';
import axios from 'axios';
import { setUpLists } from '../../helper/SetUpLists';

export const ListsPreview = ({ lists, setLists, buscado, setAllLists }) => {

  const [user, setUser] = useState( null );

  const baseUrl = Global.baseUrl;
  let URILists = '';

  useEffect( () => setUser( JSON.parse( localStorage.getItem( 'user' ) ) ), []);

  useEffect( () => {

    if ( !user ) return;

    URILists = `${baseUrl}lists/user/${user.nombre}/`;

    buscar();

  }, [buscado]);

  async function buscar() {

    if ( buscado === '' ) {

      setUpLists( user.nombre, setLists, setAllLists );

    } else {

      axios.get( `${URILists}buscar/${buscado}` )
        .then( res => {

          setLists( res.data );

        });

    }

  };

  return (
    <div>
      {lists.length !== 0
        ? lists.map( ( list, index ) => (
          <Link to={'/list/' + list.id}
            key = {index}>
            <div className="list-group-item list-group-item-action">
              <div className="d-flex w-100">

                {list.nombre === 'Favoritos'
                  ? <i className="fa-solid fa-heart fa-2xl mt-3"></i>
                  : <i className="fa-solid fa-list fa-2xl mt-3"></i>}

                <div className="d-flex w-100 justify-content-center">

                  {list.nombre === 'Favoritos'
                    ? <h4 className="mb-1 ttexte"> &nbsp; &nbsp; &nbsp; &nbsp; {list.nombre}</h4>
                    : <h4 className="mb-1 ttexte"> &nbsp; {list.nombre}</h4>}

                </div>

                {list.nombre === 'Favoritos'
                  ? <i className="fa-solid fa-heart fa-2xl mt-3"></i>
                  : <div></div>}
              </div>
            </div>
          </Link>
        ) )
        : <div className="mt-5 text-dark"><h1><b>Lo sentimos, pero no hemos encontrado esa lista :(</b></h1></div>}
    </div> );

};

ListsPreview.propTypes = {
  lists: PropTypes.array.isRequired,
  setLists: PropTypes.func.isRequired,
  buscado: PropTypes.string.isRequired,
  setAllLists: PropTypes.func.isRequired
};
