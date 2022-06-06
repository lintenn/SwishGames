import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setUpMain } from '../../helper/SetUpMain.js';
import { setUpFavorites } from '../../helper/SetUpFavorites.js';
import { Global } from '../../helper/Global.js';
import axios from 'axios';
import { isAuthorized } from '../../helper/isAuthorized.js';


export const Games = ({ games, setGames, favGames, setFavGames, buscado, setAllGames, favList }) => {

  const baseUrl = Global.baseUrl;
  const URIGames = `${baseUrl}games/`;
  const isauthorized = isAuthorized();

  // const navigate = useNavigate();

  useEffect( () => {

    buscar();

  }, [buscado]);

  async function buscar() {

    if ( buscado === '' ) {

      setUpMain( setGames, setAllGames );

    } else {

      axios.get( `${URIGames}buscar/${buscado}` )
        .then( res => {

          setGames( res.data );

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

  const addToFavoritos = async ( gameId ) => {

    const token = localStorage.getItem( 'user' );
    const us = JSON.parse( token );

    await axios.post( `${baseUrl}contentsLists/`, { id_lista: favList[0].id, id_juego: gameId })
      .then( res => {

        setUpFavorites( us.nombre, setFavGames );

        setUpMain( setGames, setAllGames );

      }).catch( err => console.log( err ) );

  };

  const removeFromFavoritos = async ( gameId ) => {

    console.log( gameId );
    console.log( favList );

    const token = localStorage.getItem( 'user' );
    const us = JSON.parse( token );

    await axios.delete( `${baseUrl}contentsLists/${favList[0].id}/${gameId}` )
      .then( res => {

        setUpFavorites( us.nombre, setFavGames );

        setUpMain( setGames, setAllGames );

      }).catch( err => console.log( err ) );

  };

  return (

    <div>
      {games.length !== 0
        ? games.map( ( game, index ) => (
          <div
            key = {index}
            className="botonGameTransparente">
            <div className="list-group-item list-group-item-action mb-1">
              <div className="d-flex w-100 justify-content-between">
                <Link to={'/game/' + game.titulo}>
                  <img className="img-juego"
                    src={game.imagen}
                    width="200"
                    height="170"
                    alt={`Carátula del juego ${game.titulo}`} />
                </Link>
                <div className="px-2">
                  <Link to={'/game/' + game.titulo}
                    className="text-dark">
                    <div className="d-flex w-100 justify-content-between pt-1">
                      <h4 className="mb-1 ttexte"> &nbsp; {game.titulo}</h4>
                      <small className="text-muted overtexte">Valoración: {game.valoracion}</small>
                    </div>
                    <p className="mb-4 texte">{game.descripcion}</p>
                    <br/>
                  </Link>
                  <div className="d-flex w-100 justify-content-between">
                    <Link to={'/game/' + game.titulo}>
                      <small className="text-muted subtexte"> &nbsp;&nbsp; Género: {game.genero}</small>
                    </Link>

                    {isauthorized
                      ? contains( favGames, game.id )
                        ? <button className="botonTransparente"
                          onClick={() => removeFromFavoritos( game.id )}>
                          <i className="fa-solid fa-heart fa-2xl"></i>
                        </button>
                        : <button className="botonTransparente"
                          onClick={() => addToFavoritos( game.id )}>
                          <i className="fa-regular fa-heart fa-2xl"></i>
                        </button>
                      : <div></div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) )
        : <div className="mt-5 text-dark"><h1><b>Lo sentimos, pero no hemos encontrado el juego deseado :(</b></h1></div>}
    </div> );

};

Games.propTypes = {
  games: PropTypes.array.isRequired,
  setGames: PropTypes.func.isRequired,
  buscado: PropTypes.string.isRequired,
  setAllGames: PropTypes.func.isRequired,
  favGames: PropTypes.array.isRequired,
  setFavGames: PropTypes.func.isRequired,
  favList: PropTypes.array.isRequired
};
