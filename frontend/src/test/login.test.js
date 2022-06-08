import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../pages/login.jsx';
import { BrowserRouter } from 'react-router-dom';

describe( 'Login', () => {

  test( 'loginFormShouldRender', () => {

    const component = render(
      <BrowserRouter>
        <Login/>
      </BrowserRouter>
    );
    const inputNode = component.getAllByText( 'Iniciar sesión' )[0];

    expect( inputNode ).toBeInTheDocument();

  });

  test( 'clickingIniciarSesionButtonShouldCallComprobarUserOnce', () => {

    const comprobarUser = jest.fn();

    const component = render(
      <BrowserRouter>
        <Login comprobarUser={comprobarUser() }/>
      </BrowserRouter>
    );
    const buttonNode = component.getAllByText( 'Iniciar sesión' )[1];

    fireEvent.click( buttonNode );

    expect( comprobarUser ).toHaveBeenCalledTimes( 1 );

  });

});
