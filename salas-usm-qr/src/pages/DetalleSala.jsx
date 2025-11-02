import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";
import { bloques } from "../data/mockData";

export default function DetalleSala({ sala, onNavigate, onReservar }) {
  if (!sala) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header title="Detalle de Sala" onBack={() => onNavigate("home")} />
        <div className="max-w-sm mx-auto p-6 text-center">
          <p className="text-gray-600">No hay sala seleccionada</p>
        </div>
      </div>
    );
  }

  const handleReserva = (bloque) => {
    if (window.confirm(`¿Confirmar reserva de sala ${sala.nombre} para el bloque ${bloque}?`)) {
      onReservar(sala, bloque);
      alert(`✅ Reserva confirmada para la sala ${sala.nombre}, bloque ${bloque}`);
      onNavigate("home");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title={`Sala ${sala.nombre}`}
        onBack={() => onNavigate("escanear")}
      />

      <div className="max-w-sm mx-auto p-6">
        {/* Información de la sala */}
        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sala {sala.nombre}
          </h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex items-center">
              <span className="font-semibold mr-2">🏢 Edificio:</span>
              <span>{sala.edificio}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">👥 Capacidad:</span>
              <span>{sala.capacidad} personas</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">🖥️ Equipamiento:</span>
              <span>{sala.equipamiento}</span>
            </div>
          </div>
        </Card>

        {/* Disponibilidad por bloques */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Disponibilidad por Bloques
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {bloques.map((bloque) => {
              const ocupado = sala.ocupados.includes(bloque);
              return (
                <Button
                  key={bloque}
                  onClick={() => !ocupado && handleReserva(bloque)}
                  variant={ocupado ? "disabled" : "success"}
                  disabled={ocupado}
                  className="w-full"
                >
                  <div className="text-center">
                    <div className="font-bold">Bloque {bloque}</div>
                    <div className="text-xs mt-1">
                      {ocupado ? "Ocupado" : "Disponible"}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Leyenda */}
        <Card className="bg-gray-50">
          <div className="flex items-center justify-around text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>
              <span>Disponible</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
              <span>Ocupado</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
