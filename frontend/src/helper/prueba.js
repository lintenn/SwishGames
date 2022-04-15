import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const prueba = ( list, setGames, games, setAllGames ) => {
    
      let games2 = [];
console.log(list)
      list.forEach( ( content ) => {
          axios.get( `${baseUrl}games/${content.id_juego}/` )
            .then( res => {
                games2.push( res.data[0] );
            }).catch( err => console.log(err) )

        });


      setGames( games2 );
      setAllGames( games2 );
    console.log(games)
      Swal.close();
    
};