import React from 'react';

export const fotoPerfil = ( group, receptor, users, tam ) => {

  let imagen = '';

  if ( ( group.nombre !== undefined && receptor === '' ) ) {

    imagen =
              <img src={group.imagen}
                alt="avatar"
                className="d-flex align-self-center me-3 imagen-perfil-chat"
                width={tam}
                height={tam} />;

  } else if ( ( group.length === undefined && receptor !== '' ) ) {

    users.forEach( ( user ) => {

      if ( user.nombre === receptor ) {

        imagen =
          <img src={user.imagen}
            alt="avatar"
            className="d-flex align-self-center me-3 imagen-perfil-chat"
            width={tam}
            height={tam} />;

      }

    });

  }

  return imagen;

};
