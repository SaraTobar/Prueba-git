import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./Main.css";
import _, { filter } from "underscore";
import { Dialog, Tooltip } from '@material-ui/core';

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (mostrarTabla) {
      ObtenerProductos();
    }
  }, [mostrarTabla]);

  const ObtenerProductos = async () => {
    const options = {
      method: "GET",
      url: "https://api.appery.io/rest/1/db/collections/Productos/",
      headers: {
        "X-Appery-Database-Id": "615884472e22d70eed30f6a8",
        "Content-Type": "application/json",
      },
    };
    await axios
      .request(options)
      .then(function (response) {
        setProductos(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const aplicarFiltro = (filtro) => {
    var filtered = _(productos).filter((p) => {
      return (
        p._id.toLowerCase().includes(filtro.toLowerCase()) ||
        p.Descripcion.toLowerCase().includes(filtro.toLowerCase())
      );
    });

    setProductos(filtered);
    console.log(filtered);
  };

  const limpiarFiltro = () => {
    ObtenerProductos();
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
            className="flex items-center max-w-md mx-auto bg-white rounded-full "
            x-data="{ search: '' }"
          >
            <div className="w-full">
              <input
                type="search"
                onChange={(x) => {
                  aplicarFiltro(x.target.value);
                  if (x.target.value.length == 0) {
                    limpiarFiltro();
                  }
                }}
                className="w-full px-4 py-1 text-gray-900 rounded-full focus:outline-none"
                placeholder="Search"
                x-model="search"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-green-300 flex items-center justify-center w-12 h-12 text-gray-100 rounded-full"
              >
                <svg
                  className="w-5 h-5"
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
          <h1 className="text-5xl font-semibold">Productos</h1>
        </div>
        <div className="flex items-center">
          <div className="overflow-auto lg:overflow-visible h-full w-full items-center">
            <div className="flex w-full justify-center items-center ">
              <table className="table productos text-gray-400 border-separate space-y-6 text-sm">
                <thead className="bg-gray-800 text-gray-100">
                  <tr>
                    <th className="p-3">Id</th>
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Descripcion</th>
                    <th className="p-3 text-left">Valor</th>
                    <th className="p-3 text-left">Inventario</th>
                    <th className="p-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => {
                    return (
                      <TableItem
                        key={prod._id}
                        Id={prod._id}
                        nombre={prod.Nombre}
                        desc={prod.Descripcion}
                        valor={prod.Valor}
                        inventario={prod.inventario}
                        refresh={ObtenerProductos}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <Link to="/admin/crear-producto">
                <button className=" mt-5 p-2 pl-5 pr-5 bg-green-300 text-gray-800 hover:bg-green-800 hover:text-gray-200 text-lg rounded-lg focus:border-4 border-blue-300">
                  Agregar Producto
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableItem = ({ nombre, valor, inventario, desc, Id, refresh }) => {
  const borrarItem = async () => {
    Swal.fire({
      title: `Estas seguro de borrar el producto ${nombre}?`,
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
          url: `https://api.appery.io/rest/1/db/collections/Productos/${Id}`,
          headers: {
            "X-Appery-Database-Id": "615884472e22d70eed30f6a8",
            "Content-Type": "application/json",
          },
        };
        await axios
          .request(options)
          .then(function (response) {
            Swal.fire("Borrado!", "Tu producto ha sido borrado", "success").then(
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
      <td className="p-3">
        <div className="flex align-items-center">
          <div>{Id}</div>
        </div>
      </td>
      <td className="p-3">
        <div className="flex align-items-center">
          <div>{nombre}</div>
        </div>
      </td>
      <td className="p-3">
        <div className="flex align-items-center">
          <div>{desc}</div>
        </div>
      </td>
      <td className="p-3">$ {valor}</td>
      <td className="p-3 font-bold">{inventario}</td>

      <td className="p-3">
        <Tooltip title='Editar Producto' arrow>
        <Link to={`/admin/detalle-producto/${Id}`}>
          <i className="bx bx-edit-alt hover:text-yellow-300" aria-label="Editar"></i>
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

export default Productos;
