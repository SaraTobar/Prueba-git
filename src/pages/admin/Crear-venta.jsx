import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CrearVenta = () => {
  const [nroItems, setnroItems] = useState(0);
  const [valor, setvalor] = useState(0);
  const [nombre, setnombre] = useState(0);
  const [fecha, setfecha] = useState(0);
  const [idCliente, setIdCliente] = useState(0);
  const [nomcliente, setNomcliente] = useState(0);

  // const [textoBoton, setTextoBoton] = useState('Crear Nuevo Vehículo');
  // const [colorBoton, setColorBoton] = useState('indigo');
  const guardar = async () => {
    const options = {
      method: "POST",
      url: "https://api.appery.io/rest/1/db/collections/Ventas/",
      headers: {
        "X-Appery-Database-Id": "615884472e22d70eed30f6a8",
        "Content-Type": "application/json",
      },
      data: {
        Name: nombre,
        Quantity: nroItems,
        ValuePerUnit: valor,
        Fecha: fecha,
        Total: nroItems * valor,
        NombreCliente: nomcliente,
        IdCliente: idCliente,
      },
    };
    console.log(options);
    await axios
      .request(options)
      .then(function (response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Venta guardada con exito",
          showConfirmButton: false,
          timer: 3000,
        }).then((x) => {});
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="flex-row items-center justify-center min-h-screen min-w-full px-5 py-12 lg:px-20 bg-gray-900">
      <div className="flex-col w-full text-green-400 text-3xl font-bold ">
        Registrar Ventas
      </div>
      <div className="flex-col w-full ">
        <form className="flex flex-col w-full p-10 px-8 pt-6 mx-auto my-6 mb-4 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-1/2">
          <div className="relative pt-4">
            <label for="name" className="text-base leading-7 text-blueGray-500 font-semibold">
              Nombre del Producto
            </label>
            <input
              required
              onChange={(x) => {
                setnombre(x.target.value);
              }}
              type="text"
              id="name"
              name="name"
              placeholder="Nombre producto"
              className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            />
          </div>
          <div className="relative pt-4">
            <label
              for="name"
              className="text-base leading-7 text-blueGray-500 text-center font-semibold"
            >
              Valor por unidad
            </label>
            <input
              required
              onChange={(x) => {
                setvalor(x.target.value);
              }}
              type="number"
              id="number"
              name="number"
              placeholder="Precio producto por unidad"
              className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            />
          </div>
          <div className="relative pt-4">
            <label for="name" className="text-base leading-7 text-blueGray-500 font-semibold">
              Fecha de venta
            </label>
            <input
              required
              onChange={(x) => {
                setfecha(x.target.value);
              }}
              type="date"
              id="date"
              name="date"
              placeholder="Fecha"
              className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            />
          </div>
          <div className="relative pt-4">
            <label for="name" className="text-base leading-7 text-blueGray-500 font-semibold">
              Identificación del cliente
            </label>
            <input
              required
              onChange={(x) => {
                setIdCliente(x.target.value);
              }}
              type="number"
              id="idCliente"
              name="idCliente"
              placeholder="Id cliente"
              className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            />
            
          </div>
          <div className="relative pt-4">
            <label for="name" className="text-base leading-7 text-blueGray-500 font-semibold">
              Nombre Cliente
            </label>
            <input
              required
              onChange={(x) => {
                setNomcliente(x.target.value);
              }}
              type="text"
              id="idCliente"
              name="idCliente"
              placeholder="Nombre Cliente"
              className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
            />
            
          </div>{" "}
          <div className="relative pt-4">
            <label
              for="name"
              className="text-base leading-7 text-blueGray-500 m-4 font-semibold"
            >
              Cantidad
            </label>
            <input
              required
              type="range"
              defaultValue={1}
              min={1}
              max={10}
              onChange={(x) => {
                setnroItems(x.target.value);
              }}
              className="w-full px-0 py-2 mt-2 mr-4 text-base  
                        text-green-600 
                        transition duration-500 
                        ease-in-out transform rounded-lg 
                        bg-green-600 "
            />
            <span>{nroItems}</span>
          </div>
          <div className="flex flex-wrap mt-4 mb-6 -mx-3">
            <div className="w-full px-3">
              <label
                className="text-base leading-7 text-blueGray-500 "
                for="description"
              >
                Total de la venta:{" "}
              </label>
              <span>{`$ ${nroItems * valor} USD`}</span>
            </div>
          </div>
          <div className="flex items-center w-full pt-4 mb-4">
            <input
              type="button"
              onClick={(x) => {
                guardar();
              }}
              className="w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-green-400  rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-green-900 "
              value={"Guardar"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearVenta;
