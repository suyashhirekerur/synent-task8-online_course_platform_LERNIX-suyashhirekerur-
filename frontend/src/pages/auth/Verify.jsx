import React, { useState } from 'react'
import './auth.css';
import { Link } from 'react-router-dom';


const Verify = () => {
  const [otp, setOtp] = useState("");
  const {btnLoading, verifyOtp} = UserData();
  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
    
  }
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">Enter OTP</label>
          <input type="number" value={otp} onChange={e=>setOtp(e.target.value)
          } required />
          <button disabled={btnLoading} type="submit" className='common-btn'>
            {btnLoading ? "Please Wait..." : "Verify"}
          </button>
        </form>
        <p>
          Go to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  )
}

export default Verify