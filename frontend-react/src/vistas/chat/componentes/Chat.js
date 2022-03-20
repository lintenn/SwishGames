import React, {useState, useEffect, useRef} from 'react'
import socket from './Socket'
import '../Chat.css'
import axios from 'axios'

const URI = 'http://localhost:8000/chats/'
const URIUsers = 'http://localhost:8000/users/'
//const URI = 'https://prueba-swishgame-backend.herokuapp.com/chats'

const Chat = ({nombre}) => {

    const [mensaje, setMensaje] = useState('')
    const [mensajes, setMensajes] = useState([])
    const [mensajesDESC, setMensajesDESC] = useState([])
    const [users, setUsers] = useState([])
    const [receptor, setReceptor] = useState('')
    const divRef = useRef(null)

    useEffect(() => {
        socket.emit('conectado', nombre)
    }, [nombre])

    useEffect(() => {
        socket.on('mensajes', () => {
            getMensajes()
        })

        return () => {socket.off()}
    }, [mensajes])

    useEffect(() => {
        socket.on('otroConectado', (nomb) => {
            getUsers(receptor)
        })

        return () => {socket.off()}
    }, [users])

    useEffect(() => {
        socket.on('otroDesconectado', (nomb) => {
            getUsers(receptor)
        })

        return () => {socket.off()}
    }, [users])

    useEffect( ()=>{
        getUsers(receptor)
        getMensajes()
    },[])

    //procedimineto para obtener todos los usuarios
    const getMensajes = async () => {
        const res = await axios.get(URI)
        setMensajes(res.data)
        const res2 = await axios.get(URI+"fecha")
        setMensajesDESC(res2.data)
    }

    const getUsers = async (rec) => {
        const res = await axios.get(URIUsers)
        setUsers(res.data)
        users.map((user) => {
            if(user.nombre===rec){
                if(user.online){
                    document.getElementById("divOnline").classList.add("mostrarOnline");
                    document.getElementById("divOffline").classList.remove("mostrarOnline");
                    document.getElementById("divOffline").classList.add("ocultar");
                } else {
                    document.getElementById("divOnline").classList.remove("mostrarOnline");
                    document.getElementById("divOnline").classList.add("ocultar");
                    document.getElementById("divOffline").classList.add("mostrarOnline");
                }
            }
        })
    }
    
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' })
    })

    const submit = async (e) => {
        e.preventDefault()
        await axios.post(URI, {nombre_usuario_emisor: nombre, nombre_usuario_receptor: receptor, mensaje: mensaje})
        socket.emit('mensaje')
        setMensaje('')
    }

    /* const getMensajesOnePerson = async (rec) => {
        if(receptor !== '') {
            const res = await axios.get(URI+'nombre_usuario_receptor/'+rec+"/"+nombre)
            setMensajes(res.data)
            const res2 = await axios.get(URI+'fecha')
            setMensajesDESC(res2.data)
        }
    } */

    async function showChat(rec){
        getUsers(rec)
        setReceptor(rec)
        document.getElementById('labelNameUser').innerHTML=rec
        getMensajes()
        document.getElementById("panelChat").classList.add("mostrar");
    }

    function doButton(){

        const prueba = [];
        let users2 = [];

        mensajesDESC.map((men) => {
            
            if(men.nombre_usuario_emisor === nombre) {
                var enc = false;
                for(let i = 0; i < users2.length && !enc; i++){
                    if(men.nombre_usuario_receptor === users2[i]){
                        enc = true;
                    }
                }
                if(!enc){
                    users2.push(men.nombre_usuario_receptor);
                    let d = new Date(men.fecha_envio)
                    let s = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
                    prueba.push(
                        <button className='boton' key={men.id} onClick={() => {showChat(men.nombre_usuario_receptor) }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colSpan={3}>{men.nombre_usuario_receptor}</td>
                                        <td><small>{s}</small></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>{men.mensaje}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </button>)
                }
            } else if(men.nombre_usuario_receptor === nombre){
                var enc = false;
                for(let i = 0; i < users2.length; i++){
                    if(men.nombre_usuario_emisor === users2[i]){
                        enc = true;
                    }
                }
                if(!enc){
                    users2.push(men.nombre_usuario_emisor);
                    let d = new Date(men.fecha_envio)
                    let s = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
                    prueba.push(
                        <button className='boton' key={men.id} onClick={() => {showChat(men.nombre_usuario_emisor)}}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colSpan={3}>{men.nombre_usuario_emisor}</td>
                                        <td><small>{s}</small></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>{men.mensaje}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </button>)
                }
            }
        })

        return (prueba)
    }

    function doMessage(){

        const message = []
        let nombreAnterior = ''

        mensajes.map((mensaje) => {
            
            if((mensaje.nombre_usuario_emisor === nombre && mensaje.nombre_usuario_receptor === receptor) || (mensaje.nombre_usuario_emisor === receptor && mensaje.nombre_usuario_receptor === nombre)) {
                let d = new Date(mensaje.fecha_envio)
                let s = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
                if(mensaje.nombre_usuario_emisor === nombre){
                    if(nombre === nombreAnterior){
                        message.push(
                            <div className='bloqueMensajeMio'>
                                <div className='mensajeMio'>
                                    <p>{mensaje.mensaje} <small>{s}</small></p>
                                </div>
                            </div>
                        )
                    } else {
                        message.push(
                            <div className='bloqueMensajeMio'>
                                <p className='nombreMio'><b>{nombre}</b></p>
                                <div className='mensajeMio'>
                                    <p>{mensaje.mensaje} <small>{s}</small></p>
                                </div>
                            </div>
                        )
                    }
                } else {
                    if(mensaje.nombre_usuario_emisor === nombreAnterior){
                        message.push(
                            <div className='bloqueMensajeOtro'>
                                <div className='mensajeOtro'>
                                    <p>{mensaje.mensaje} <small>{s}</small></p>
                                </div>
                            </div>
                        )
                    } else {
                        message.push(
                            <div className='bloqueMensajeOtro'>
                                <p className='nombreOtro'><b>{mensaje.nombre_usuario_emisor}</b></p>
                                <div className='mensajeOtro'>
                                    <p>{mensaje.mensaje} <small>{s}</small></p>
                                </div>
                            </div>
                        )
                    }
                }
                nombreAnterior = mensaje.nombre_usuario_emisor
            }
        })

        return (message)
    }
    
    return (
        <div className='panelPrincipal'>
            <div className='panelUsersChat'>
                {doButton()}
            </div>
            <div className='panelChat ocultar' id='panelChat'>
                <div className='divNameUser'>
                    <div id="labelNameUser"></div>
                    <div id="divOnline" className='ocultar'>
                        <div id='online'></div>
                        Online
                    </div>
                    <div id="divOffline" className='ocultar'>
                        <div id='offline'></div>
                        Offline
                    </div>
                </div>
                <div className='chat'>
                    {doMessage()}
                    <div ref={divRef} id="idRef"></div>
                </div>
                <div className='formIntent'>
                    <form onSubmit={submit}>
                        <label htmlFor='' id="labelMessage">Escriba su mensaje</label>
                        <input className='inputMessage' value={mensaje} onChange={e => setMensaje(e.target.value)}></input>
                        <button className='butSend'><i className="fa-solid fa-paper-plane send fa-xl"></i></button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default Chat