import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../../helper/isAuthorized.js';
import { Global } from '../../helper/Global.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/game.css';
import Swal from 'sweetalert2';

export const SidePanel = ({game}) => {

    const baseUrl = Global.baseUrl;
    const URIaverage = `${baseUrl}rating/media/`
    const URIrate = `${baseUrl}rating/`;
    const isauthorized = isAuthorized();
    const [rate, setRate] = useState([]);
    const [averageRate, setAverageRate] = useState([]);

    useEffect( () => {

        if(game.length !== 0){
    
          getRating()
    
        }
    
    }, [game]);
    
    useEffect( () => {
    
        if(rate.length !== 0){
    
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
        const user = JSON.parse( token );
    
        try{
    
          const res = await axios.get( URIrate + 'usuario/' + user.id + '/' + game.id );
          setRate( res.data[0].valoracion );
    
        }catch (error){
    
          setRate(0)
    
        }
    
    };

    const rateGame = (selectedRate) => {

        if(selectedRate === rate){
            
            console.log("aaaaaaaaaa")
            Swal.fire({
                title: 'Ya has valorado ' + game.titulo + ' con ' + selectedRate + ( selectedRate === 1 ? ' estrella' : ' estrellas' ),
                confirmButtonText: 'OK'
            })

        }else {

            Swal.fire({
    
                title: '¿Desea valorar ' + game.titulo + ' con ' + selectedRate + ( selectedRate === 1 ? ' estrella' : ' estrellas' ) + '?',
                text: 'Tras valorar podrá editar pero no eliminar la valoración',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
          
              }).then( ( result ) => {
          
                if ( result.value ) { 
          
                  const token = localStorage.getItem( 'user' );
                  const us = JSON.parse( token );
          
                  if(rate === 0){
          
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
        }

    };


    return (

    <div className='col-md-12 col-lg-4 px-0'>
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
                        className="col-12 mb-2 d-flex justify-content-center">
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

        <section className="col-12 d-lg-none ms-0 mt-2 border card">
            <div className="col-12 my-3 d-flex justify-content-center">
              <img className="img-juego col-4"
                src={game.imagen}
                width="75%"
                height="100%"
                alt={`#ImgGame${game.titulo}`} />

              <table className="col-5 ms-3">
                <tr>
                  <td id="tdcontent">
                    <div id="content"
                      className="d-flex justify-content-center">
                      <p className="text-center text-break fs-6 h6 lh-base">{game.descripcion}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td id="tdcontent">
                    <div id="content"
                      className="mb-2 d-flex justify-content-center">
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

            </div>
        </section>

        {isauthorized ?
        <section className="col-12 border card">

            <div className="d-flex justify-content-center mt-1">
                <p className="d-none d-lg-block fs-5 fw-bold">{(rate === 0) ? "Realiza tu valoracion" : "Mi valoracion"}</p>
            </div>

            <div className="d-flex justify-content-center mb-2">

                <p className="d-lg-none fs-5 fw-bold mt-1">{(rate === 0) ? "Realiza tu valoracion" : "Mi valoracion"}</p>

                <fieldset className=" " id="rate">

                    <input type="radio"
                        id="star5"
                        name="rate"
                        value="5"
                        onClick={e => rateGame( parseInt(e.target.value) )}
                        checked={rate === 5}/>
                    <label htmlFor="star5"
                        id="start"
                        title="5 estrellas">5 estrellas</label>
                    <input type="radio"
                        id="star4"
                        name="rate"
                        value="4"
                        onClick={e => rateGame( parseInt(e.target.value) )}
                        checked={rate === 4}/>
                    <label htmlFor="star4"
                        id="start"
                        title="4 estrellas">4 estrellas</label>
                    <input type="radio"
                        id="star3"
                        name="rate"
                        value="3"
                        onClick={e => rateGame( parseInt(e.target.value) )}
                        checked={rate === 3}/>
                    <label htmlFor="star3"
                        id="start"
                        title="3 estrellas">3 estrellas</label>
                    <input type="radio"
                        id="star2"
                        name="rate"
                        value="2"
                        onClick={e => rateGame( parseInt(e.target.value) )}
                        checked={rate === 2}/>
                    <label htmlFor="star2"
                        id="start"
                        title="2 estrellas">2 estrellas</label>
                    <input type="radio"
                        id="star1"
                        name="rate"
                        value="1"
                        onClick={e => rateGame( parseInt(e.target.value) )}
                        checked={rate === 1}/>
                    <label htmlFor="star1"
                        id="start"
                        title="1 estrella">1 estrella</label>

                </fieldset>
            </div>

        </section>
        :
        <section className="col-12 border card">
            <div className="d-flex justify-content-center my-4">
                <p className="fs-5 fw-bold"><a href='/login'>Regístrate para valorar el juego</a></p>
            </div>
        </section>
        }
    </div>

    )

}
