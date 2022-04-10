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
        <div class="container mt-5 ms-6">
      
          <div class="row gutters-sm">
            
            <div class="col-md-2">
              
              <div class="card" style={{width: '18rem;'}}>
                <img src="https://www.personality-database.com/profile_images/183486.png" class="px-5 pt-3 rounded-circle" alt="..."/>
                <div class="card-body">
                  <p class="text-center fs-3 fw-bolder">{name}</p>
                  <p class="text-center">{description}</p>
                </div>
              </div>
              
              <ul class="list-group list-group-flush border mt-3">
                <li class="list-group-item">
                  <div class="row ms-1">
                    <div class="col">
                      <p class="text-end fs-3 fw-bolder">50</p>
                    </div>
                    <div class="col-8">
                      <p class="text">Videojuegos completados</p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="row ms-1">
                    <div class="col">
                      <p class="text-end fs-3 fw-bolder">69</p>
                    </div>
                    <div class="col-8">
                      <p class="text">Videojuegosㅤㅤpor jugar</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="col-md-8">
              
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      Nombre
                    </div>
                    <div class="col-sm-9 text-secondary">{name}</div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      Email
                    </div>
                    <div class="col-sm-9 text-secondary">{email}</div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      Fecha de nacimiento
                    </div>
                    <div class="col-sm-9 text-secondary">{birthDate}</div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      Fecha de creación de la cuenta
                    </div>
                    <div class="col-sm-9 text-secondary">{creationDate}</div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      Privacidad
                    </div>
                    <div class="col-sm-9 text-secondary">uwu</div>
                  </div>
                  <hr/>
                  
                  <div class="row">
                    <div class="col-sm-12">
                      <button className="btn btn-outline-dark m-1">
                        <i className="fa-solid fa-user"></i> Editar perfil
                      </button>
                      <button className="btn btn-outline-dark m-1">
                        <i class="fa-solid fa-key"></i> Cambiar contraseña
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <ul class="list-group list-group-flush border mt-3">

                <li class="list-group-item">
                  <div class="row">
                    <p class="text fs-5 fw-normal mt-2">Listas de {name}</p>
                  </div>
                </li>

                <li class="list-group-item">
                  <div class="container">
                    <div class="row">

                      <div class="col-sm-4">
                        <a className="nav-link"href="#Listas">
                          <div id="carousel1" class="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div class="carousel-inner">
                              <div class="carousel-item active">
                                <img src="https://i.ytimg.com/vi/4c1tEsPQZ_Y/maxresdefault.jpg" class="d-block w-100" alt="..."/>
                                <div class="carousel-caption d-none d-md-block">
                                  <p class="fw-bold text-center carousel-text">Videojuegos completados</p>
                                </div>
                              </div>
                              <div class="carousel-item">
                                <img src="https://cdn1.epicgames.com/offer/6f43ab8025ad42d18510aa91e9eb688b/EGS_FINALFANTASYVIIREMAKEINTERGRADE_SquareEnix_S1_2560x1440-85f829541a833442eaace75d02e0f07d" class="d-block w-100" alt="..."/>
                                <div class="carousel-caption d-none d-md-block">
                                  <p class="fw-bold text-center carousel-text">Videojuegos completados</p>
                                </div>
                              </div>
                              <div class="carousel-item">
                                <img src="https://i.blogs.es/35b4ab/kingdom-hearts-ii-2175149/1366_2000.jpeg" class="d-block w-100" alt="..."/>
                                <div class="carousel-caption d-none d-md-block">
                                  <p class="fw-bold text-center carousel-text">Videojuegos completados</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>

                      <div class="col-sm-4">
                        <a className="nav-link"href="#Listas">
                          <div id="carousel2" class="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div class="carousel-inner">
                              <div class="carousel-item active">
                                <img src="https://i.ytimg.com/vi/4c1tEsPQZ_Y/maxresdefault.jpg" class="d-block w-100" alt="..."/>
                                <div class="carousel-caption d-none d-md-block">
                                  <p class="fw-bold text-center carousel-text">Videojuegos completados</p>
                                </div>
                              </div>
                              <div class="carousel-item">
                                <img src="https://cdn1.epicgames.com/offer/6f43ab8025ad42d18510aa91e9eb688b/EGS_FINALFANTASYVIIREMAKEINTERGRADE_SquareEnix_S1_2560x1440-85f829541a833442eaace75d02e0f07d" class="d-block w-100" alt="..."/>
                                <div class="carousel-caption d-none d-md-block">
                                  <p class="fw-bold text-center carousel-text">Videojuegos completados</p>
                                </div>
                              </div>
                              <div class="carousel-item">
                                <img src="https://i.blogs.es/35b4ab/kingdom-hearts-ii-2175149/1366_2000.jpeg" class="d-block w-100" alt="..."/>
                                <div class="carousel-caption d-none d-md-block">
                                  <p class="fw-bold text-center carousel-text">Videojuegos completados</p>
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
