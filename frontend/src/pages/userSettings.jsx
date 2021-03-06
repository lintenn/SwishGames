import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthorized } from '../helper/isAuthorized.js';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { Global } from '../helper/Global.js';
import Swal from 'sweetalert2';
import '../styles/userSettings.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserSettings = () => {

  const [id, setId] = useState( '' );
  const [nombre, setNombre] = useState( '' );
  const [description, setDescription] = useState( '' );
  const [password, setPassword] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [ogEmail, setOgEmail] = useState( '' );
  const [birthDate, setBirthDate] = useState( '' );
  const [avatar, setAvatar] = useState( '' );
  const [errorRow, setErrorRow] = useState( '' );
  const [users, setUsers] = useState([]);
  const { name } = useParams();
  const isauthorized = isAuthorized();
  const navigate = useNavigate();
  const baseUrl = Global.baseUrl;
  let error = '';
  const URI = `${baseUrl}users/name/`;

  useEffect( () => {

    if ( isauthorized ) {

      const token = localStorage.getItem( 'user' );
      const us = JSON.parse( token );
      socket.emit( 'conectado', us.nombre );

      if (us.nombre !== name) {
        navigate( '/' );
      }

    } else {
      navigate( '/' );
    }

    getUserByName();
    getUsers();
    loadImageControl();
    document.title = 'Configuración de tus datos';

    document.getElementById( 'div-buscar-juegos-header' ).classList.add( 'ocultar' );
    document.getElementById( 'input-buscar-juegos-header' ).classList.add( 'ocultar' );

  }, [name]);

  const getUserByName = async () => {

    const res = await axios.get( URI + name );
    
    setId( res.data.id );
    setNombre( name );
    setDescription( res.data.descripcion );
    setPassword( res.data.password );
    setEmail( res.data.email );
    setOgEmail( res.data.email );
    setBirthDate( res.data.fecha_nacimiento );
    setAvatar( res.data.imagen );

  };

  const loadImageControl = async () => {
    document.querySelectorAll( 'input[type="file"]' ).forEach( ( input ) => {

      input.addEventListener( 'change', async ( e ) => {
  
        e.preventDefault();
        const file = e.target.files;
        const formData = new FormData();
        formData.append( 'file', file[0]);
        formData.append( 'upload_preset', 'FotosGrupos' );
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/duvhgityi/image/upload',
          {
            method: 'POST',
            body: formData
          }
        );
        const result = await res.json();
        let imagen = result.secure_url;
        document.getElementById( 'img-photo-create-group' ).src = imagen;
  
      });
  
    });
  }

  const showError = async () => {
    if (error !== '') {
      setErrorRow(
      <><div className="row errorcito">
          <p className='text-center fw-bold text-danger'>{error}</p>
      </div><hr /></>
      )
    } else {
      setErrorRow();
    }
  }

  const getUsers = async () => {

    const res = await axios.get( `${baseUrl}users` );
    setUsers( res.data );

  };

  function usernameExists() {

    let exists = false;

    users.forEach( ( user ) => {
      if ( nombre !== name && user.nombre === nombre ) {
        exists = true;
      }

    });

    return exists;

  }

  function emailExists() {

    let exists = false;

    users.forEach( ( user ) => {
      if ( email !== ogEmail && user.email === email ) {
        exists = true;
      }

    });

    return exists;

  }

  function dateNotValid() {
    let date = new Date(birthDate)
    let now = new Date()

    if (date > now) {
      return true;
    } else {
      return false;
    }

  }

  const update = async ( e ) => {

    e.preventDefault();

    if (usernameExists()) {
      error = 'Nombre de usuario ya existente. Por favor, introduzca un nuevo nombre de usuario.';
      showError();
    } else if (emailExists()) {
      error = 'Email ya existente. Por favor, introduzca un nuevo email.';
      showError();
    } else if (dateNotValid()) {
      error = 'La fecha de nacimiento debe ser anterior al presente. Por favor, introduzca una nueva fecha.';
      showError();
    } else {
      error = '';
      showError();

      await axios.put( `${baseUrl}users/${id}`, { nombre: nombre, descripcion: description, email: email, fecha_nacimiento: new Date(birthDate), imagen: document.getElementById( 'img-photo-create-group' ).src });
      localStorage.setItem( 'user', JSON.stringify({ id: id, nombre: nombre, email: email, password: password }) );

      Swal.fire( 'Cambios guardados', 'Tu datos se han modificado con éxito.', 'success' ).then( () => {
        navigate( `/user/${nombre}` );
      });
    }

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
        <div className="container mt-5 mssss">

          <div className="row gutters-sm">


            <div className="col-md-8">

              <div className="card mb-3 information">
              <form onSubmit={update}>
                <div className="card-body">
                  { errorRow }
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <p>Imagen de perfil</p>
                    </div>
                    <div className="col-sm-9 text-secondary d-flex align-items-center">
                      <img src={ avatar } className="d-flex align-self-center m-3 imagen-perfil-chat" id ="img-photo-create-group" alt="..." height="100"/>
                      <input accept="image/*" type="file" id="photo-create-group"/>
                    </div>
                      </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <p>Nombre de usuario</p>
                    </div>
                    <div className="col-sm-9 text-secondary d-flex align-items-center">
                      <input type="text" class="form-control" maxLength={15} value={nombre} onChange={ ( e ) => setNombre( e.target.value )} minLength="6" required />
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <p>Descripción</p>
                    </div>
                    <div className="col-sm-9 text-secondary d-flex align-items-center">
                      <textarea rows="2" class="form-control" maxLength={200} value={description} onChange={ ( e ) => setDescription( e.target.value )}></textarea>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                    <p>Email</p>
                    </div>
                    <div className="col-sm-9 text-secondary d-flex align-items-center">
                      <input type="email" maxLength={50} class="form-control" value={email} onChange={ ( e ) => setEmail( e.target.value )} required />
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                    <p>Fecha de nacimiento</p>
                    </div>
                    <div className="col-sm-9 text-secondary d-flex align-items-center">
                      <input type="date" class="form-control" value={birthDate} onChange={ ( e ) => setBirthDate( e.target.value )} required />
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                    <button type="submit" className="btn btn-outline-success m-1"><i class="fa-solid fa-check"></i> Guardar cambios</button>
                      <Link to={'/user/' + name}>
                        <button className="btn btn-outline-dark m-1"><i class="fa-solid fa-xmark"></i> Cancelar</button>
                      </Link>
                    </div>
                  </div>

                </div>
              </form>
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
