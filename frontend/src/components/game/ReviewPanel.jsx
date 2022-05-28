import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../../helper/isAuthorized.js';
import { Global } from '../../helper/Global.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/game.css';
import Swal from 'sweetalert2';
import { Review } from '../game/Review.jsx';

export const ReviewPanel = ({game}) => {

    const baseUrl = Global.baseUrl;
    const URIreview = `${baseUrl}review/`;
    const isauthorized = isAuthorized();
    const [shown, setShown] = useState(false);
    const [count, setCount] = useState(0);
    const [reviews, setReviews] = useState([]);

    useEffect( () => {

        if(game.length !== 0){

            getReviews()

        }
    }, [game]);

    const getReviews = async () => {

        try{
    
            axios.get( URIreview + '/game/' + game.id )
            .then( res => {
                setReviews(res.data)
                console.log(res.data)
            });

        }catch (error){
            setReviews([])
        }

    }
  
    function writeReview() {
        if (!shown) {
            setShown(true)
        }
        else {
            setShown(false)
        }
    }

    const publicReview = () => {

        Swal.fire({
    
          title: '¿Está seguro que desea publicar esta review del juego ' + game.titulo + '?',
          text: 'Podrá editar y eliminar su review posteriormente',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar'
    
        })
    
    }

    return (
    
    <div className='col-12 mb-5 px-0'>
        <section className="col-12 mt-2 border card">

            <div className="d-flex justify-content-between mt-3">
                <div className="d-flex justify-content-between">
                    <h2 className="fw-bold ms-4">Reviews</h2>
                </div>

            {isauthorized
                ? <button className="btn btn-outline-dark me-3 mb-3"
                onClick={writeReview}>
                    <i className="fa-solid fa-message"></i> {(shown) ? "Descartar" : "Publicar"} review
                </button>
                : <p className="fs-5 fw-bold mb-3"><a href='/login'>Regístrate para publicar una review</a></p>
            }

            </div>

            
            <div id="textarea" className={(shown) ? "d-flex justify-content-end" : "d-none d-flex justify-content-end"}>
            
                <div className='col-6 border px-2 py-2 mb-2 me-2'>

                    <div className='d-flex justify-content-between'>
                        <label for="textarea"><h3 className="fw-bold ms-2 mt-3">Escribe tu review</h3></label>
                        <p className=' mt-3'>Caracteres restantes: {200 - count}</p>
                    </div>

                    <div>
                        <textarea id="textarea" className={(count > 0 && count < 201) ? "form-control my-1 border-success" : "form-control my-1 border-danger"}  onChange={e => setCount(e.target.value.length)}></textarea>
                    </div>

                    <fieldset className='d-flex justify-content-start'>
                        <p className=''>¿Recomiendas el juego?</p>
                        <div class="form-check form-check-inline mt-2">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                            <label class="form-check-label" for="inlineRadio1">Si</label>
                        </div>
                        <div class="form-check form-check-inline mt-2">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                            <label class="form-check-label" for="inlineRadio2">No</label>
                        </div>
                    </fieldset>

                    <button className="btn btn-outline-dark me-2 my-2"
                        id="valorar"
                        onClick={publicReview}>
                        <i className="fa-solid fa-message"></i> Publicar
                    </button>

                </div>

            </div>

        </section>

        <div className='row mx-0 mb-5'>

            {(reviews.length === 0) ? 

            <div className='col-12 border card'>
                <div className='d-flex justify-content-center'>
                    <p className="fw-bold fs-5 ms-2">Aún no se ha publicado ninguna review</p>
                </div>
            </div>
            : 
            
            reviews.map( ( review, index ) => (<Review review={review}></Review>))

            }

        </div>

    </div>

    )
}