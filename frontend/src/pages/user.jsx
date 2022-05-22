import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthorized } from '../helper/isAuthorized.js';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global.js';
import '../styles/user.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const User = () => {

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
              <Link to={'/userSettings/' + name}><button className="btn btn-outline-dark m-1">
                <i className="fa-solid fa-user"></i> Editar perfil
              </button></Link>
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
        <div className="container mt-5 ms-6">

          <div className="row gutters-sm pad3">

            <div className="col-md-2 mb-3 padperfil">

              <div className="container-fluid card profile center">
                <img src={ avatar }
                  className="px-5 pt-3 rounded-circle"
                  alt="..."/>
                <div className="card-body">
                  <p className="text-center text-nowrap fs-2 fw-bolder title">{name}</p>
                  { conexion }
                  <p className="text-center text">{description}</p>
                </div>
              </div>

              <ul className="list-group list-group-flush border mt-3 backprofile">
                <li className="list-group-item">
                  <div className="row ms-1">
                    <div className="col">
                      <p className="text-end fs-1 fw-bolder pad0">{favoritos.length}</p>
                    </div>
                    <div className="col-8">
                      <p className="text-center pad1">Videojuegos favoritos</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="col-md-8 pad2">

              <div className="card mb-3 information">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3 textito">
                      Nombre de usuario
                    </div>
                    <div className="col-sm-9 text-secondary textito">{name}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 textito">
                      Email
                    </div>
                    <div className="col-sm-9 text-secondary textito">{email}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 textito">
                      Fecha de nacimiento
                    </div>
                    <div className="col-sm-9 text-secondary textito">{ new Date(birthDate).toLocaleString('en-GB').split(",")[0] }</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 textito">
                      Fecha de creación de la cuenta
                    </div>
                    <div className="col-sm-9 text-secondary textito">{ new Date(creationDate).toLocaleString('en-GB').split(",")[0] }</div>
                  </div>

                  { userOptions }

                </div>
              </div>

              <ul className="list-group list-group-flush border mt-3">

                <li className="list-group-item">
                  <div className="row">
                    <p className="text fs-5 fw-bolder mt-2">Listas de {name}</p>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className="container">
                    <div className="row">

                    { lists.map( ( list, index ) => (
                      <Link to={'/list/' + list.id}
                      key = {index}>
                      <div className="list-group-item list-group-item-action">
                        <div className="d-flex w-100">
                          <i className="fa-solid fa-list"></i>
                          <div className="d-flex w-100 justify-content-center">

                            <h4 className="mb-1 ttexte"> &nbsp; {list.nombre}</h4>

                          </div>
                        </div>
                      </div>
                      </Link>
                    ) ) }

                    </div>
                  </div>
                </li>

              </ul>

            </div>

          </div>

        </div>

        <Footer/>

      </main>
    </div>
  );

};

export default User;
