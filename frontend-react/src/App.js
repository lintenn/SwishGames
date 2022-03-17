import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './vistas/login.js'
import Recovery from './vistas/recovery.js'
import Signup from './vistas/signup';
import Main from './vistas/main';

function App() {
  return (
    <div className="root" id="root" >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}> </Route>
            <Route path='/recovery' element={<Recovery/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/main' element={<Main/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
