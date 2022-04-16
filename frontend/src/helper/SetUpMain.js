import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';
import { isAuthorized } from './isAuthorized.js';

const baseUrl = Global.baseUrl;
const isauthorized = isAuthorized();

export const setUpMain = ( setGames, setFavGames, setAllGames ) => {

  Swal.showLoading();

  axios.get( `${baseUrl}games/` )
    .then( res => {

      setGames( res.data );

    });

    if (isauthorized) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );

      axios.get( `${baseUrl}contentsLists/favoritos/${us.id}` )
        .then( res => {
            
            setFavGames( res.data );
  
          }
        );

    }

  axios.get( `${baseUrl}games/` )
    .then( res => {

      setAllGames( res.data );

    });

  Swal.close();

};
