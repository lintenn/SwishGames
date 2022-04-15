import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpList = ( listId, list, setList, setGames, setAllGames ) => {
    
      Swal.showLoading();
    
      axios.get( `${baseUrl}contentsLists/${listId}/` )
     .then( res => {
    
        setGames( res.data );
    
     }).catch( err => console.log(err) )
    
     Swal.close();
};