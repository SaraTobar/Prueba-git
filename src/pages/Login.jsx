import React from 'react'
import './Login.css';
import { Link } from 'react-router-dom'


const Login = () => {
    return (
        <div className="min-h-screen bg-cover bg-center img-logi" >
            <div className="flex justify-end ">
                <div className="bg-white min-h-screen w-1/3 flex justify-center items-center bg-logi">
                    <div>
                        <div>
                            <span className="text-sm text-gray-900">Bienvenido </span>
                            <h1 className="text-2xl font-bold">Inicie sesión</h1>
                        </div>
                        <div className="my-3">
                            <label className="block text-md mb-2" htmlFor="email">Correo</label>
                            <input required className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="password" placeholder="Correo" />
                        </div>
                        <div className="mt-5">
                            <label className="block text-md mb-2" htmlFor="password">Contraseña</label>
                            <input required className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" placeholder="Contraseña" />
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-blue-700 hover:underline cursor-pointer">Recordar Contraseña?</span>
                        </div>
                        <div>
                            <Link to='/admin'>
                                <button className="mt-4 mb-3 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">
                                    Inicia sesión </button>
                            </Link>
                            <div className="flex space-x-3 justify-center items-end bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">

                                <img className=" h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png" alt="" />
                                <button >Continua con Google</button>
                            </div>
                        </div>

                        {/* <p className="mt-8"> Dont have an account? <span className="cursor-pointer text-sm text-blue-600"> Join free today</span></p> */}
                    </div>
                </div>
            </div >
        </div >
    )
}



export default Login
