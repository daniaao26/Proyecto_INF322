import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Salas USM QR" />
      
      <div className="max-w-sm mx-auto p-6 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        {/* Logo o icono principal */}
        <div className="mb-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-4xl text-white">📱</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
          <p className="text-gray-600 mt-2">Gestiona las salas de la USM</p>
        </div>

        {/* Botón principal grande */}
        <div className="w-full mb-4">
          <Button
            onClick={() => onNavigate("escanear")}
            variant="primary"
            size="large"
            className="w-full py-6 text-xl"
          >
            📷 Escanear Sala
          </Button>
        </div>

        {/* Botones secundarios */}
        <div className="w-full grid grid-cols-2 gap-4">
          <Button
            onClick={() => onNavigate("reservas")}
            variant="secondary"
            className="py-5"
          >
            📋 Mis Reservas
          </Button>
          <Button
            onClick={() => onNavigate("horarios")}
            variant="secondary"
            className="py-5"
          >
            🕐 Horario de Salas
          </Button>
        </div>
      </div>
    </div>
  );
}
