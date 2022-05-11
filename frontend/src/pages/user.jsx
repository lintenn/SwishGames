import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../helper/isAuthorized.js';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global.js';
import '../styles/user.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const User = () => {

  const [myusername, setMyusername] = useState( '' );
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
    getMyUsername();
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

  const getMyUsername = async () => {
    const token = localStorage.getItem( 'user' );
    const us = JSON.parse( token );
    setMyusername( us.nombre );
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
        <div className="container mt-5 ms-6">

          <div className="row gutters-sm">

            <div className="col-md-2">

              <div className="card"
                style={{ width: '18rem' }}>
                <img src="https://www.personality-database.com/profile_images/183486.png"
                  className="px-5 pt-3 rounded-circle"
                  alt="..."/>
                <div className="card-body">
                  <p className="text-center fs-3 fw-bolder">{name}</p>
                  <p className="text-center">{description}</p>
                </div>
              </div>

              <ul className="list-group list-group-flush border mt-3">
                <li className="list-group-item">
                  <div className="row ms-1">
                    <div className="col">
                      <p className="text-end fs-3 fw-bolder">50</p>
                    </div>
                    <div className="col-8">
                      <p className="text">Videojuegos completados</p>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row ms-1">
                    <div className="col">
                      <p className="text-end fs-3 fw-bolder">69</p>
                    </div>
                    <div className="col-8">
                      <p className="text">Videojuegosㅤㅤpor jugar</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="col-md-8">

              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      Nombre
                    </div>
                    <div className="col-sm-9 text-secondary">{name}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      Email
                    </div>
                    <div className="col-sm-9 text-secondary">{email}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      Fecha de nacimiento
                    </div>
                    <div className="col-sm-9 text-secondary">{birthDate}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      Fecha de creación de la cuenta
                    </div>
                    <div className="col-sm-9 text-secondary">{creationDate}</div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      Privacidad
                    </div>
                    <div className="col-sm-9 text-secondary">uwu</div>
                  </div>

                  { myusername == name ?
                    <><hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <button className="btn btn-outline-dark m-1">
                          <i className="fa-solid fa-user"></i> Editar perfil
                        </button>
                        <button className="btn btn-outline-dark m-1">
                          <i className="fa-solid fa-key"></i> Cambiar contraseña
                        </button>
                      </div>
                    </div></>
                  : ""}

                </div>
              </div>

              <ul className="list-group list-group-flush border mt-3">

                <li className="list-group-item">
                  <div className="row">
                    <p className="text fs-5 fw-normal mt-2">Listas de {name}</p>
                  </div>
                </li>

                <li className="list-group-item">
                  <div className="container">
                    <div className="row">

                      <div className="col-sm-4">
                        <a className="nav-link"
                          href="#Listas">
                          <div id="carousel1"
                            className="carousel slide carousel-fade"
                            data-bs-ride="carousel">
                            <div className="carousel-inner">
                              <div className="carousel-item active">
                                <img src="https://i.ytimg.com/vi/4c1tEsPQZ_Y/maxresdefault.jpg"
                                  className="d-block w-100"
                                  alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                  <p className="fw-bold text-center carousel-text">Videojuegos completados</p>
                                </div>
                              </div>
                              <div className="carousel-item">
                                <img src="https://cdn1.epicgames.com/offer/6f43ab8025ad42d18510aa91e9eb688b/EGS_FINALFANTASYVIIREMAKEINTERGRADE_SquareEnix_S1_2560x1440-85f829541a833442eaace75d02e0f07d"
                                  className="d-block w-100"
                                  alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                  <p className="fw-bold text-center carousel-text">Videojuegos completados</p>
                                </div>
                              </div>
                              <div className="carousel-item">
                                <img src="https://i.blogs.es/35b4ab/kingdom-hearts-ii-2175149/1366_2000.jpeg"
                                  className="d-block w-100"
                                  alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                  <p className="fw-bold text-center carousel-text">Videojuegos completados</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>

                      <div className="col-sm-4">
                        <a className="nav-link"
                          href="#Listas">
                          <div id="carousel2"
                            className="carousel slide carousel-fade"
                            data-bs-ride="carousel">
                            <div className="carousel-inner">
                              <div className="carousel-item active">
                                <img src="https://i.ytimg.com/vi/4c1tEsPQZ_Y/maxresdefault.jpg"
                                  className="d-block w-100"
                                  alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                  <p className="fw-bold text-center carousel-text">Videojuegos por jugar</p>
                                </div>
                              </div>
                              <div className="carousel-item">
                                <img src="https://cdn1.epicgames.com/offer/6f43ab8025ad42d18510aa91e9eb688b/EGS_FINALFANTASYVIIREMAKEINTERGRADE_SquareEnix_S1_2560x1440-85f829541a833442eaace75d02e0f07d"
                                  className="d-block w-100"
                                  alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                  <p className="fw-bold text-center carousel-text">Videojuegos por jugar</p>
                                </div>
                              </div>
                              <div className="carousel-item">
                                <img src="https://i.blogs.es/35b4ab/kingdom-hearts-ii-2175149/1366_2000.jpeg"
                                  className="d-block w-100"
                                  alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                  <p className="fw-bold text-center carousel-text">Videojuegos por jugar</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>

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
