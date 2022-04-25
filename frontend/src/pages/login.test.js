import React from 'react';
import { render } from '@testing-library/react';
import Login from './login.jsx';

describe( 'Login', () => {

  it( 'loginFormShouldRender', () => {

    const component = render( <Login/> );
    const inputNode = component.getByPlaceholderText( 'Usuario' );

    expect( inputNode ).toBeInTheDocument();

  });

});
