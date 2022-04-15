import React, { useState, useEffect } from 'react';
import { isAuthorized } from '../helper/isAuthorized.js';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../components/chat/Socket';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';
import { setUpLists } from '../helper/SetUpLists.js';
import Swal from 'sweetalert2';
import { ListsPreview } from '../components/lists/ListsPreview.jsx';
import { useNavigate } from '../../node_modules/react-router/index';


const Lists = () => {
    
    const [lists, setLists] = useState([]);
    const [allLists, setAllLists] = useState([]);
    const [buscado, setBuscado] = useState( '' );
    const isauthorized = isAuthorized();
    const navigate = useNavigate();
    
    useEffect( () => {
    
        if (!isauthorized) {
            Swal.fire('No has iniciado sesión').then(() => {
                navigate('/');
            });
        } else {
            const token = localStorage.getItem('user');
            const us = JSON.parse(token);
            socket.emit('conectado', us.nombre);

            setUpLists(us.id, setLists, setAllLists);
            
        }
    
    }, []);

    console.log(allLists)
    
      return (
     allLists.length === 0
        ? <div></div>
        : <div>
          <Header
             buscado={ buscado }
             setBuscado={ setBuscado }
          />
          <main className="row justify-content-center main"
             id="main-content">
             <div className="col-lg-8 list-group"
                data-bs-spy="scroll">
                <ListsPreview
                  lists={ lists }
                  setLists={ setLists }
                  buscado={ buscado }
                  setAllLists={ setAllLists }
                />
             </div>
          </main>
          <Footer/>
        </div>
      );
    

};

export default Lists;