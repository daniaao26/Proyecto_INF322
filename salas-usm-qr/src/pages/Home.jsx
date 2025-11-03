import React from "react";
import Button from "../components/Button";

export default function Home({ onNavigate }) {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('../src/assets/usm-CC.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/60" />

      {/* Logo en la esquina superior izquierda */}
      <img
        src="../src/assets/Logo_USM.png"
        alt="Logo USM"
        className="absolute top-4 left-4 w-14 h-auto z-10"
      />

      {/* Contenido principal centrado */}
      <div className="relative z-5 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        
        {/* Sección de Texto */}
        <div className="mb-10">
          <h1 className="text-white font-bold flex items-center justify-center gap-3">
            {/* El "QR" grande */}
            <span className="text-7xl">QR</span>
            {/* El texto "SALAS USM" en dos líneas */}
            <span className="text-4xl text-left leading-tight">
              SALAS
              <br />
              USM
            </span>
          </h1>
          <p className="text-white text-lg mt-4 max-w-xs mx-auto">
            Bienvenid@ a Salas USM. Gestiona tus reservas fácilmente.
          </p>
        </div>

        {/* Sección de Botones */}
        <div className="w-full max-w-xs flex flex-col items-center gap-4">
          <Button
            onClick={() => onNavigate("escanear")}
            variant="secondary"
            size="large"
            className="w-full !bg-gray-800/90 !text-white hover:!bg-gray-700/90"
          >
            Escanear Sala
          </Button>

          <Button
            onClick={() => onNavigate("horarios")}
            variant="secondary"
            size="large"
            className="w-full !bg-gray-800/90 !text-white hover:!bg-gray-700/90"
          >
            Horarios de Salas
          </Button>

          <Button
            onClick={() => onNavigate("reservas")}
            variant="secondary"
            size="large"
            className="w-full !bg-gray-800/90 !text-white hover:!bg-gray-700/90"
          >
            Mis reservas
          </Button>
        </div>
      </div>
    </div>
  );
}