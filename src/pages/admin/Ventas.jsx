import React from 'react'
import { Link } from 'react-router-dom';
import './Ventas.css'
const Ventas = () => {
    let currentDate = new Date();
    let dateFormated = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
    let ventas = [
        {
            nombre: "mouse",
            valor: "1200",
            cantidad: 2,
            fecha: dateFormated
        },
        {
            nombre: "mx master 3",
            valor: "300",
            cantidad: 7,
            fecha: dateFormated
        },
        {
            nombre: "mx anywhere",
            valor: "400",
            cantidad: 26,
            fecha: dateFormated
        },
        {
            nombre: "otro tecladito",
            valor: "500",
            cantidad: 1,
            fecha: dateFormated
        }
    ]



    return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
                rel="stylesheet" />
            <div className="flex items-center justify-center min-h-screen min-w-full bg-gray-900">
                <div className="col-span-12">
                    <div className="overflow-auto lg:overflow-visible ">
                        <table className="table text-gray-400 border-separate space-y-6 text-sm">
                            <thead className="bg-gray-800 text-gray-100">
                                <tr>
                                    <th className="p-3">Nombre</th>
                                    <th className="p-3 text-left">Valor</th>
                                    <th className="p-3 text-left">Cantidad</th>
                                    <th className="p-3 text-left">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ventas.map(venta => {
                                    return <TableItem nombre={venta.nombre} valor={venta.valor} cantidad={venta.cantidad} fecha={venta.fecha} />
                                })}
                            </tbody>
                        </table>
                        <Link to="/admin/crear-venta">
                            <button class="p-2 pl-5 pr-5 bg-green-300 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300">Agregar Venta</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

const TableItem = ({ nombre, valor, cantidad, fecha }) => {
    return (<tr className="bg-gray-800 text-gray-100">
        <td className="p-3">
            <div className="flex align-items-center">
                <div >{nombre}</div>
            </div>
        </td>
        <td className="p-3">
            {valor}$
        </td>
        <td className="p-3 font-bold">
            {cantidad}
        </td>
        <td className="p-3">
            {fecha}
        </td>
    </tr>
    );
};

export default Ventas
