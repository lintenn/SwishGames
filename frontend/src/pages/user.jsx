import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthorized } from '../helper/isAuthorized.js';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global.js';
import Swal from 'sweetalert2';
import '../styles/user.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from '../../node_modules/react-router/index';

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
  const navigate = useNavigate();

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

  const showFinalDeletionSwal = ( errorMessage ) => {
    Swal.fire({
      html: `<div style="background-color: #f0eeee">
              <p class="text-center" style="color:red">${errorMessage}</p>
              <h5>Introduzca su contraseña para confirmar la eliminación de la cuenta.</h5></br>
              <p class="text-center">Contraseña:</p>
              <input type="password" class="form-control" maxLength="15" size="15" id="dltpwd"/>
            </div>`,
      background: '#f0eeee',
      showCloseButton: true,
      closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      focusConfirm: false,
    }).then( ( result ) => {

      if ( result.value ) {
        const token = localStorage.getItem( 'user' );
        const us = JSON.parse( token );
        const pass = document.getElementById( 'dltpwd' ).value;

        if (pass.length === 0 || pass !== us.password) {
          showFinalDeletionSwal( "La contraseña introducida es incorrecta." )
        } else {
          localStorage.clear();
          axios.delete(`${baseUrl}users/${us.id}`);

          Swal.fire( 'Cuenta eliminada', 'Tu cuenta ha sido eliminada con éxito.', 'success' ).then( () => {
            navigate( '/' );
          });
        }
      }

    });
  }

  const showDeletionSwal = () => {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar tu cuenta?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#292b2c',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      focusCancel: true
    }).then( ( result ) => {

      if ( result.value ) {
        showFinalDeletionSwal( "" )
      }

    });
  }

  const checkUserOptions = async () => {
    const token = localStorage.getItem( 'user' );
    const us = JSON.parse( token );

    if (us != null && us.nombre === name) {
      setUserOptions(
        <>
          <hr/>
          <div className="row">
            <div className="col-sm-12">
              <Link to={'/userSettings/' + name}><button className="btn btn-outline-dark m-1">
                <i className="fa-solid fa-user"></i> Editar perfil
              </button></Link>
              <Link to={'/passwordSettings/' + name}><button className="btn btn-outline-dark m-1">
                <i className="fa-solid fa-key"></i> Cambiar contraseña
              </button></Link>
              <button className="btn btn-outline-danger m-1" onClick={() => showDeletionSwal()}>
                <i class="fa-solid fa-xmark"></i> Eliminar cuenta
              </button>
            </div>
          </div>
        </>
      )
    } else {
      setUserOptions(
        <>
          <hr/>
          <div className="row">
            <div className="col-sm-12">
                <button className="btn btn-outline-dark m-1" onClick={() => {navigate(`/chat/${name}`)}}><i class="fa-solid fa-comment-dots"></i> Enviar mensaje</button>
            </div>
          </div>
        </>
      )
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
                    <div className="col-sm-3 textito d-flex align-items-center">
                      Nombre de usuario
                    </div>
                    <div className="col-sm-9 text-secondary textito d-flex align-items-center">{name}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 textito d-flex align-items-center">
                      Email
                    </div>
                    <div className="col-sm-9 text-secondary textito d-flex align-items-center">{email}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 textito d-flex align-items-center">
                      Fecha de nacimiento
                    </div>
                    <div className="col-sm-9 text-secondary textito d-flex align-items-center">{ new Date(birthDate).toLocaleString('en-GB').split(",")[0] }</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 textito d-flex align-items-center">
                      Fecha de creación de la cuenta
                    </div>
                    <div className="col-sm-9 text-secondary textito d-flex align-items-center">{ new Date(creationDate).toLocaleString('en-GB').split(",")[0] }</div>
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
