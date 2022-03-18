import axios from 'axios'
import { useState } from "react"
import {useNavigate } from 'react-router-dom'
import validator from 'validator'
import React from 'react'
import './signup.css'



const URI = 'http://localhost:8000/users'

const Signup = () => {

    const [u, setNombre] = useState('');
    const [m, setEmail] = useState('');
    const [p, setPassword] = useState('');
    const [rp, setRPassword] = useState('');
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()

        if(!validator.isEmail(m)){
            document.getElementById("errorm").classList.add("mostrar"); 
        }else if(p!==rp){
            document.getElementById("error").classList.add("mostrar"); 
        }else{
            await axios.post(URI, {nombre: u, email: m, password: p})
            document.getElementById("success").classList.add("mostrar");
        }
            
    }

    function volver() {
    
        document.getElementById("errorm").classList.remove("mostrar");
        document.getElementById("error").classList.remove("mostrar");
        document.getElementById("success").classList.remove("mostrar");
        navigate('/')
    }

    function cerrar() {
        document.getElementById("error").classList.remove("mostrar");
       
    }

    function cerrars(){
        document.getElementById("success").classList.remove("mostrar");
    }

    function cerrarm(){
        document.getElementById("errorm").classList.remove("mostrar");
    }


    

    return (
        <div className="signup">
        <h1>Sign Up</h1>
        <form onSubmit={store}>
            <input type="text" value={u} onChange={ (e) => setNombre(e.target.value)} placeholder="Username" minLength='6' size='15' required="required" />
            <input type="text" value={m} onChange={ (e) => setEmail(e.target.value)} placeholder="Email" size='50' required="required" />
            <input type="password" value={p} onChange={ (e) => setPassword(e.target.value)} placeholder="Password" minLength='6' size='15' required="required" />
            <input type="password" value={rp} onChange={ (e) => setRPassword(e.target.value)} placeholder="Repeat password" minLength='6' size='15' required="required" />

            <nav className="botones" style={{ marginTop: '5px'}}>
                <button style={{marginRight: '10px'}}  type="submit" className="btn">Sign Up</button>
                <button style={{ marginLeft: '10px' }} type="submit" className="btn" 
                    onClick={() => volver() }
                > Back</button>
                
            </nav>
            <div id="error" className="alert alert-danger ocultar" role="alert">
                <span id="closebtn" className="closebtn" onClick={ cerrar} >&times;</span>
                Las Contraseñas no coinciden.
            </div>
            <div id="errorm" className="alert alert-danger ocultar" role="alert">
                <span id="closebtnm" className="closebtn" onClick={ cerrarm} >&times;</span>
                Formato de email incorrecto.
            </div>
            <div id="success" className="alert alert-success ocultar" role="alert">
                <span id="closebtns" className="closebtn" onClick={ cerrars} >&times;</span>
                Usuario creado con éxito.
                </div>
            
        </form>
        </div>
    )
}

export default Signup