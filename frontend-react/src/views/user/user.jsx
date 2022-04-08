import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../../helper/isAuthorized.js';
import socket from '../chat/components/Socket.js';
import { Header } from '../../helper/header.jsx';
import { Footer } from '../../helper/footer.jsx';
import { Global } from '../../helper/Global.js';

const User = () => {

  const [description, setDescription] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [birthDate, setBirthDate] = useState( '' );
  const [creationDate, setCreationDate] = useState( '' );
  const { name } = useParams();
  const isauthorized = isAuthorized();
  const baseUrl = Global.baseUrl;
  const URI = `${baseUrl}users/name/`;

  useEffect( () => {

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );

    }

    getUserByName();
    document.getElementById( 'div-buscar-juegos-header' ).classList.add( 'ocultar' );
    document.getElementById( 'input-buscar-juegos-header' ).classList.add( 'ocultar' );

  }, []);

  const getUserByName = async () => {

    const res = await axios.get( URI + name );

    setDescription( res.data.descripcion );
    setEmail( res.data.email );
    setBirthDate( res.data.fecha_nacimiento );
    setCreationDate( res.data.fecha_creacion );

  };

  return (
    <div>
      <Header
        buscado={ '' }
        setBuscado={ () => {

          '';

        } }
      />
      <main className="row justify-content-center mt-5">
        <div className="col-3">
          <br></br>
          <br></br>
          <h1>{name}</h1>
          <h5>Descripción: {description}</h5>
          <h5>Email: {email}</h5>
          <h5>Fecha de nacimiento: {birthDate}</h5>
          <h5>Fecha de creación: {creationDate}</h5>
        </div>
        <Footer/>
      </main>
    </div>
  );

};

export default User;
