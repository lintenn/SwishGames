import React from 'react';
import PropTypes from 'prop-types';
import { chatUsers } from './createNewChats/newChat';
import { chatGroups } from './createNewChats/newGroup';
import Swal from 'sweetalert2';

export const IniciarChat = ({ setIniciandoChat, users, user, setReceptor, setConexion, receptor, group, setGroup, myGroups, setConfigurationGroups }) => {

  const beginChat = () => {

    Swal.fire({
      html: `<div className="row justify-content-center">${showOptions()}</div>`,
      background: '#f0eeee',
      showCloseButton: true,
      closeButtonHtml: '<i class="fas fa-times" style="color: red"></i>',
      showCancelButton: false,
      showConfirmButton: false,
      focusConfirm: false,
      allowOutsideClick: false,
      didOpen: () => {

        addClickButton();

      }

    });

  };

  const showOptions = () => {

    let options = '';

    options += `<ul class="botonTransparente2 btnAñadirChats">
                    <li><button class="botonTransparente4 mt-3" id="newChat">Nuevo chat</button></li>
                    <li><button class="botonTransparente4 mt-3" id="newGroup">Nuevo grupo</button></li>
                </ul>`;

    return options;

  };

  const addClickButton = () => {

    const newChat = document.querySelector( '#newChat' );
    const newGroup = document.querySelector( '#newGroup' );

    newChat.addEventListener( 'click', () => {

      chatUsers( user, users, receptor, setReceptor, group, setGroup, setIniciandoChat, setConexion );

    });

    newGroup.addEventListener( 'click', () => {

      chatGroups( user, setGroup, users, group, receptor, setReceptor, setConexion, setConfigurationGroups, myGroups, setIniciandoChat );

    });

  };

  return (
    <div className="mt-5 centrar">
      <div className="mt-5 centrar">
        <div className="mt-5">
          <h1 className="mt-5">Inicia un nuevo chat para comenzar a chatear</h1>
          <div className="dropdown centrar mt-5">
            <button className="botonTransparente3"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => beginChat()}>
              <svg xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="150"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16">
                <path fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};


IniciarChat.propTypes = {
  setIniciandoChat: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setReceptor: PropTypes.func.isRequired,
  setConexion: PropTypes.func.isRequired,
  receptor: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired,
  setGroup: PropTypes.func.isRequired,
  myGroups: PropTypes.array.isRequired,
  setConfigurationGroups: PropTypes.func.isRequired
};
