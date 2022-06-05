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
  const [password, setPassword] = useState( '' );
  const [currentPassword, setCurrentPassword] = useState( '' );
  const [newPassword, setNewPassword] = useState( '' );
  const [newPassword2, setNewPassword2] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [errorRow, setErrorRow] = useState( '' );
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
      
      document.title = 'Cambiando tu contraseña';

    } else {
      navigate( '/' );
    }

    getUserByName();

    document.getElementById( 'div-buscar-juegos-header' ).classList.add( 'ocultar' );
    document.getElementById( 'input-buscar-juegos-header' ).classList.add( 'ocultar' );

  }, [name]);

  const getUserByName = async () => {

    const res = await axios.get( URI + name );
    
    setId( res.data.id );
    setNombre( name );
    setPassword( res.data.password );
    setEmail( res.data.email );

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

  const update = async ( e ) => {

    e.preventDefault();

    if (newPassword.length < 8) {
      error = 'La nueva contraseña debe contener mínimo 8 caracteres. Por favor, introdúzcala de nuevo.';
      setNewPassword( '' );
      setNewPassword2( '' );
      showError();
    } else if (newPassword !== newPassword2) {
      error = 'La nueva contraseña no coincide en los campos de texto requeridos. Por favor, introdúzcala de nuevo.';
      setNewPassword( '' );
      setNewPassword2( '' );
      showError();
    } else if (password !== currentPassword) {
      error = 'La contraseña actual introducida es incorrecta. Por favor, introdúzcala de nuevo.';
      setCurrentPassword( '' );
      showError();
    } else {
      error = '';
      showError();

      await axios.put( `${baseUrl}users/${id}`, { password: newPassword });
      localStorage.setItem( 'user', JSON.stringify({ id: id, nombre: nombre, email: email, password: password }) );

      Swal.fire( 'Cambios guardados', 'Tu contraseña ha sido modificada con éxito.', 'success' ).then( () => {
        navigate( `/user/${name}` );
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
                      <p>Contraseña actual</p>
                    </div>
                    <div className="col-sm-9 text-secondary d-flex align-items-center">
                      <input type="password" class="form-control" maxLength={15} value={currentPassword} onChange={ ( e ) => setCurrentPassword( e.target.value )} required />
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <p>Nueva contraseña</p>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <p className="small text-muted mx-0 my-0">La contraseña debe contener mínimo 8 caracteres.</p>
                      <input type="password" class="form-control" maxLength={15} value={newPassword} onChange={ ( e ) => setNewPassword( e.target.value )} required />
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <p>Confirmar nueva contraseña</p>
                    </div>
                    <div className="col-sm-9 text-secondary d-flex align-items-center">
                      <input type="password" class="form-control" maxLength={15} value={newPassword2} onChange={ ( e ) => setNewPassword2( e.target.value )} required />
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                    <button type="submit" className="btn btn-outline-success m-1"><i class="fa-solid fa-check"></i> Cambiar contraseña</button>
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

export default PasswordSettings;
