import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isAuthorized } from '../helper/isAuthorized.js';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpList } from '../helper/SetUpList.js';
import { prueba } from '../helper/prueba.js';
import Swal from 'sweetalert2';
import { Global } from '../helper/Global.js';
import { GamesPreviewList } from '../components/lists/GamesPreviewList.jsx';

const List = () => {
    
    const [games, setGames] = useState([]);
    const { id } = useParams();
    const [list, setList] = useState([]);
    const [allGames, setAllGames] = useState([]);
    const [buscado, setBuscado] = useState( '' );
    const isauthorized = isAuthorized();
    const baseUrl = Global.baseUrl;
    const URI = `${baseUrl}contentsLists/`;

    useEffect( () => {
            
        if ( isauthorized ) {
    
            const token = localStorage.getItem( 'user' );
            const us = JSON.parse( token );
            socket.emit( 'conectado', us.nombre );
    
        }
    
        setUpList( id, list, setList, setGames, setAllGames);
    
        //getContentsListById();

    }, []);

    /*const getContentsListById = async () => {
        const res = await axios.get(URI + id);
        setList(res.data);
    }*/

    /* useEffect(() => {
        if(list.length !== 0){
            prueba(list, setGames, games, setAllGames);
        }
        console.log(games)
    }, [list]) */

    return (
        games.length === 0
        ? <div>
            <Header 
            buscado={ buscado }
            setBuscado={ setBuscado }
            />
            <main className="row justify-content-center main"
            id="main-content">
                <div className="col-lg-8 list-group"
                data-bs-spy="scroll">
                    <h1 className="mt-5 text-dark px-3"> Lista vacía </h1>            
                    </div>
            </main>
            <Footer/>
        </div>
        : <div>
            <Header
            buscado={ buscado }
            setBuscado={ setBuscado }
            />
            <main className="row justify-content-center main"
            id="main-content">
                <div className="col-lg-8 list-group"
                data-bs-spy="scroll">
                    <h1 className="mt-5 text-dark px-3"> Lista: </h1>
                    <GamesPreviewList
                    id={ id }
                    list={ list }
                    setList={ setList }
                    games={ games }
                    setGames={ setGames }
                    buscado={ buscado }
                    setAllGames={ setAllGames }
                    />
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default List;
