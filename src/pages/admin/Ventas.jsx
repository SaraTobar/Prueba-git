import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./Main.css";
import { Dialog, Tooltip } from '@material-ui/core';
import _, { filter } from "underscore";

const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ventas, setVentas] = useState([]);

  const ObtenerVentas = async () => {
    const options = {
      method: "GET",
      url: "https://api.appery.io/rest/1/db/collections/Ventas/",
      headers: {
        "X-Appery-Database-Id": "615884472e22d70eed30f6a8",
        "Content-Type": "application/json",
      },
    };
    await axios
      .request(options)
      .then(function (response) {
        setVentas(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    //obtener lista de vehículos desde el backend
    if (mostrarTabla) {
      ObtenerVentas();
    }
  }, [mostrarTabla]);

  const aplicarFiltro = (filtro) => {
    var filtered = _(ventas).filter((p) => {
      return (
        p.NombreCliente.toLowerCase().includes(filtro.toLowerCase()) ||
        p.IdCliente.toLowerCase().includes(filtro.toLowerCase())
      );
    });

    setVentas(filtered);
    console.log(filtered);
  };

  const limpiarFiltro = () => {
    ObtenerVentas();
  };
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      />
      <div className="space-x-2 p-10 flex-row items-center justify-center min-h-screen min-w-full bg-gray-900">
        <div className="">
          <div
            class="flex items-center max-w-md mx-auto bg-white rounded-full "
            x-data="{ search: '' }"
          >
            <div class="w-full">
              <input
                type="search"
                onChange={(x) => {
                  aplicarFiltro(x.target.value);
                  if (x.target.value.length == 0) {
                    limpiarFiltro();
                  }
                }}
                class="w-full px-4 py-1 text-gray-900 rounded-full focus:outline-none"
                placeholder="Search"
                x-model="search"
              />
            </div>
            <div>
              <button
                type="submit"
                class="bg-green-300 flex items-center justify-center w-12 h-12 text-gray-100 rounded-full"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="text-green-300 mt-9">
          <h1 className="text-5xl font-semibold">Ventas</h1>
        </div>
        <div className="flex items-center">
          <div className="overflow-auto lg:overflow-visible h-full w-full items-center">
            <div className="flex w-full justify-center items-center ">
              <table className="table ventas text-gray-400 border-separate space-y-6 text-sm">
                <thead className="bg-gray-800 text-gray-100">
                  <tr>
                    <th className="p-3 items-center justify-center ">
                      Id Cliente
                    </th>
                    <th className="p-3 items-center justify-center ">
                      Nombre Cliente
                    </th>
                    <th className="p-3 items-center justify-center ">Nombre</th>
                    <th className="p-3 items-center justify-center ">Valor</th>
                    <th className="p-3 items-center justify-center ">
                      Cantidad
                    </th>
                    <th className="p-3 items-center justify-center ">
                      Total de venta
                    </th>
                    <th className="p-3 items-center justify-center ">Fecha</th>
                    <th className="p-3 items-center justify-center ">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map((venta) => {
                    return (
                      <TableItem
                        IdCliente={venta.IdCliente}
                        nombreCliente={venta.NombreCliente}
                        nombre={venta.Name}
                        valor={venta.ValuePerUnit}
                        cantidad={venta.Quantity}
                        fecha={venta._createdAt}
                        total={venta.ValuePerUnit * venta.Quantity}
                        id={venta._id}
                        refresh={ObtenerVentas}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <Link to="/admin/crear-venta">
                <button className=" mt-5 p-2 pl-5 pr-5 bg-green-300 text-gray-800 hover:bg-green-800 hover:text-gray-200 text-lg rounded-lg focus:border-4 border-blue-300">
                  Agregar Venta
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableItem = ({
  nombre,
  valor,
  cantidad,
  fecha,
  IdCliente,
  nombreCliente,
  total,
  id,
  refresh
}) => {
  const borrarItem = async () => {
    Swal.fire({
      title: `Estas seguro de borrar la venta de ${nombreCliente}?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
      showLoaderOnConfirm: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const options = {
          method: "DELETE",
          url: `https://api.appery.io/rest/1/db/collections/Ventas/${id}`,
          headers: {
            "X-Appery-Database-Id": "615884472e22d70eed30f6a8",
            "Content-Type": "application/json",
          },
        };
        await axios
          .request(options)
          .then(function (response) {
            Swal.fire("Borrado!", "Tu venta ha sido borrada", "success").then(
              (x) => {
                refresh();
              }
            );
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
  };

  return (
    <tr className="bg-gray-800 text-gray-100">
      <td className="p-3 justify-center items-center">
        <div>{IdCliente}</div>
      </td>
      <td className="p-3 justify-center items-center">
        <div>{nombreCliente}</div>
      </td>
      <td className="p-3 justify-center items-center">
        <div>{nombre}</div>
      </td>
      <td className="p-3 justify-center items-center">$ {valor}</td>
      <td className="p-3 justify-center items-center font-bold">{cantidad}</td>
      <td className="p-3 justify-center items-center font-bold">
        <strong>$ {total}</strong>
      </td>
      <td className="p-3 justify-center items-center">{fecha}</td>
      <td className="p-3 justify-center items-center">
      <Tooltip title='Editar Producto' arrow>
        <Link to={`/admin/detalle-venta/${id}`}>
          <i class="bx bx-edit-alt hover:text-yellow-300" aria-label="Editar"></i>
        </Link>
        </Tooltip>
        <Tooltip title='Borrar Producto' arrow>
        <button
          className="pl-4"
          onClick={(x) => {
            borrarItem();
          }}
        >
          <i className="bx bx-trash hover:text-red-600"></i>
        </button>
        </Tooltip>
      </td>
    </tr>
  );
};

export default Ventas;
