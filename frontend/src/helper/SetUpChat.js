import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpChat = ( setUser, setUsers, setMensajes, setMensajesDESC, setMyGroups, setGroups, user ) => {

  setUser( JSON.parse( localStorage.getItem( 'user' ) ) );

  axios.get( `${baseUrl}chats/fecha` )
    .then( res => {

      setMensajesDESC( res.data );

    });

  axios.get( `${baseUrl}users` )
    .then( res => setUsers( res.data ) );

  axios.get( `${baseUrl}chats` )
    .then( res => setMensajes( res.data ) );

  if ( user !== null ) {

    axios.get( `${baseUrl}participantsGroups/grupos/${user.nombre}` )
      .then( res => setMyGroups( res.data ) );

  };

  axios.get( `${baseUrl}groups` )
    .then( res => setGroups( res.data ) );

  Swal.close();

};
