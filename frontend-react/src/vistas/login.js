import {useNavigate } from 'react-router-dom'
import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'



const URI = 'http://localhost:8000/users'

const Login = () => {

    const navigate = useNavigate()

    return (
        <div className="login" id="login" >
        <h1>Log In</h1>
        <form method="post">
            <input type="text" name="u" placeholder="Username" required="required" />
            <input type="password" name="p" placeholder="Password" required="required" />
            <nav className="botones" style={{ marginTop: '5px' }}>
                <button style={{ marginRight: '10px'}}  type="submit" className="btn">Log In</button>
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