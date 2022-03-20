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
    const [receptor, setReceptor] = useState('')
    const divRef = useRef(null)

    useEffect(() => {
        socket.emit('conectado', nombre)
    }, [nombre])

    useEffect(() => {
        socket.on('ConectarUser', (nombre) => {
            console.log('1')
            if(receptor === nombre) {
                console.log('2')
                document.getElementById("offline").classList.add("ocultar");
                document.getElementById("online").classList.add("mostrar");
            }
        })

        return () => {socket.off()}
    }, [nombre])

    useEffect(() => {
        socket.on('DesonectarUser', (nombre) => {
            if(receptor === nombre) {
                document.getElementById("online").classList.add("ocultar");
                document.getElementById("offline").classList.add("mostrar");
            }
        })

        return () => {socket.off()}
    }, [nombre])

    useEffect(() => {
        socket.on('mensajes', () => {
            getMensajesOnePerson(receptor)
        })

        return () => {socket.off()}
    }, [mensajes])

    useEffect( ()=>{
        getMensajes()
    },[])

    //procedimineto para obtener todos los usuarios
    const getMensajes = async () => {
        const res2 = await axios.get(URI+"fecha")
        setMensajesDESC(res2.data)
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

    const getMensajesOnePerson = async (rec) => {
        if(receptor !== '') {
            const res = await axios.get(URI+'nombre_usuario_receptor/'+rec+"/"+nombre)
            setMensajes(res.data)
            const res2 = await axios.get(URI+'fecha')
            setMensajesDESC(res2.data)
            document.getElementById("panelChat").classList.add("mostrar");
        }
    }

    async function showChat(rec){
        setReceptor(rec)
        document.getElementById('labelNameUser').innerHTML=rec
        getMensajesOnePerson(rec)
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
        })

        return (message)
    }
    
    return (
        <div className='panelPrincipal'>
            <div className='panelUsersChat'>
                {doButton()}
            </div>
            <div className='panelChat ocultar' id='panelChat'>
                <div className='divNameUser'><div id="labelNameUser"></div><div className='ocultar' id='online'></div><div id='offline'></div></div>
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