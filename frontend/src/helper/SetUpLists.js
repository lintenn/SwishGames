import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpLists = ( setLists, setAllLists ) => {
    
      Swal.showLoading();
    
      axios.get( `${baseUrl}lists/` )
     .then( res => {
    
        setLists( res.data );
    
     });
    
      axios.get( `${baseUrl}lists/` )
     .then( res => {
    
        setAllLists( res.data );
    
     });
    
      Swal.close();
    
};