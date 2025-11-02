import React, { useState } from "react";
import Home from "./pages/Home";
import EscanearQR from "./pages/EscanearQR";
import DetalleSala from "./pages/DetalleSala";
import MisReservas from "./pages/MisReservas";
import HorarioSalas from "./pages/HorarioSalas";
import { reservasIniciales } from "./data/mockData";

export default function App() {
  // Estado de navegación
  const [vistaActual, setVistaActual] = useState("home");
  
  // Estado de datos
  const [salaSeleccionada, setSalaSeleccionada] = useState(null);
  const [reservas, setReservas] = useState(reservasIniciales);

  // Función de navegación
  const handleNavigate = (vista) => {
    setVistaActual(vista);
  };

  // Función para seleccionar sala
  const handleSalaSeleccionada = (sala) => {
    setSalaSeleccionada(sala);
  };

  // Función para realizar una reserva
  const handleReservar = (sala, bloque) => {
    const nuevaReserva = {
      id: Date.now(), // Usamos timestamp como ID único
      sala: sala.nombre,
      bloque: bloque,
      fecha: new Date().toLocaleDateString("es-CL"),
      usuario: "Usuario Demo",
    };
    setReservas([...reservas, nuevaReserva]);
  };

  // Función para cancelar una reserva
  const handleCancelarReserva = (id) => {
    setReservas(reservas.filter((r) => r.id !== id));
  };

  // Renderizado condicional de vistas
  return (
    <div className="min-h-screen bg-gray-100">
      {vistaActual === "home" && (
        <Home onNavigate={handleNavigate} />
      )}

      {vistaActual === "escanear" && (
        <EscanearQR
          onNavigate={handleNavigate}
          onSalaSeleccionada={handleSalaSeleccionada}
        />
      )}

      {vistaActual === "detalle" && (
        <DetalleSala
          sala={salaSeleccionada}
          onNavigate={handleNavigate}
          onReservar={handleReservar}
        />
      )}

      {vistaActual === "reservas" && (
        <MisReservas
          reservas={reservas}
          onNavigate={handleNavigate}
          onCancelar={handleCancelarReserva}
        />
      )}

      {vistaActual === "horarios" && (
        <HorarioSalas onNavigate={handleNavigate} />
      )}
    </div>
  );
}
