import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Global } from '../../helper/Global.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/game.css';

export const Review = ({review}) => {

    const baseUrl = Global.baseUrl;
    const URIuser = `${baseUrl}users/`;
    const [user, setUser] = useState([{}]);

    useEffect( () => {

        getUser()

    }, [review]);

    useEffect( () => {

        console.log(user)

    }, [user]);

    const getUser = async () => {

        try{
    
            axios.get( URIuser + '/' + review.id_usuario )
            .then( res => {
                setUser(res.data)
            });

        }catch (error){
            setUser([])
        }

    }


    return (

        <div className='col-md-6 col-lg-4 border card'>
            <div className='d-flex justify-content-between mt-1 mx-4'>
                <p className="fw-bold fs-5">{user[0].nombre}</p>

                {(review.recomendado) 
                ? <p className='fst-italic'><i class="fa-solid fa-thumbs-up me-1"></i>Recomienda el juego</p>
                : <p className='fst-italic'><i class="fa-solid fa-thumbs-down me-1"></i>No recomienda el juego</p>}
            </div>

            <div className='d-flex justify-content-start mx-4'>
              <p>{review.review}</p>
            </div>
            
            <div className='d-flex justify-content-end'>
                <p>{review.createdAT}</p>
            </div>

        </div>

    )

}