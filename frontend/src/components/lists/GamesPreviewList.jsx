import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setUpList } from '../../helper/SetUpList';
import { Global } from '../../helper/Global';
import axios from 'axios';
import { isAuthorized } from '../../helper/isAuthorized.js';

export const GamesPreviewList = ({ id, list, setList, games, setGames, buscado }) => {
    
    const baseUrl = Global.baseUrl;
    const URI = `${baseUrl}contentsLists/`;
    const isauthorized = isAuthorized();

    useEffect( () => {
            
            buscar();
    
    }, [buscado]);

    const comprobarDuenyo = () => {
        let duenyo = false;
        if ( isauthorized ) {
            const token = localStorage.getItem( 'user' );
            const us = JSON.parse( token );
            duenyo = us.id === list[0].id_usuario;
        }
        return duenyo;
    }

    const buscar = async () => {

        if ( buscado === '' ) {

           setUpList( id, setList, setGames);

        } else {

          axios.get( `${URI}${id}/buscar/${buscado}` )
            .then( res => {
          
             setGames( res.data );
          
            }).catch( err => console.log(err) )

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
                    <small className="text-muted overtexte">Valoración: {game.valoracion}</small>
                  </div>
                  <p className="mb-4 texte">{game.descripcion}</p>
                  <br/>
                  <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted subtexte"> &nbsp;&nbsp; Género: {game.genero}</small>
                    
                    {comprobarDuenyo() ? 
                      <span style={ { color: '#ff0000' } } >
                        <i className="fa-solid fa-xmark fa-2xl"></i>
                      </span>
                      : <div></div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </Link>
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