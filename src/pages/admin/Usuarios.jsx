import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import './Main.css'

const Usuarios = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const ObtenerUsuarios = async () => {
            const options = {
                method: 'GET',
                url: ' https://api.appery.io/rest/1/db/collections/Usuarios/',
                headers: { "X-Appery-Database-Id": "615884472e22d70eed30f6a8", "Content-Type": "application/json" }
            };
            await axios
                .request(options)
                .then(function (response) {
                    setUsuarios(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
        };

        //obtener lista de vehículos desde el backend
        if (mostrarTabla) {
            ObtenerUsuarios();
        }
    }, [mostrarTabla]);


    return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
                rel="stylesheet" />
            <div className="flex-row items-center justify-center min-h-screen min-w-full px-5 py-12 lg:px-20 bg-gray-900">
                <div className="">
                    <div class="flex items-center max-w-md mx-auto bg-white rounded-full " x-data="{ search: '' }">
                        <div class="w-full">
                            <input type="search" class="w-full px-4 py-1 text-gray-900 rounded-full focus:outline-none"
                                placeholder="Search" x-model="search" />
                        </div>
                        <div>
                            <button type="submit" class="bg-green-300 flex items-center justify-center w-12 h-12 text-gray-100 rounded-full">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-green-300 mt-9 font-semibold">
                    <h1 className="text-5xl">Usuarios</h1>
                </div>
                <div className="flex items-center">
                    <div className="overflow-auto lg:overflow-visible h-full w-full items-center">
                        <div className="flex w-full justify-center items-center ">
                            <table className="table usuarios text-gray-400 border-separate space-y-6 text-sm">
                                <thead className="bg-gray-800 text-gray-100">
                                    <tr>
                                        <th className="p-3 items-center justify-center ">Id</th>
                                        <th className="p-3 items-center justify-center ">Nombre</th>
                                        <th className="p-3 items-center justify-center ">Usuario</th>
                                        <th className="p-3 items-center justify-center ">Rol</th>
                                        <th className="p-3 items-center justify-center ">Estado</th>
                                        <th className="p-3 items-center justify-center ">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map(user => {
                                        return <TableItem
                                            Id={user._id}
                                            nombre={user.Nombre}
                                            userName={user.userName}
                                            rol={user.Rol}
                                            estado={user.Estado} />
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Link to="/admin/crear-venta">
                                <button className="mt-5 p-2 pl-5 pr-5 bg-green-300 text-gray-800 hover:bg-green-800 hover:text-gray-200 text-lg rounded-lg focus:border-4 border-blue-300">Agregar Usuario</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

const TableItem = ({ Id, nombre, userName, rol, estado }) => {
    return (
        <tr className="bg-gray-800 text-gray-100">
            <td className="p-3 justify-center items-center">

                <div >{Id}</div>

            </td>
            <td className="p-3 justify-center items-center">

                <div >{nombre}</div>

            </td>
            <td className="p-3 justify-center items-center">

                <div >{userName}</div>

            </td>
            <td className="p-3 justify-center items-center">
                {rol}
            </td>
            <td className="p-3 justify-center items-center font-bold">

                {estado}

            </td>
            <td className="p-3 justify-center items-center">
                <Link to={`/admin/detalle-usuario/${Id}`} >
                    <i class='bx bx-edit-alt' aria-label="Editar"></i>
                </Link>
            </td>
        </tr>
    );
};


export default Usuarios
