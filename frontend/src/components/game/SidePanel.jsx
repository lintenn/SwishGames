import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../../helper/isAuthorized.js';
import { Global } from '../../helper/Global.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/game.css';
import Swal from 'sweetalert2';
import Link from '../../../node_modules/react-scroll/modules/components/Link.js';


export const SidePanel = ({game}) => {

    const baseUrl = Global.baseUrl;
    const URIaverage = `${baseUrl}rating/media/`
    const URIrate = `${baseUrl}rating/`;
    const URIlogin = `http://localhost:3000/login`
    const isauthorized = isAuthorized();
    const [rate, setRate] = useState([]);
    const [averageRate, setAverageRate] = useState([]);

    useEffect( () => {

        if(game.length != 0){
    
          getRating()
    
        }
    
    }, [game]);
    
    useEffect( () => {
    
        if(rate.length != 0){
    
          getAverageRating()
    
        }
        
    }, [rate]);

    const getAverageRating = async() => {

        try{
    
          const res = await axios.get( URIaverage + game.id );
          const averageRate = res.data[0].media
          
          if(averageRate != null){
    
            setAverageRate( parseFloat(averageRate).toFixed(1) )
    
          }else{
    
            setAverageRate(0)
    
          }
    
        }catch (error){
    
          setAverageRate(0)
    
        }
    
    }

    const getRating = async () => {

        const token = localStorage.getItem( 'user' );
        const us = JSON.parse( token );
    
        try{
    
          const res = await axios.get( URIrate + 'usuario/' + us.id + '/' + game.id );
          setRate( res.data[0].valoracion );
    
        }catch (error){
    
          setRate(0)
    
        }
    
    };

    const rateGame = (selectedRate) => {

        Swal.fire({
    
          title: '¿Desea valorar ' + game.titulo + ' con ' + selectedRate + ( selectedRate == 1 ? ' estrella' : ' estrellas' ) + '?',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
    
        }).then( ( result ) => {
    
          if ( result.value ) { 
    
            const token = localStorage.getItem( 'user' );
            const us = JSON.parse( token );
    
            if(rate == 0){
    
              axios.post(URIrate, {
                id_usuario:us.id,
                id_juego:game.id,
                valoracion:selectedRate
              })
    
            }else{
    
              axios.put(URIrate + '/' + game.id + '/' + us.id, {
                valoracion:selectedRate
              })
    
            }
    
            setRate(selectedRate)
    
          }
    
        });
    
    };


    return (

    <div className='col-md-12 col-lg-6 col-xl-5 col-xxl-4 px-0'>    
        <section className="d-none d-lg-block col-lg-12 mt-2 border card">

            <table id="gameinfo">

                <tr>
                    <td>
                    <div id="content"
                        className="col-12 mt-4 d-flex justify-content-center">
                        <img className="img-juego"
                        src={game.imagen}
                        width="75%"
                        height="100%"
                        alt={`Imagen representativa del juego ${game.titulo}`} />
                    </div>
                    </td>
                </tr>

                <tr>
                    <td id="tdcontent">
                    <div id="content"
                        className="col-12 my-2 d-flex justify-content-center">
                        <p className="text-center text-break fs-6 h6 lh-base">{game.descripcion}</p>
                    </div>
                    </td>
                </tr>

                <tr>
                    <td id="tdcontent">
                    <div id="content"
                        className="col-12 mb-3 d-flex justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        fill="red"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        <p className="text-center text-break fs-2 fw-bold">{averageRate}</p>
                    </div>
                    </td>
                </tr>

            </table>

        </section>

        {isauthorized ?
        <section className="col-12 border card">

            <div className="d-flex justify-content-center mt-3">
                <h5 className="fw-bold">Mi valoracion</h5>
            </div>

            <div className="d-flex justify-content-center mb-3">
                <fieldset className=" " id="rate">

                    <input type="radio"
                        id="star5"
                        name="rate"
                        value="5"
                        onChange={e => rateGame(e.target.value)}
                        checked={rate == 5}/>
                    <label htmlFor="star5"
                        id="start"
                        title="5 estrellas">5 estrellas</label>
                    <input type="radio"
                        id="star4"
                        name="rate"
                        value="4"
                        onChange={e => rateGame( e.target.value )}
                        checked={rate == 4}/>
                    <label htmlFor="star4"
                        id="start"
                        title="4 estrellas">4 estrellas</label>
                    <input type="radio"
                        id="star3"
                        name="rate"
                        value="3"
                        onChange={e => rateGame( e.target.value )}
                        checked={rate == 3}/>
                    <label htmlFor="star3"
                        id="start"
                        title="3 estrellas">3 estrellas</label>
                    <input type="radio"
                        id="star2"
                        name="rate"
                        value="2"
                        onChange={e => rateGame( e.target.value )}
                        checked={rate == 2}/>
                    <label htmlFor="star2"
                        id="start"
                        title="2 estrellas">2 estrellas</label>
                    <input type="radio"
                        id="star1"
                        name="rate"
                        value="1"
                        onChange={e => rateGame( e.target.value )}
                        checked={rate == 1}/>
                    <label htmlFor="star1"
                        id="start"
                        title="1 estrella">1 estrella</label>

                </fieldset>
            </div>

        </section>  
        :
        <section className="col-12 border card">
            <div className="d-flex justify-content-center my-4">
            <h5 className="fw-bold"><a href='/login'>Regístrate para valorar el juego</a></h5>
            </div>
        </section>
        }
    </div>

    )

}
