import React from 'react';
import axios from 'axios';
import { infoGroup } from '../infoGroups/infoGroups';
import { Global } from '../../../helper/Global';

const baseUrl = Global.baseUrl;

export const setMiembrosGrupo = ( id, setConfigurationGroups, myGroups, users, user, setGroup, setReceptor, setConexion ) => {

  axios.get( `${baseUrl}participantsGroups/users/${id}` )
    .then( res =>
      setConfigurationGroups(
        <div className="dropdown">
          <button className="botonTransparente2 btnAñadirChats"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </button>
          <ul className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1">
            <li><button className="dropdown-item"
              onClick={() => infoGroup( myGroups, id, res.data, user, setGroup, setReceptor, setConexion )}>Ver información del grupo</button></li>
          </ul>
        </div> ) );


};
