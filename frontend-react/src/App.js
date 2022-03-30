import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './vistas/login/login.js';
import Recovery from './vistas/recovery/recovery.js';
import Signup from './vistas/signup/signup.js';
import Main from './vistas/main/main.js';
import Chat from './vistas/chat/Chat.js';
import Game from './vistas/game/game.js';
import { isAuthorized } from './helper/isAuthorized';

function App() {

  console.log( '¿Ha iniciado sesión? ', isAuthorized() );

  return (
    <div className="root"
      id="root" >
      <BrowserRouter>
        <Routes>
          <Route path="/login"
            element={<Login/>}> </Route>
          <Route path="/recovery"
            element={<Recovery/>}></Route>
          <Route path="/signup"
            element={<Signup/>}></Route>
          <Route path="/"
            element={<Main/>}></Route>
          <Route path="/chat"
            element={<Chat/>}></Route>
          <Route path="/game/:id"
            element={<Game/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
