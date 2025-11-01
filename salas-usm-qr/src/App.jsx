import React, { useState } from "react";

export default function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [salaSeleccionada, setSalaSeleccionada] = useState(null);
  const [reservas, setReservas] = useState([]);

  const bloques = [
    "1-2", "3-4", "5-6", "7-8", "9-10", "11-12", "13-14", "15-16"
  ];

  const salas = [
    { id: 1, nombre: "P-101", ocupados: ["3-4", "7-8"], capacidad: 40, equipamiento: "Proyector y pizarra" },
    { id: 2, nombre: "P-207", ocupados: ["1-2", "5-6", "9-10"], capacidad: 60, equipamiento: "Computadores y proyector" },
    { id: 3, nombre: "C-228", ocupados: [], capacidad: 30, equipamiento: "Pizarra blanca" },
    { id: 1, nombre: "P-319", ocupados: ["3-4", "7-8"], capacidad: 40, equipamiento: "Proyector y pizarra" },
    { id: 2, nombre: "P-407", ocupados: ["1-2", "5-6", "9-10"], capacidad: 60, equipamiento: "Computadores y proyector" },
    { id: 3, nombre: "M-103", ocupados: [], capacidad: 30, equipamiento: "Pizarra blanca" },    { id: 1, nombre: "F-101", ocupados: ["3-4", "7-8"], capacidad: 40, equipamiento: "Proyector y pizarra" },
    { id: 2, nombre: "M-301", ocupados: ["1-2", "5-6", "9-10"], capacidad: 60, equipamiento: "Computadores y proyector" },
    { id: 3, nombre: "M-104", ocupados: [], capacidad: 30, equipamiento: "Pizarra blanca" },    { id: 1, nombre: "F-101", ocupados: ["3-4", "7-8"], capacidad: 40, equipamiento: "Proyector y pizarra" },
    { id: 2, nombre: "M-204", ocupados: ["1-2", "5-6", "9-10"], capacidad: 60, equipamiento: "Computadores y proyector" },
    { id: 3, nombre: "C-225", ocupados: [], capacidad: 30, equipamiento: "Pizarra blanca" },    { id: 1, nombre: "F-101", ocupados: ["3-4", "7-8"], capacidad: 40, equipamiento: "Proyector y pizarra" },
    { id: 2, nombre: "M-102", ocupados: ["1-2", "5-6", "9-10"], capacidad: 60, equipamiento: "Computadores y proyector" },
    { id: 3, nombre: "F-106", ocupados: [], capacidad: 30, equipamiento: "Pizarra blanca" },
  ];

  const handleReservar = (sala, bloque) => {
    const nuevaReserva = {
      id: reservas.length + 1,
      sala: sala.nombre,
      bloque: bloque,
      fecha: "01/11/2025",
    };
    setReservas([...reservas, nuevaReserva]);

    setSalaSeleccionada({
      ...sala,
      ocupados: [...sala.ocupados, bloque]
    });
    alert(`Reserva confirmada para la sala ${sala.nombre}, bloque ${bloque}`);
  };

  const handleCancelar = (id) => {
    setReservas(reservas.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 max-w-sm mx-auto">
      {pantalla === "inicio" && (
        <div className="text-center mt-20">
          <h1 className="text-2xl font-bold mb-4">Salas USM QR</h1>
          <p className="text-gray-600 mb-6">Simula el escaneo de un código QR seleccionando una sala:</p>
          <div className="space-y-3">
            {salas.map((sala) => (
              <button
                key={sala.id}
                onClick={() => {
                  setSalaSeleccionada(sala);
                  setPantalla("detalle");
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700"
              >
                Escanear sala {sala.nombre}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPantalla("reservas")}
            className="mt-10 text-blue-600 underline"
          >
            Ver mis reservas
          </button>
        </div>
      )}

      {pantalla === "detalle" && salaSeleccionada && (
        <div className="mt-10 w-full">
          <button onClick={() => setPantalla("inicio")} className="text-blue-600 mb-4">← Volver</button>
          <h2 className="text-xl font-bold mb-2">Sala {salaSeleccionada.nombre}</h2>
          <p className="text-gray-600 mb-1">Capacidad: {salaSeleccionada.capacidad} personas</p>
          <p className="text-gray-600 mb-1">Equipamiento: {salaSeleccionada.equipamiento}</p>
          <p className="mt-4 text-sm font-semibold">Estado por bloques:</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {bloques.map((b) => {
              const ocupado = salaSeleccionada.ocupados.includes(b);
              return (
                <button
                  key={b}
                  disabled={ocupado}
                  onClick={() => handleReservar(salaSeleccionada, b)}
                  className={`py-2 rounded-xl font-semibold ${ocupado ? "bg-gray-400 text-white cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}
                >
                  Bloque {b}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {pantalla === "reservas" && (
        <div className="mt-10 w-full">
          <button onClick={() => setPantalla("inicio")} className="text-blue-600 mb-4">← Volver</button>
          <h2 className="text-xl font-bold mb-4">Mis reservas</h2>
          {reservas.length === 0 ? (
            <p className="text-gray-500">No tienes reservas realizadas.</p>
          ) : (
            <ul className="space-y-3">
              {reservas.map((r) => (
                <li key={r.id} className="bg-white p-4 rounded-xl shadow flex flex-col">
                  <span className="font-semibold">Sala {r.sala}</span>
                  <span className="text-sm text-gray-600">Bloque {r.bloque} | {r.fecha}</span>
                  <button
                    onClick={() => handleCancelar(r.id)}
                    className="mt-2 text-sm text-red-600 underline self-end"
                  >
                    Cancelar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
