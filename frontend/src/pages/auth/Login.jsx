import React from 'react'
import './auth.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="auth-name">
      <div className="auth-form">
        <h2>Login</h2>
        <form>
          <label htmlFor="email">E-mail</label>
          <input type="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" required />

          <button className='common-btn'>Login</button>
        </form>

        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login