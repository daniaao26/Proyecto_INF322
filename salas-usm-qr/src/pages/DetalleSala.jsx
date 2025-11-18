import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";
import ConfirmModal from "../components/ConfirmModal";
import { bloques } from "../data/mockData";
import { HiCalendar, HiBuildingOffice2, HiUsers, HiComputerDesktop } from "react-icons/hi2";

export default function DetalleSala({ sala, onNavigate, onReservar }) {
  // Obtener fecha actual y fecha máxima (7 días desde hoy)
  const hoy = new Date();
  const maxFecha = new Date();
  maxFecha.setDate(maxFecha.getDate() + 7);

  // Estado para la fecha seleccionada (por defecto hoy)
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    hoy.toISOString().split('T')[0]
  );
  
  // Estado para el modal de confirmación
  const [confirmacion, setConfirmacion] = useState(null);

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
    const fechaFormateada = new Date(fechaSeleccionada + 'T00:00:00').toLocaleDateString('es-CL');
    setConfirmacion({
      bloque,
      fechaFormateada
    });
  };

  const confirmarReserva = () => {
    onReservar(sala, confirmacion.bloque, fechaSeleccionada);
    setConfirmacion(null);
    onNavigate("home");
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
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
              <HiBuildingOffice2 className="text-lg mr-2" />
              <span className="font-semibold mr-2">Edificio:</span>
              <span>{sala.edificio}</span>
            </div>
            <div className="flex items-center">
              <HiUsers className="text-lg mr-2" />
              <span className="font-semibold mr-2">Capacidad:</span>
              <span>{sala.capacidad} personas</span>
            </div>
            <div className="flex items-start">
              <HiComputerDesktop className="text-lg mr-2 mt-0.5" />
              <span className="font-semibold mr-2">Equipamiento:</span>
              <span>{sala.equipamiento}</span>
            </div>
          </div>
        </Card>

        {/* Selector de Fecha */}
        <Card className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <HiCalendar className="text-xl" /> Seleccionar Fecha
          </h3>
          <input
            type="date"
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
            min={hoy.toISOString().split('T')[0]}
            max={maxFecha.toISOString().split('T')[0]}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p className="text-sm text-gray-500 mt-2">
            Puedes reservar hasta 7 días de anticipación
          </p>
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
      
      {/* Modal de confirmación */}
      {confirmacion && (
        <ConfirmModal
          title="Confirmar Reserva"
          message={`¿Confirmar reserva de sala ${sala.nombre} para el bloque ${confirmacion.bloque} el día ${confirmacion.fechaFormateada}?`}
          onConfirm={confirmarReserva}
          onCancel={() => setConfirmacion(null)}
        />
      )}
    </div>
  );
}
