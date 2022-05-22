import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthorized } from '../helper/isAuthorized.js';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global.js';
import '../styles/userSettings.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserSettings = () => {

  const [lists, setLists] = useState([]);
  const [description, setDescription] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [birthDate, setBirthDate] = useState( '' );
  const [creationDate, setCreationDate] = useState( '' );
  const [avatar, setAvatar] = useState( '' );
  const [userOptions, setUserOptions] = useState( '' );
  const [conexion, setConexion] = useState( '' );
  const [favoritos, setFavoritos] = useState( '' );
  const { name } = useParams();
  const isauthorized = isAuthorized();
  const baseUrl = Global.baseUrl;
  let URILists = '';
  let URIFavourites = '';
  const URI = `${baseUrl}users/name/`;

  useEffect( () => {

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );

    }

    getUserByName();
    checkUserOptions();

    URILists = `${baseUrl}lists/user/${name}/`;
    getLists();
    getFavouritesNumber();

    document.getElementById( 'div-buscar-juegos-header' ).classList.add( 'ocultar' );
    document.getElementById( 'input-buscar-juegos-header' ).classList.add( 'ocultar' );

  }, [name]);

  const getLists = async () => {
    const res = await axios.get( `${URILists}` );
    setLists( res.data );
  }

  const getUserByName = async () => {

    const res = await axios.get( URI + name );
    
    setDescription( res.data.descripcion );
    setEmail( res.data.email );
    setBirthDate( res.data.fecha_nacimiento );
    setCreationDate( res.data.fecha_creacion );
    setAvatar( res.data.imagen );

    if ( res.data.online ) {

      setConexion(
        <div id="divOnline">
          <div id="online"></div>
          Online
        </div> );

    } else {

      setConexion(
        <div id="divOffline">
          <div className="col" id="offline"></div>
          Offline
        </div> );

    }

  };

  const getFavouritesNumber = async () => {

    URIFavourites = `${baseUrl}contentsLists/count/favoritos/${name}/`;
    const res = await axios.get( URIFavourites );
    setFavoritos( res.data );

  }

  const checkUserOptions = async () => {
    const token = localStorage.getItem( 'user' );
    const us = JSON.parse( token );

    if (us.nombre == name) {
      setUserOptions(
        <>
          <hr/>
          <div className="row">
            <div className="col-sm-12">
              <button className="btn btn-outline-dark m-1">
                <i className="fa-solid fa-user"></i> Editar perfil
              </button>
              <button className="btn btn-outline-dark m-1">
                <i className="fa-solid fa-key"></i> Cambiar contraseña
              </button>
            </div>
          </div>
        </>
      )
    } else {
      setUserOptions()
    }
  }

  return (
    <div>
      <Header
        buscado={ '' }
        setBuscado={ () => {

          '';

        } }
      />

      <main className="row justify-content-center mt-5">
        <div className="container mt-5 mssss">

          <div className="row gutters-sm">


            <div className="col-md-8">

              <div className="card mb-3 information">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3 ">
                      <p>Nombre</p>
                    </div>
                    <div className="col-sm-9 text-secondary "><input type="text" class="form-control" maxLength={15} defaultValue={name} /></div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 ">
                      <p>Descripción</p>
                    </div>
                    <div className="col-sm-9 text-secondary "><textarea rows="2" class="form-control" maxLength={200} defaultValue={description}></textarea></div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                    <p>Email</p>
                    </div>
                    <div className="col-sm-9 text-secondary "><input type="email" maxLength={50} class="form-control" defaultValue={email} /></div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 ">
                    <p>Fecha de nacimiento</p>
                    </div>
                    <div className="col-sm-9 text-secondary "><input type="date" class="form-control" defaultValue={birthDate} /></div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 ">
                    <p>URL de imagen de perfil</p>
                    </div>
                    <div className="col-sm-9 text-secondary "><textarea rows="1" maxLength={500} class="form-control" defaultValue={avatar}></textarea></div>
                  </div>

                  { userOptions }

                </div>
              </div>

            </div>

          </div>

        </div>

        <Footer/>

      </main>
    </div>
  );

                    }

export default UserSettings;
