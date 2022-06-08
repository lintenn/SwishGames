/* global cy  */

describe( 'Nuevo usuario', () => {

  it( 'Crear dos usuarios', () => {

    cy.visit( 'http://localhost:3000/' );
    cy.request( 'DELETE', 'http://localhost:8000/users/' );
    cy.get( '#btn-login-header' ).click();
    cy.get( '#loginBtnSignup' ).click();

    cy.get( '#usuario' ).type( 'Prueba' );
    cy.get( '#email' ).type( 'prueba@gmail.com' );
    cy.get( '#password' ).type( '12345678' );
    cy.get( '#rpassword' ).type( '12345678' );

    cy.get( '#btnSubmitSignUp' ).click();

    cy.get( '.swal2-confirm.swal2-styled' ).click();

    cy.visit( 'http://localhost:3000/signup/' );

    cy.get( '#usuario' ).type( 'Prueba2' );
    cy.get( '#email' ).type( 'prueba2@gmail.com' );
    cy.get( '#password' ).type( '12345678' );
    cy.get( '#rpassword' ).type( '12345678' );

    cy.get( '#btnSubmitSignUp' ).click();

    cy.get( '.swal2-confirm.swal2-styled' ).click();

  });

});

describe( 'Hacer review, crear lista, ver usuario y enviar mensaje', () => {

  beforeEach( () => {

    cy.visit( 'http://localhost:3000/' );
    cy.get( '#btn-login-header' ).click();
    cy.get( '#usuario' ).type( 'Prueba' );
    cy.get( '#loginPsw' ).type( '12345678' );
    cy.get( '#loginBtnPsw' ).click();

  });

  it( 'Publicar Review', () => {

    cy.get( '#Juego1' ).click();
    cy.get( '#publicarReview' ).click();
    cy.get( '#textarea' ).type( 'Review de prueba' );
    cy.get( '#inlineRadio1' ).click();
    cy.get( '#valorar' ).click();
    cy.get( '.swal2-confirm.swal2-styled.swal2-default-outline' ).click();

  });

  it( 'Crear lista', () => {

    cy.get( '#lists' ).click();
    cy.get( '#btn-new-list' ).click();
    cy.get( '.swal2-input' ).type( 'Nueva lista' );
    cy.get( '.swal2-confirm.swal2-styled' ).click();
    cy.get( '.swal2-confirm.swal2-styled' ).click();

  });

  it( 'Visitar otro usuario y enviarle un mensaje', () => {

    cy.get( '#users' ).click();
    cy.get( '#UserCardPrueba2' ).click();
    cy.get( '#enviarMensaje' ).click();
    cy.get( '#inputMensaje-enviar-chat' ).type( 'Mensaje de prueba\n' );

  });

  it( 'Crear grupo y enviar mensaje', () => {

    cy.get( '#chat' ).click();

    cy.get( '#dropdownMenuButton1' ).click();
    cy.get( '#btn-chat-grupos' ).click();

    cy.get( '#nameNewGroup' ).type( 'Grupo de prueba' );
    cy.get( '#description-create-group' ).type( 'Descripción de prueba' );
    cy.get( '#SiguienteGrupo' ).click();

    cy.get( '#Prueba2AñadirGrupo' ).click();
    cy.get( '#Prueba2AñadirGrupo' ).click();
    cy.get( '#Prueba2AñadirGrupo' ).click();
    cy.get( '#CrearGrupo' ).click();

    cy.get( '.swal2-confirm.swal2-styled' ).click();

    cy.get( '#inputMensaje-enviar-chat' ).type( 'Mensaje de prueba en grupo\n' );

  });

});
