export function eventKeyboard( event, setMensaje, mensajesDESC, user, receptor, numeroMensajeUser, group ) {

  event.preventDefault();
  if ( event.key === 'Enter' ) {

    document.querySelector( '#botonEnviar' ).click();

  }

  return numeroMensajeUser;

}
