import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setUpMain } from '../../helper/SetUpMain';
import { Global } from '../../helper/Global';
import axios from 'axios';

export const Games = ({ games, setGames, buscado, setAllGames }) => {

  const baseUrl = Global.baseUrl;
  const URIGames = `${baseUrl}games/`;

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
                    <small className="text-muted">Valoración: {game.valoracion}</small>
                  </div>
                  <p className="mb-1 texte">{game.descripcion}</p>
                  <br/>
                  <small className="text-muted"> &nbsp;&nbsp; Género: {game.genero}</small>
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
  setAllGames: PropTypes.func.isRequired
};
