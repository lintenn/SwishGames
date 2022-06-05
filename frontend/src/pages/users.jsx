import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../helper/isAuthorized.js';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpUsers } from '../helper/SetUpUsers.js';
import Swal from 'sweetalert2';
import { UserCards } from '../components/users/UserCards.jsx';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [buscado, setBuscado] = useState( '' );
  const isauthorized = isAuthorized();
  const [user, setUser] = useState({});


  useEffect( () => {

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );
      setUser( us );

    }


    setUpUsers( setUsers );
    document.title = 'Usuarios';

  }, []);

  useEffect( () => {

    if ( users.length !== 0 ) {

      document.getElementById( 'input-buscar-juegos-header' ).placeholder = 'Buscar usuarios';

    }

  }, [users]);

  return (
    users.length === 0
      ? <div>{Swal.showLoading()}</div>
      : <div>
        <Header
          buscado={ buscado }
          setBuscado={ setBuscado }
        />
        <main className="row justify-content-center main"
          id="main-content">
          <div className="col-lg-8 list-group"
            data-bs-spy="scroll">
            <UserCards
              users={ users }
              setUsers={ setUsers }
              buscado={ buscado }
              userAct={ user }
            />
          </div>
        </main>
        <Footer/>
      </div>
  );

};

export default Users;
