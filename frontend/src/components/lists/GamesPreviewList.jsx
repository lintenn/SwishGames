import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setUpList } from '../../helper/SetUpList';
import { Global } from '../../helper/Global';
import axios from 'axios';
import { isAuthorized } from '../../helper/isAuthorized.js';
import { useNavigate } from '../../../node_modules/react-router/index';

export const GamesPreviewList = ({ id, list, setList, games, setGames, buscado }) => {

  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}contentsLists/`;
  const isauthorized = isAuthorized();
  const navigate = useNavigate();

  useEffect( () => {

    buscar();

  }, [buscado]);

  const comprobarDuenyo = () => {

    let duenyo = false;
    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      duenyo = us.nombre === list[0].nombre_usuario;

    }
    return duenyo;

  };

  const buscar = async () => {

    if ( buscado === '' ) {

      setUpList( id, setList, setGames );

    } else {

      axios.get( `${URI}${id}/buscar/${buscado}` )
        .then( res => {

          setGames( res.data );

        }).catch( err => console.log( err ) );

    }

  };

  const quitarDeLista = ( gameId ) => {

    axios.delete( `${URI}${id}/${gameId}` );

    // Ineficiente sí, pero juntando todo esto recarga la lista
    setUpList( id, setList, setGames );
    buscado = 'd';
    buscado = '';
    navigate( '/lists/' );
    navigate( `/list/${id}` );

  };

  return (
    <div>
      {games.length !== 0
        ? games.map( ( game, index ) => (
          <div
            key = {index}
            className="mb-1 botonGameTransparente">
            <div className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <Link to={'/game/' + game.titulo}>
                  <img className="img-juego"
                    src={game.imagen}
                    width="200"
                    height="170"
                    alt={`#ImgGame${game.titulo}`} />
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

                    {comprobarDuenyo()
                      ? <span style={ { color: '#ff0000' } } >

                        {/* botón transparente */}

                        <button className="botonTransparente equis"
                          onClick={() => quitarDeLista( game.id )}>
                          <i className="fa-solid fa-xmark fa-2xl"></i> Quitar
                        </button>
                      </span>
                      : <div></div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) )
        : <h2 className="mt-5 text-dark text-center"> Sin juegos que mostrar :( </h2> }
    </div> );

};

GamesPreviewList.propTypes = {
  id: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  setList: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  setGames: PropTypes.func.isRequired,
  buscado: PropTypes.string.isRequired
};
