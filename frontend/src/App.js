import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import Recovery from './pages/recovery.jsx';
import Signup from './pages/signup.jsx';
import Main from './pages/main.jsx';
import { Chat } from './pages/Chat.jsx';
import Game from './pages/game.jsx';
import User from './pages/user.jsx';
import Lists from './pages/lists.jsx';
import List from './pages/list.jsx';
import EditList from './pages/editList.jsx';
import Users from './pages/users.jsx';
import UserSettings from './pages/userSettings.jsx';
import PasswordSettings from './pages/passwordSettings.jsx';

function App() {

  return (
    <div className="root" >
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
          <Route path="/lists"
            element={<Lists/>}/>
          <Route path="/list/:id"
            element={<List/>}/>
          <Route path="/list/:id/edit"
            element={<EditList/>}/>
          <Route path="/users/"
            element={<Users/>}/>
          <Route path="/userSettings/:name"
            element={<UserSettings/>}/>
          <Route path="/passwordSettings/:name"
            element={<PasswordSettings/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
