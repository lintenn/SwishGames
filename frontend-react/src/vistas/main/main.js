import {useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
//import '../login/login.css'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const URI = 'http://localhost:8000/games/'
//const URI = 'https://swishgames-backend.herokuapp.com/games/'

const Main = () => {
    
    const [games, setGames] = useState([]);
    const navigate = useNavigate()


    useEffect( ()=>{
        getGames()
    },[])

    //procedimineto para obtener todos los usuarios
    const getGames = async () => {
        const res = await axios.get(URI)
        setGames(res.data)
        
    }

    function doGames() {

        const listado = [];

        games.map((game) => {

            listado.push(
                <a href="#" className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <img src={game.imagen} width="200" height="150" />
                        <div className='px-2'>
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{game.titulo}</h5>
                            <small className="text-muted">Valoración: {game.valoracion}</small>
                            </div>
                            <p className="mb-1">{game.descripcion}</p>
                            <small className="text-muted">Género: {game.genero}</small>
                        </div>
                    </div>
                </a>
            )

        })

        return (listado)

    } 

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
                    <a className="nav-link text-warning" href="#">Listas</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-warning" href="#">Usuarios</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-warning" href=''>Chats</a>
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
                {doGames()}
            </div>
        </div>

        </body>

    )
}

export default Main