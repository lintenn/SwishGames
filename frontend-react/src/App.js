import React, {useState} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import socket from './vistas/chat/componentes/Socket.js';
import Login from './vistas/login/login.js'
import Recovery from './vistas/recovery/recovery.js'
import Signup from './vistas/signup/signup.js';
import Main from './vistas/main/main.js';
import Chat from './vistas/chat/Chat.js';
import Game from './vistas/game/game.js';


function App() {

  return (
    <div className="root" id="root" >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}> </Route>
            <Route path='/recovery/recovery' element={<Recovery/>}></Route>
            <Route path='/signup/signup' element={<Signup/>}></Route>
            <Route path='/main/main' element={<Main/>}></Route>
            <Route path='/chat/Chat' element={<Chat/>}></Route>
            <Route path='/game/game/:id' element={<Game/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
