import axios from 'axios'
import { useState } from "react"
import {useNavigate } from 'react-router-dom'
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
        await axios.post(URI, {nombre: u, email: m, password: p})
        navigate('/')
    }

    return (
        <div className="signup">
        <h1>Sign Up</h1>
        <form onSubmit={store}>
            <input type="text" value={u} onChange={ (e) => setNombre(e.target.value)} placeholder="Username" size='15' required="required" />
            <input type="text" value={m} onChange={ (e) => setEmail(e.target.value)} placeholder="Email" size='50' required="required" />
            <input type="password" value={p} onChange={ (e) => setPassword(e.target.value)} placeholder="Password" size='15' required="required" />
            <input type="password" value={rp} onChange={ (e) => setRPassword(e.target.value)} placeholder="Repeat password" size='15' required="required" />

            <nav className="botones" style={{ marginTop: '5px'}}>
                <button style={{marginRight: '10px'}}  type="submit" className="btn">Sign Up</button>
                <button style={{ marginLeft: '10px' }} type="submit" className="btn" 
                    onClick={() => navigate('/') }
                > Back</button>
                
            </nav>
            
        </form>
        </div>
    )
}

export default Signup