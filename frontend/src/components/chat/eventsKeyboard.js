export function eventKeyboard( event, setMensaje, mensajesDESC, user, receptor, numeroMensajeUser, group ) {

  if ( event.key === 'Enter' ) {

    console.log( 'H' );
    document.getElementById( 'botonEnviar' ).click();
    setMensaje( '' );

  } else if ( event.key === 'ArrowUp' ) {

    console.log( 'H2' );
    let numeroMaximoUser = 0;

    mensajesDESC.forEach( ( men ) => {

      if ( ( men.nombre_usuario_emisor === user.nombre && men.nombre_usuario_receptor === receptor ) || men.id_grupo_receptor === group.id ) {

        numeroMaximoUser = numeroMaximoUser + 1;

      }


    });

    if ( numeroMensajeUser === numeroMaximoUser && numeroMaximoUser !== 0 ) {

      let i = 1;
      mensajesDESC.forEach( ( mensaje ) => {

        if ( ( mensaje.nombre_usuario_emisor === user.nombre && mensaje.nombre_usuario_receptor === receptor ) || mensaje.id_grupo_receptor === group.id ) {

          if ( i === numeroMensajeUser ) {

            setMensaje( mensaje.mensaje );

          }
          i = i + 1;

        }

      });

    } else if ( numeroMaximoUser === 0 ) {

      setMensaje( '' );

    } else {

      if ( numeroMensajeUser < numeroMaximoUser ) {

        numeroMensajeUser = numeroMensajeUser + 1;
        let i = 1;
        mensajesDESC.forEach( ( men ) => {

          if ( ( men.nombre_usuario_emisor === user.nombre && men.nombre_usuario_receptor === receptor ) || men.id_grupo_receptor === group.id ) {

            if ( i === numeroMensajeUser ) {

              setMensaje( men.mensaje );

            }
            i = i + 1;

          }


        });

      }

    }


  } else if ( event.key === 'ArrowDown' ) {

    console.log( 'H3' );
    if ( numeroMensajeUser > 0 ) {

      let i = 1;
      mensajesDESC.forEach( ( mensaje ) => {

        if ( ( mensaje.nombre_usuario_emisor === user.nombre && mensaje.nombre_usuario_receptor === receptor ) || mensaje.id_grupo_receptor === group.id ) {

          if ( i === numeroMensajeUser ) {

            setMensaje( mensaje.mensaje );

          }
          i = i + 1;

        }


      });
      numeroMensajeUser = numeroMensajeUser - 1;

    } else if ( numeroMensajeUser === 0 ) {

      setMensaje( '' );

    }

  }

  return numeroMensajeUser;

}
