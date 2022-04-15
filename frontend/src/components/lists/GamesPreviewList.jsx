import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setUpList } from '../../helper/SetUpList';
import { Global } from '../../helper/Global';
import axios from 'axios';

export const GamesPreviewList = ({ id, idUserAuth, list, setList, games, setGames, buscado }) => {
    
    const baseUrl = Global.baseUrl;
    const URI = `${baseUrl}contentsLists/`;

    useEffect( () => {
            
            buscar();
    
    }, [buscado]);

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
                    
                    {idUserAuth === list[0].id_usuario ? 
                      <span style={ { color: '#ff0000' } } >
                        <i class="fa-solid fa-xmark fa-2xl"></i>
                      </span>
                      : <div></div>
                    }
                    {console.log("id_usuario: " + list[0].id_usuario)}
                    {console.log("idUserAuth: " + idUserAuth)}
                    {console.log(idUserAuth === list[0].id_usuario)}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ) )
        : <div className="mt-5 text-dark"><h1><b>Lo sentimos, pero no hemos encontrado el juego deseado :(</b></h1></div>}
    </div> );

};

GamesPreviewList.propTypes = {
    id: PropTypes.string.isRequired,
    idUserAuth: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    setList: PropTypes.func.isRequired,
    games: PropTypes.array.isRequired,
    setGames: PropTypes.func.isRequired,
    buscado: PropTypes.string.isRequired
};