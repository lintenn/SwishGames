import {useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//import '../login/login.css'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Main = () => {

    const [t, setTitulo] = useState('');
    const [d, setDescripcion] = useState('');
    
    const [users, setUsers] = useState('');
    const navigate = useNavigate()


    return(
        <body>
        <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark p-4">
                <h5 className="text-white h4">Collapsed content</h5>
                <span className="text-muted">Toggleable via the navbar brand.</span>
            </div>
        </div>
        <nav className="navbar navbar-dark bg-dark">
        
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <h1 className="h1sg">SwishGames</h1>
            <button className="btn btn-primary btn-dark"><i className="fa-solid fa-user"></i></button>
            
        </div>
        </nav>

        <div className="main">
            
            <ul className="nav nav-tabs nav-fill">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="main">Juegos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Listas</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Usuarios</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href=''>Chats</a>
                </li>
            </ul>

            <nav class="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <form className="d-flex">
                <input className="form-control me-2" size="125" type="search" placeholder="Buscar juegos" aria-label="Search"/>
                <button className="btn btn-outline-warning" type="submit">Buscar</button>
                </form>
            </div>
            </nav>

            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                    <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Juego 1</h5>
                    <small className="text-muted">Valoración: 3.0</small>
                    </div>
                    <p className="mb-1">Descripción del juego.</p>
                    <small className="text-muted">Género: Mundo abierto</small>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Juego 2</h5>
                    <small className="text-muted">Valoración: 5.0</small>
                    </div>
                    <p className="mb-1">Descripción del juego.</p>
                    <small className="text-muted">Género: Plataformas</small>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Juego 3</h5>
                    <small className="text-muted">Valoración: 9.0</small>
                    </div>
                    <p className="mb-1">Descripción del juego.</p>
                    <small className="text-muted">Género: Rol</small>
                </a>
            </div>
        </div>

        </body>

    )
}

export default Main