export const formatMessage = ( mensaje ) => {

  let ultimoMensaje = mensaje.mensaje === null ? 'imagen' : mensaje.mensaje;
  if ( ultimoMensaje.length > 15 ) {

    ultimoMensaje = ultimoMensaje.substring( 0, 12 );
    ultimoMensaje += '...';

  }
  return ultimoMensaje;

};
