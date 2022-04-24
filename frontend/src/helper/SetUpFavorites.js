import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpFavorites = ( usNombre, setFavGames ) => {

  Swal.showLoading();

  axios.get( `${baseUrl}contentsLists/favoritos/${usNombre}` )
    .then( res => {

      console.log( `${baseUrl}contentsLists/favoritos/${usNombre}` );
      setFavGames( res.data );

    }
    );

  Swal.close();

};


