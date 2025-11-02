import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { salas } from "../data/mockData";

export default function EscanearQR({ onNavigate, onSalaSeleccionada }) {
  const handleSelectSala = (sala) => {
    onSalaSeleccionada(sala);
    onNavigate("detalle");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Escanear Sala" onBack={() => onNavigate("home")} />

      <div className="max-w-sm mx-auto p-6">
        <div className="text-center mb-6">
          <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center">
            <span className="text-6xl">📷</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Simular Escaneo QR
          </h2>
          <p className="text-gray-600 text-sm">
            Selecciona una sala para simular el escaneo de su código QR
          </p>
        </div>

        <div className="space-y-3">
          {salas.map((sala) => (
            <Button
              key={sala.id}
              onClick={() => handleSelectSala(sala)}
              variant="primary"
              className="w-full text-left flex items-center justify-between"
            >
              <div>
                <span className="font-bold">Sala {sala.nombre}</span>
                <span className="text-sm opacity-90 ml-2">
                  - {sala.edificio}
                </span>
              </div>
              <span className="text-2xl">→</span>
            </Button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>Nota:</strong> En la versión final, aquí se activará la
            cámara del dispositivo para escanear códigos QR reales pegados en
            cada sala.
          </p>
        </div>
      </div>
    </div>
  );
}
