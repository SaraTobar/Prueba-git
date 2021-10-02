import React from 'react'
import { Link } from 'react-router-dom'
const Admin = ({ children }) => {
    return (

        <div className="flex w-screen h-screen">
            <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
            <div className="flex flex-col md:flex-row flex-nowrap h-full ">
                <div className="min-h-screen flex flex-col bg-gray-100">
                    <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
                        <div className="flex items-center justify-center h-20 shadow-md">
                            <h1 className="text-3xl uppercase text-indigo-500">Logo</h1>
                        </div>
                        <ul className="flex flex-col py-4">
                            <li>
                                <Link to="/admin/ventas" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-shopping-bag"></i></span>
                                    <span className="text-sm font-medium">Ventas</span>
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-music"></i></span>
                                    <span className="text-sm font-medium">Music</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-drink"></i></span>
                                    <span className="text-sm font-medium">Drink</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-shopping-bag"></i></span>
                                    <span className="text-sm font-medium">Shopping</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-chat"></i></span>
                                    <span className="text-sm font-medium">Chat</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-user"></i></span>
                                    <span className="text-sm font-medium">Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
                                    <span className="text-sm font-medium">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className="flex  w-full flex-col items-stretch justify-start bg-gray-100">
                {children}
            </div>
        </div>
    )
}

export default Admin
