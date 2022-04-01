import React from 'react';

export function doButton( mensajesDESC, nombre, receptor, nombreGrupo, setReceptor, showChat ) {

  const botonesUsers = [];
  const users2 = [];
  let i = 0;

  mensajesDESC.forEach( ( men ) => {

    let enc = false;
    if ( men.nombre_usuario_emisor === nombre ) {

      for ( let i = 0; i < users2.length && !enc; i++ ) {

        if ( men.nombre_usuario_receptor === users2[i]) {

          enc = true;

        }

      }
      if ( !enc ) {

        users2.push( men.nombre_usuario_receptor );
        const d = new Date( men.fecha_envio );
        const s = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + ( d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes() );
        let nombreReceptor = men.nombre_usuario_receptor;
        while ( nombreReceptor.length < 15 ) {

          nombreReceptor += ' ';

        }
        let ultimoMensaje = men.mensaje;
        if ( ultimoMensaje.length > 15 ) {

          ultimoMensaje = ultimoMensaje.substring( 0, 12 );
          ultimoMensaje += '...';

        }
        if ( i === 0 && receptor === '' && nombreGrupo === '' ) {

          setReceptor( men.nombre_usuario_receptor );

        }
        i = i + 1;
        botonesUsers.push(
          <li className="p-2 border-bottom">
            <button className="d-flex justify-content-between botonNaranja"
              onClick={() => showChat( men.nombre_usuario_receptor )}>
              <div className="d-flex flex-row">
                <div className="align-items-center divObjectsSend">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                    alt="avatar"
                    className="d-flex align-self-center me-3"
                    width="60"/>
                </div>
                <div className="pt-1">
                  <p className="fw-bold mb-0">{nombreReceptor}</p>
                  <p className="small text-muted">{ultimoMensaje}</p>
                </div>
              </div>
              <div className="pt-1">
                <p className="small text-muted mb-1 textoTransparente textoDerecha tamañoHora">l</p>
                <p className="small text-muted mb-1 textoTransparente textoDerecha tamañoHora">l</p>
                <p className="small text-muted mb-1 textoDerecha tamañoHora">{s}</p>
              </div>
            </button>
          </li> );

      }

    } else if ( men.nombre_usuario_receptor === nombre ) {

      for ( let i = 0; i < users2.length; i++ ) {

        if ( men.nombre_usuario_emisor === users2[i]) {

          enc = true;

        }

      }
      if ( !enc ) {

        users2.push( men.nombre_usuario_emisor );
        const d = new Date( men.fecha_envio );
        const s = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
        let nombreReceptor = men.nombre_usuario_emisor;
        while ( nombreReceptor.length < 15 ) {

          nombreReceptor += ' ';

        }
        let ultimoMensaje = men.mensaje;
        if ( ultimoMensaje.length > 15 ) {

          ultimoMensaje = ultimoMensaje.substring( 0, 12 );
          ultimoMensaje += '...';

        }
        if ( i === 0 && receptor === '' && nombreGrupo === '' ) {

          setReceptor( men.nombre_usuario_emisor );

        }
        i = i + 1;
        botonesUsers.push(
          <li className="p-2 border-bottom">
            <button className="d-flex justify-content-between botonNaranja"
              onClick={() => showChat( men.nombre_usuario_emisor )}>
              <div className="d-flex flex-row">
                <div className="align-items-center divObjectsSend">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                    alt="avatar"
                    className="d-flex align-self-center me-3"
                    width="60"/>
                </div>
                <div className="pt-1">
                  <p className="fw-bold mb-0">{nombreReceptor}</p>
                  <p className="small text-muted">{ultimoMensaje}</p>
                </div>
              </div>
              <div className="pt-1">
                <p className="small text-muted mb-1 textoTransparente textoDerecha tamañoHora">l</p>
                <p className="small text-muted mb-1 textoTransparente textoDerecha tamañoHora">l</p>
                <p className="small text-muted mb-1 textoDerecha tamañoHora">{s}</p>
              </div>
            </button>
          </li> );

      }

    }

  });

  return ( botonesUsers );

}
