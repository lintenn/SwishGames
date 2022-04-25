import React from 'react';
import { render } from '@testing-library/react';
import Login from './pages/login.jsx';
import { BrowserRouter } from '../node_modules/react-router-dom';

describe( 'Login', () => {

  it( 'loginFormShouldRender', () => {

    const component = render(
      <BrowserRouter>
        <Login/>
      </BrowserRouter>
    );
    const inputNode = component.getByText( 'Usuario' );

    expect( inputNode ).toBeInTheDocument();

  });

});
