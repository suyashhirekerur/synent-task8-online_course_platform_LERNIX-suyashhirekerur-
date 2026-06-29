import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { server } from "../config";
import { toast, Toaster } from 'react-hot-toast'
import { useEffect } from "react";

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fallbackTimer = setTimeout(() => {
            if (!cancelled) {
                setIsAuth(false);
                setUser(null);
                setloading(false);
            }
        }, 1500);

        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("No token found");
                }

                await axios.get(`${server}/api/user/me`, {
                    headers: {
                        token,
                    },
                    timeout: 3000,
                });

                if (!cancelled) {
                    setIsAuth(true);
                    setUser(true);
                    setloading(false);
                }
            } catch (error) {
                console.log(error);
                if (!cancelled) {
                    setIsAuth(false);
                    setUser(null);
                    setloading(false);
                }
            } finally {
                if (!cancelled) {
                    clearTimeout(fallbackTimer);
                }
            }
        };

        fetchUser();

        return () => {
            cancelled = true;
            clearTimeout(fallbackTimer);
        };
    }, []);

    async function loginUser(email, password, navigate) {
        setBtnLoading(true)
        try {
            const { data } = await axios.post(`${server}/api/user/login`, { email, password })

            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
        } catch (error) {
            setBtnLoading(false);
            setIsAuth(false);
            toast.error(error.response.data.message);
        }
    }

    async function registerUser(name, email, password, navigate) {
        setBtnLoading(true)
        try {
            const { data } = await axios.post(`${server}/api/user/register`, { name, email, password })

            toast.success(data.message);
            localStorage.setItem("activationToken", data.activationToken);
            setBtnLoading(false);
            navigate("/verify");
        } catch (error) {
            setBtnLoading(false);
            toast.error(error.response.data.message);
        }
    }

    async function verifyOtp(otp) {

        setBtnLoading(true)
        const activationToken = localStorage.getItem("activationToken");
        try {
            const { data } = await axios.post(`${server}/api/user/verify`, { otp, activationToken, });

            toast.success(data.message);
            navigate("/login");
            setBtnLoading(false);
            localStorage.clear();
            setBtnLoading(false);
        } catch (error) {
            setBtnLoading(false);
            toast.error(error.response.data.message);
        }
    }

    return <UserContext.Provider value={{ user, setUser, setIsAuth, isAuth, loginUser, btnLoading, loading, registerUser, verifyOtp, }}>
        {children}
        <Toaster />
    </UserContext.Provider>
}



export const UserData = () => useContext(UserContext);