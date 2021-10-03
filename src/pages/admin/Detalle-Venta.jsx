import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const DetalleVenta = () => {
  const [valor, setValor] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [total, setTotal] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [ventas, setVentas] = useState([]);
  const [idCliente, setIdCliente] = useState(0);
  const [nomcliente, setNomcliente] = useState(0);

  const [mostrarTabla, setMostrarTabla] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    const ObtenerVenta = async () => {
      const options = {
        method: "GET",
        url: `https://api.appery.io/rest/1/db/collections/Ventas/${id}`,
        headers: {
          "X-Appery-Database-Id": "615884472e22d70eed30f6a8",
          "Content-Type": "application/json",
        },
      };
      await axios
        .request(options)
        .then(function (response) {
          // response.data
          console.log(response);
          console.log(response.data.Fecha.split("T")[0]);
          setVentas(response.data);
          setNombre(response.data.Name);
          setCantidad(response.data.Quantity);
          setValor(response.data.ValuePerUnit);
          setFecha(response.data.Fecha.split("T")[0]);
          setTotal(response.data.Total);
          setIdCliente(response.data.IdCliente)
          setNomcliente(response.data.NombreCliente)
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    if (mostrarTabla) {
      ObtenerVenta();
    }
  }, [mostrarTabla]);

  const guardar = async () => {
    const options = {
      method: "PUT",
      url: `https://api.appery.io/rest/1/db/collections/Ventas/${id}`,
      headers: {
        "X-Appery-Database-Id": "615884472e22d70eed30f6a8",
        "Content-Type": "application/json",
      },
      data: {
        Nombre: nombre,
        Quantity: cantidad,
        ValuePerUnit: valor,
        Fecha: fecha,
        Total: total,
        NombreCliente: nomcliente,
        IdCliente: idCliente

      },
    };

    await axios
      .request(options)
      .then(function (response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Venta Modificada con exito",
          showConfirmButton: false,
          timer: 2500,
        }).then((x) => {});
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div>
      <div className="flex-row items-center justify-center min-h-screen min-w-full px-5 py-12 lg:px-20 bg-gray-900">
        <div className="flex-col w-full text-green-400 text-3xl font-bold ">
          {" "}
          Venta: {id}
        </div>
        <div className="flex-col w-full ">
          <form className="flex flex-col w-full p-10 px-8 pt-6 mx-auto my-6 mb-4 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-1/2 ">
            <div className="relative pt-4">
              <label
                for="name"
                className="text-base leading-7 text-blueGray-500 font-semibold"
              >
                Nombre del Producto
              </label>
              <input
                required
                value={nombre}
                onChange={(x) => {
                  setNombre(x.target.value);
                }}
                type="text"
                id="name"
                name="name"
                placeholder="nombre "
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
                value={valor}
                onChange={(x) => {
                  setValor(x.target.value);
                }}
                type="number"
                id="number"
                name="number"
                placeholder="numero"
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
              />
            </div>
            <div className="relative pt-4">
              <label
                for="name"
                className="text-base leading-7 text-blueGray-500 font-semibold"
              >
                Fecha de venta
              </label>
              <input
                required
                value={fecha}
                onChange={(x) => {
                  setFecha(x.target.value);
                }}
                type="date"
                id="date"
                name="date"
                placeholder="Fecha"
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
              />
            </div>
            <div className="relative pt-4">
              <label
                for="name"
                className="text-base leading-7 text-blueGray-500 font-semibold"
              >
                Id Cliente
              </label>
              <input
                required
                value={idCliente}
                onChange={(x) => {
                  setIdCliente(x.target.value);
                }}
                type="number"
                id="id cliente"
                name="date"
                placeholder="Id cliente"
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
              />
            </div>

            <div className="relative pt-4">
              <label
                for="name"
                className="text-base leading-7 text-blueGray-500 font-semibold"
              >
                Nombre Ciente
              </label>
              <input
                required
                value={nomcliente}
                onChange={(x) => {
                  setNomcliente(x.target.value);
                }}
                type="text"
                id="Nombre Cliente"
                name="date"
                placeholder="Nombre Cliente"
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
              />
            </div>

            <div className="relative pt-4">
              <label
                for="name"
                className="text-base leading-7 text-blueGray-500 m-4 font-semibold"
              >
                Cantidad
              </label>
              <input
                required
                value={cantidad}
                type="range"
                defaultValue={1}
                min={1}
                max={10}
                onChange={(x) => {
                  setCantidad(x.target.value);
                }}
                className="w-full px-0 py-2 mt-2 mr-4 text-base  
                        text-green-600 
                        transition duration-500 
                        ease-in-out transform rounded-lg 
                        bg-green-600 "
              />
              <span>{cantidad}</span>
            </div>
            <div className="flex flex-wrap mt-4 mb-6 -mx-3">
              <div className="w-full px-3">
                <label
                  className="text-base leading-7 text-blueGray-500 font-semibold "
                  for="description"
                >
                  Total de la venta:{" "}
                </label>
                <span>{`$ ${cantidad * valor} USD`}</span>
              </div>
            </div>

            <div className="flex items-center w-full pt-4 mb-4 font-semibold">
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
    </div>
  );
};

export default DetalleVenta;
