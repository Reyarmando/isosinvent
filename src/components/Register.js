import { useState } from "react"
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { Link } from "react-router-dom";
import logoisos from '../imgs/logo-isos.png';

export function Register() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { signup } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const handleChange = ({target:{name,value}}) =>
        setUser({...user, [name]: value})


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signup(user.email, user.password)
            navigate("/")
        } catch (error) {
            console.log(error.code)
            if (error.code === "auth/weak-password") {
                setError('Contraseña necesita mas de 6 caracteres')
            }else{
                setError(error.message)
            }
        }
    }

    return (
        <div className="w-full max-w-xs m-auto">
        {error && <Alert message={error}/>}
            <form onSubmit={handleSubmit} className="bg-white
            shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
                <div className="flex justify-center">
                    <img src={logoisos} alt="logo-isos" className="w-auto h-40"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-black
                    text-md font-bold my-2">E-mail</label>
                    <input type="email"
                        name="email"
                        placeholder="youremail@email.com"
                        className="border rounded-md shadow appearance-none
                        w-full py-2 px 3 text-gray-700 leading-tight
                        focus:outline-none focus:shadow-outline"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-black
                    text-md font-bold my-2">Password</label>
                    <input type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        className="border rounded-md shadow appearance-none
                        w-full py-2 px 3 text-gray-700 leading-tight
                        focus:outline-none focus:shadow-outline"
                        onChange={handleChange}
                    />
                </div>
                <button
                className="bg-blue-600 hover:bg-blue-800
                text-white text-sm font-bold py-2 px-4 rounded-md
                focus:outline-none focus:shadow-outline w-full">Register</button>
            </form>
            <p className="my-4 text-md flex justify-between
                px-3">Ready you have an account?
                <Link to='/login' className="font-bold">Login</Link></p>
        </div>
    )
}

