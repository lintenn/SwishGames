import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpList = ( listId, list, setList, setGames, setAllGames ) => {
    
      Swal.showLoading();
    
      axios.get( `${baseUrl}contentsLists/${listId}/` )
     .then( res => {
    
        setList( res.data );
    
     }).catch( err => console.log(err) )

     console.log(listId);
     console.log(list);

      let games = [];

      list.map( ( content ) => {
          axios.get( `${baseUrl}games/${content.id_juego}/` )
            .then( res => {
                games.push( res.data );
            }).catch( err => console.log(err) )

        });

      console.log(games);

      setGames( games );
      setAllGames( games );
    
      Swal.close();
    
};