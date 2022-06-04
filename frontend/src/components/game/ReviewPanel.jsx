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
    const [userReview, setUserReview] = useState([])
    const [reviewText, setReviewText] = useState()
    const [liked, setLiked] = useState()
    const [error, setError] = useState("")

    useEffect( () => {

        if(game.length !== 0){

            getReviews()
            getUserReview()

        }
    }, [game]);

    const getReviews = async () => {

        try{
    
            axios.get( URIreview + '/game/' + game.id )
            .then( res => {
                setReviews(res.data)
            });

        }catch (error){
            setReviews([])
        }

    }

    useEffect(() =>{

        if(userReview.length !== 0){
            setCount(userReview[0].review.length)
            setReviewText(userReview[0].review)
            if(userReview[0].recomendado === 1){
                setLiked(1)
            }else{
                setLiked(0)
            }

        }else{
            setReviewText("")
            setLiked(undefined)
        }

    }, [userReview])

    const getUserReview = async () => {

        const token = localStorage.getItem( 'user' );
        const user = JSON.parse( token );

        try{

            axios.get( URIreview + '/usuario/' + game.id + '/' + user.id)
            .then( res => {
                setUserReview(res.data)
            });

        }catch (error){
            setUserReview([])
        }

    }

    function handleChange(event) {
        setReviewText(event.target.value)
        setCount(event.target.value.length)
    }
  
    function writeReview() {
        if (!shown) {
            setShown(true)
        }else if((reviewText === "" && liked === undefined)){
            setShown(false)
            setError("")
        }else if(userReview.length !== 0 && (reviewText === userReview[0].review && liked === userReview[0].recomendado)){
            setShown(false)
            setError("")
        }
        else {
            Swal.fire({
        
                    title: '¿Estás seguro que deseas descartar la review que está escribiendo del juego ' + game.titulo + '?',
                    text: 'Perderás toda la información introducida',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
            
                }).then( (result) => {

                    if(result.value){

                        if(userReview.length === 0){
                            setReviewText("")
                            setLiked(undefined)
                        }else{
                            setReviewText(userReview[0].review)
                            if(userReview[0].recomendado === 1){
                                setLiked(1)
                            }else{
                                setLiked(0)
                            }
                        }
                        setShown(false)
                        setError("")
                        
                    }
                })

        }
    }

    const publicReview = () => {

        if(reviewText.length === 0){

            setError("No puedes publicar una review vacía")
        
        }else if(liked === undefined){

            setError("Selecciona si recomiendas el juego antes de publicar")

        }else if(userReview.length !== 0 
            && reviewText === userReview[0].review 
            && liked === userReview[0].recomendado){

            setError("No has realizado ningún cambio en la review")

        }else{

            setError("")
            const token = localStorage.getItem( 'user' );
            const user = JSON.parse( token );

            Swal.fire({
        
                title: '¿Estás seguro que deseas ' + (userReview.length === 0 ? "publicar": "editar") + ' esta review del juego ' + game.titulo + '?',
                text: 'Podrás editar y eliminar su review posteriormente',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
        
            }).then( (result) => {

                if(result.value){

                    if(false){
                        
                    }else if(false){

                    }else {
                        
                        if(userReview.length === 0){
                            newReview(user)
                        }else{
                            editReview(user)
                        }
                        
                        getReviews()
                        getUserReview()
                        setShown(false)
                        window.location.reload()
                    }
                }

            })

        }

    }

    const newReview = (user) => {
        axios.post(URIreview, {
            id_usuario: user.id,
            id_juego: game.id,
            review: `'${reviewText}'`,
            recomendado: liked
        })
        
        Swal.fire(
            '¡Review publicada!',
            'Tu review ha sido publicada correctamente',
            'success'
        )

    }

    const editReview = (user) => {

        axios.put(URIreview + '/' + game.id + '/' + user.id, {
            review: `'${reviewText}'`,
            recomendado: liked
        })

        Swal.fire(
            '¡Review editada!',
            'Tu review ha sido editada correctamente',
            'success'
        )

    }


    const deleteReview = () => {

        const token = localStorage.getItem( 'user' );
        const user = JSON.parse( token );

        if(userReview.length !== 0){
            Swal.fire({
    
                title: '¿Estás seguro que deseas eliminar tu review del juego ' + game.titulo + '?',
                text: 'No podrás recuperar tu review tras eliminarla',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
          
              }).then( (result) => {
                  
                if(result.value){

                    axios.delete( URIreview + game.id + '/' + user.id)

                    Swal.fire(
                        '¡Borrada!',
                        'Tu review ha sido borrada correctamente',
                        'success'
                    ).then( () => {
            
                       getReviews()
                       setUserReview([])
                       setLiked(undefined)
                       setShown(false)
                       setError("")
                       window.location.reload()
                       
                    });
                }
              })
        }
    }

    return (
    
    <div className='col-12 mb-5 px-0'>
        <section className="col-12 mt-2 border card">

            <div className="d-flex justify-content-between mt-3 pe-1">
                <div className="d-flex justify-content-between">
                    <h2 className="fw-bold ms-4">Reviews</h2>
                </div>

            {isauthorized
                ? ((userReview.length === 0) 
                ? 
                <button className="btn btn-outline-dark me-3 mb-3" onClick={writeReview}>
                    <i className="fa-solid fa-message"></i> {(shown) ? "Descartar" : "Publicar"} review
                </button> 
                : 
                
                <div>
                    <button className="btn btn-outline-dark me-3 mb-3" onClick={writeReview}>
                        <i className="fa-solid fa-pencil"></i> {(shown) ? "Descartar edición" : "Editar review"} 
                    </button>

                    <button className="btn btn-danger me-3 mb-3" onClick={deleteReview}>
                        <i className="fa-solid fa-trash-can"></i> Eliminar review
                    </button>
                </div>)

                : <p className="fs-5 fw-bold mb-3"><a href='/login'>Regístrate para publicar una review</a></p>
            }

            </div>

            
            <div className={(shown) ? "d-flex justify-content-end mx-3 mb-2" : "d-none d-flex justify-content-end"}>
            
                <div className='col-md-12 border px-2 py-2 mb-2 me-1'>

                    <div className='d-flex justify-content-between px-3'>
                        <h3 className="fw-bold ms-0 mt-1">Escribe tu review</h3>
                        <label htmlFor="textarea"><p className="d-none">Redacta tu opinión acerca del juego</p></label>
                        <p className='me-1 mt-1'>Caracteres restantes: {250 - count}</p>
                    </div>

                    <div className='px-3 my-1'>
                        <textarea id="textarea" maxlength="250"
                            className="form-control border-black"  
                            onChange={e => handleChange(e)}
                            value={reviewText}>
                        </textarea>
                    </div>

                    <fieldset className='d-flex justify-content-start px-3'>
                        <p className='ms-0'>¿Recomiendas el juego?</p>
                        <div className="form-check form-check-inline mt-2">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" 
                            checked={liked === 1} onClick={e => setLiked( parseInt(e.target.value) )}/>
                            <label className="form-check-label" htmlFor="inlineRadio1">Si</label>
                        </div>
                        <div className="form-check form-check-inline mt-2">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="0"
                            checked={liked === 0} onClick={e => setLiked( parseInt(e.target.value) )}/>
                            <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                        </div>
                    </fieldset>

                    <div className='d-flex d-flex justify-content-between px-3'>

                        <button className="btn btn-outline-dark me-3 my-2"
                            id="valorar"
                            onClick={publicReview}>
                            <i className="fa-solid fa-message"></i> Publicar
                        </button>

                        {(error !== "") ? 
                        <div class="alert alert-danger d-flex align-items-center mb-0 py-0" role="alert">
                            <i class="fa-solid fa-triangle-exclamation me-2"></i>
                            <div>
                                {error}
                            </div>
                        </div> : <div></div>}

                    </div>

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