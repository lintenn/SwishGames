import {useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './login.css'



const URI = 'http://localhost:8000/users'

const Login = () => {

    const [u, setNombre] = useState('');
    const [p, setPassword] = useState('');
    const [users, setUsers] = useState('');
    const navigate = useNavigate()

    useEffect( ()=>{
        getUsers()
    },[])

    //procedimineto para obtener todos los usuarios
    const getUsers = async () => {
        const res = await axios.get(URI)
        setUsers(res.data)
        
    }

    function comprobarUser(){
        users.map((user) =>{
            if(user.nombre==u && user.password==p)
                navigate('/main')
        })
    }

    return (
        <div className="login" id="login" >
        <h1>Log In</h1>
        <form method="post">
            <input type="text" value={u} onChange={ (e) => setNombre(e.target.value)} placeholder="Username" required="required" />
            <input type="password" value={p} onChange={ (e) => setPassword(e.target.value)} placeholder="Password" required="required" />
            <nav className="botones" style={{ marginTop: '5px' }}>
                <button style={{ marginRight: '10px'}}  type="submit" className="btn"
                    onClick={() => comprobarUser()}    
                >Log In</button>
                <button style={{ marginLeft: '10px' }} type="submit" className="btn" 
                    onClick={() => navigate('/signup/') }
                > Register</button>
            </nav>
            <br/>
            <nav className="remember">
                <input style={{marginRight: '5px'}} type="checkbox" value="lsRememberMe" id="remember_me"></input>
                <label style={{marginBottom:'10px'}} forhtml="rememberMe">Remember me</label>
            </nav>
            
            <section className="recovery" >
                <Link to={'/recovery/'} > <u>Forgot your password?</u></Link>  
            </section>
            
        </form>
    </div>
    )
}

export default Login