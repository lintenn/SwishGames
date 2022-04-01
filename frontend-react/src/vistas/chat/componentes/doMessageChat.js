import React from 'react';

export function doMessage( gruposMios, idGrupo, mensajes, grupos, receptor, nombre, nombreGrupo ) {

  const message = [];

  let nombreAnterior = '';
  let dateEntrada = new Date();

  gruposMios.forEach( ( grupo ) => {

    if ( grupo.id_grupo === idGrupo ) {

      dateEntrada = new Date( grupo.fecha_union );

    }

  });

  mensajes.forEach( ( mensaje ) => {

    let dateCreacion = new Date();
    const dateHoy = new Date();

    if ( idGrupo !== '' ) {

      grupos.forEach( ( grupo ) => {

        if ( grupo.id === idGrupo ) {

          dateCreacion = new Date( grupo.fecha_creacion );

        }

      });

    }

    if ( ( mensaje.nombre_usuario_emisor === nombre && ( mensaje.nombre_usuario_receptor === receptor || mensaje.id_grupo_receptor === idGrupo ) ) || ( mensaje.nombre_usuario_emisor === receptor && mensaje.nombre_usuario_receptor === nombre ) || ( mensaje.id_grupo_receptor === idGrupo && dateCreacion <= dateEntrada && dateHoy !== dateEntrada ) ) {

      const d = new Date( mensaje.fecha_envio );
      const s = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();

      if ( receptor !== '' && nombreGrupo === '' ) {

        if ( mensaje.nombre_usuario_emisor === nombre ) {

          if ( nombre === nombreAnterior ) {

            message.push(
              <div className="d-flex flex-row justify-content-end">
                <div className="d-flex flex-row justify-content-end mensajeActualizadoMio">
                  <div className="pt-1 tamañoMaximoMensaje">
                    <p className="small cols-4">{mensaje.mensaje}</p>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1 cols-4 tamañoHora">{s}</p>
                  </div>
                </div>
              </div>
            );


          } else {

            message.push(
              <div className="d-flex flex-row justify-content-end">
                <div className="d-flex flex-row justify-content-end mensajeActualizadoMio mt-5">
                  <div className="pt-1 tamañoMaximoMensaje">
                    <p className="small">{mensaje.mensaje}</p>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1 tamañoHora">{s}</p>
                  </div>
                </div>
              </div>
            );

          }

        } else {

          if ( mensaje.nombre_usuario_emisor === nombreAnterior ) {

            message.push(
              <div className="d-flex flex-row justify-content-start">
                <div className="d-flex flex-row justify-content-start mensajeActualizadoOtro">
                  <div className="pt-1 tamañoMaximoMensaje">
                    <p className="small">{mensaje.mensaje}</p>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1 tamañoHora">{s}</p>
                  </div>
                </div>
              </div>
            );

          } else {

            message.push(
              <div className="d-flex flex-row justify-content-start">
                <div className="d-flex flex-row justify-content-start mensajeActualizadoOtro mt-5">
                  <div className="pt-1 tamañoMaximoMensaje">
                    <p className="small">{mensaje.mensaje}</p>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted mb-1 tamañoHora">{s}</p>
                  </div>
                </div>
              </div>
            );

          }

        }

      } else if ( receptor === '' && nombreGrupo !== '' ) {

        /* if ( mensaje.nombre_usuario_emisor === nombre ) {

            if ( nombre === nombreAnterior ) {

              message.push(
                <div className="d-flex flex-row justify-content-end">
                  <div className="d-flex flex-row justify-content-end mensajeActualizadoMio">
                    <div className="pt-1 tamañoMaximoMensaje">
                      <p className="small cols-4">{mensaje.mensaje}</p>
                    </div>
                    <div className="pt-1">
                      <p className="small text-muted mb-1 cols-4 tamañoHora">{s}</p>
                    </div>
                  </div>
                </div>
              );


            } else {

              message.push(
                <div className="d-flex flex-row justify-content-end">
                  <div className="d-flex flex-row justify-content-end mensajeActualizadoMio mt-5">
                    <div className="pt-1 tamañoMaximoMensaje">
                      <p className="fw-bold mb-0">{mensaje.nombre_usuario_emisor}</p>
                      <p className="small">{mensaje.mensaje}</p>
                    </div>
                    <div className="pt-1">
                      <p className="small text-muted mb-1 tamañoHora">{s}</p>
                    </div>
                  </div>
                </div>
              );

            }

          } else {

            if ( mensaje.nombre_usuario_emisor === nombreAnterior ) {

              message.push(
                <div className="d-flex flex-row justify-content-start">
                  <div className="d-flex flex-row justify-content-start mensajeActualizadoOtro">
                    <div className="pt-1 tamañoMaximoMensaje">
                      <p className="small">{mensaje.mensaje}</p>
                    </div>
                    <div className="pt-1">
                      <p className="small text-muted mb-1 tamañoHora">{s}</p>
                    </div>
                  </div>
                </div>
              );

            } else {

              message.push(
                <div className="d-flex flex-row justify-content-start">
                  <div className="d-flex flex-row justify-content-start mensajeActualizadoOtro mt-5">
                    <div className="pt-1 tamañoMaximoMensaje">
                      <p className="fw-bold mb-0">{mensaje.nombre_usuario_emisor}</p>
                      <p className="small">{mensaje.mensaje}</p>
                    </div>
                    <div className="mt-5">
                      <p className="small text-muted mb-1 tamañoHora">{s}</p>
                    </div>
                  </div>
                </div>
              );

            }

          } */

      }
      nombreAnterior = mensaje.nombre_usuario_emisor;

    }

  });

  return ( message );

}
