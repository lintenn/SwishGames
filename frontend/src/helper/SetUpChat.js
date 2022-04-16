import axios from 'axios';
import { Global } from './Global';
import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpChat = ( user, setUsers, setMensajes, setMensajesDESC, setMyGroups ) => {

  Swal.showLoading();

  axios.get( `${baseUrl}chats/fecha` )
    .then( res => {

      setMensajesDESC( res.data );

    });

  axios.get( `${baseUrl}users` )
    .then( res => setUsers( res.data ) );

  axios.get( `${baseUrl}chats` )
    .then( res => setMensajes( res.data ) );

  axios.get( `${baseUrl}participantsGroups/grupos/${user.nombre}` )
    .then( res => setMyGroups( res.data ) );

  Swal.close();

};
