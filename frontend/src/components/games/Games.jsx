import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setUpMain } from '../../helper/SetUpMain';
import { Global } from '../../helper/Global';
import axios from 'axios';

export const Games = ({ games, setGames, favGames, setFavGames, buscado, setAllGames }) => {

  const baseUrl = Global.baseUrl;
  const URIGames = `${baseUrl}games/`;

  useEffect( () => {

    buscar();

  }, [buscado]);

  async function buscar() {

    if ( buscado === '' ) {

      setUpMain( setGames, setFavGames, setAllGames );

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

  return (
    <div>
      {games.length !== 0
        ? games.map( ( game, index ) => (
          <Link to={'/game/' + game.titulo}
            key = {index}>
            <div className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <img className="img-juego"
                  src={game.imagen}
                  width="200"
                  height="170"
                  alt={`#ImgGame${game.titulo}`} />
                <div className="px-2">
                  <div className="d-flex w-100 justify-content-between pt-1">
                    <h4 className="mb-1 ttexte"> &nbsp; {game.titulo}</h4>
                    <small className="text-muted overtexte">Valoración: {game.valoracion}</small>
                  </div>
                  <p className="mb-4 texte">{game.descripcion}</p>
                  <br/>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted subtexte"> &nbsp;&nbsp; Género: {game.genero}</small>

                    {contains( favGames, game.id )
                      ? <i className="fa-solid fa-heart fa-2xl"></i>
                      : <i className="fa-regular fa-heart fa-2xl"></i>}
                    {console.log( favGames )}
                    {console.log( game )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
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
  setFavGames: PropTypes.func.isRequired
};
