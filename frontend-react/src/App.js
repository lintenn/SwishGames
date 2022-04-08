import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './vistas/login/login.jsx';
import Recovery from './vistas/recovery/recovery.jsx';
import Signup from './vistas/signup/signup.jsx';
import Main from './vistas/main/main.jsx';
import { Chat } from './vistas/chat/Chat.jsx';
import Game from './vistas/game/game.jsx';
import User from './vistas/user/user.jsx';
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
          <Route path="/user/:name"
            element={<User/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
