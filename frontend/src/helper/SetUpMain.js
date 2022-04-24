import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpMain = ( setGames, setAllGames ) => {

  Swal.showLoading();

  axios.get( `${baseUrl}games/` )
    .then( res => {

      setGames( res.data );

    });

  axios.get( `${baseUrl}games/` )
    .then( res => {

      setAllGames( res.data );

    });

  Swal.close();

};
