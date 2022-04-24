import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpLists = ( userNombre, setLists, setAllLists ) => {

  Swal.showLoading();

  axios.get( `${baseUrl}lists/user/${userNombre}/` )
    .then( res => {

      setLists( res.data );

    })
    .catch( err => console.log( err ) );

  axios.get( `${baseUrl}lists/user/${userNombre}/` )
    .then( res => {

      setAllLists( res.data );

    })
    .catch( err => console.log( err ) );

  Swal.close();

};
