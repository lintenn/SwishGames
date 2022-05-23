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

const PasswordSettings = () => {

  const [id, setId] = useState( '' );
  const [nombre, setNombre] = useState( '' );
  const [description, setDescription] = useState( '' );
  const [password, setPassword] = useState( '' );
  const [newPassword, setNewPassword] = useState( '' );
  const [newPassword2, setNewPassword2] = useState( '' );
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

    }

    getUserByName();
    getUsers();

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

      await axios.put( `${baseUrl}users/${id}`, { nombre: nombre, descripcion: description, email: email, fecha_nacimiento: new Date(birthDate), imagen: avatar });
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
                    <div className="col-sm-3 ">
                      <p>Contraseña actual</p>
                    </div>
                    <div className="col-sm-9 text-secondary ">
                      <input type="password" class="form-control" maxLength={15} value={password} onChange={ ( e ) => setPassword( e.target.value )} />
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <p>Nueva contraseña</p>
                    </div>
                    <div className="col-sm-9 text-secondary ">
                      <p className="small text-muted mx-0 my-0">La contraseña debe tener mínimo 8 caracteres</p>
                      <input type="password" class="form-control" maxLength={15} value={newPassword} onChange={ ( e ) => setNewPassword( e.target.value )} />
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 ">
                      <p>Confirmar nueva contraseña</p>
                    </div>
                    <div className="col-sm-9 text-secondary ">
                      <input type="password" class="form-control" maxLength={15} value={newPassword2} onChange={ ( e ) => setNewPassword2( e.target.value )} />
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                      <Link to={'/user/' + name}>
                        <button className="btn btn-outline-dark m-1"><i class="fa-solid fa-xmark"></i> Cancelar</button>
                      </Link>
                        <button className="btn btn-outline-success m-1"><i class="fa-solid fa-check" type="submit"></i> Cambiar contraseña</button>
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

export default PasswordSettings;
