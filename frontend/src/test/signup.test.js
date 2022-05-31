import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Signup from '../pages/signup.jsx';
import { BrowserRouter } from 'react-router-dom';

describe( 'Signup', () => {

  test( 'signUpFormShouldRender', () => {

    const component = render(
      <BrowserRouter>
        <Signup/>
      </BrowserRouter>
    );
    const inputNode = component.getByText( 'Usuario' );

    expect( inputNode ).toBeInTheDocument();

  });

  test( 'clickingSignUpButtonShouldCallComprobarUserOnce', () => {

    const comprobarUser = jest.fn();

    const component = render(
      <BrowserRouter>
        <Signup comprobarUser={comprobarUser() }/>
      </BrowserRouter>
    );
    const buttonNode = component.getByText( 'Registrarse' );

    fireEvent.click( buttonNode );

    expect( comprobarUser ).toHaveBeenCalledTimes( 1 );

  });

});
