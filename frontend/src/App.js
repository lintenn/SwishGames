import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './views/login/login.jsx';
import Recovery from './views/recovery/recovery.jsx';
import Signup from './views/signup/signup.jsx';
import Main from './views/main/main.jsx';
import { Chat } from './views/chat/Chat.jsx';
import Game from './views/game/game.jsx';
import User from './views/user/user.jsx';

function App() {

  return (
    <div className="root"
      id="root" >
      <BrowserRouter>
        <Routes>
          <Route path="/login"
            element={<Login/>}/>
          <Route path="/recovery"
            element={<Recovery/>}/>
          <Route path="/signup"
            element={<Signup/>}/>
          <Route path="/"
            element={<Main/>}/>
          <Route path="/chat"
            element={<Chat/>}/>
          <Route path="/game/:id"
            element={<Game/>}/>
          <Route path="/user/:name"
            element={<User/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
