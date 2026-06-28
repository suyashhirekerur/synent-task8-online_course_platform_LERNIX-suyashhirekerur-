import React from 'react'
import './account.css';
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/User.jsx"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Account = (user) => {
    const { setIsAuth, setUser } = UserData();

    const navigate = useNavigate();

    const logoutHandler = ()=> {
        localStorage.clear();
        setUser([])
        setIsAuth(false)
        toast.success("Logged Out")
        navigate("/login");
    }
    return (
        <div>
            {user && (
                <div className="profile">
                    <div className="profile-info">
                        <p>
                            <strong>Name - {user.name}</strong>
                        </p>
                        <p>
                            <strong>Email - {user.email}</strong>
                        </p>

                        <button className="common-btn">
                            <RiDashboardHorizontalFill />
                            Dashboard
                        </button>
                        <br />
                        <button onClick={logoutHandler} className="common-btn" style={{ background: "red" }}>
                            <IoMdLogOut />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Account