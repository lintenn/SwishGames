import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpLogin = ( setUsers ) => {

  Swal.showLoading();

  axios.get( `${baseUrl}users` )
    .then( res => {

      setUsers( res.data );

    });

  Swal.close();

};
