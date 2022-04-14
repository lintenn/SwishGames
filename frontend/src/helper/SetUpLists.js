import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpLists = ( userId, setLists, setAllLists ) => {
    
    
      axios.get( `${baseUrl}lists/${userId}/` )
     .then( res => {
    
        setLists( res.data );
    
     })
       .catch( err => console.log(err) )
    
      axios.get( `${baseUrl}lists/${userId}/` )
     .then( res => {
    
        setAllLists( res.data );
    
     })
     .catch( err => console.log(err) )

     Swal.close();
    
};