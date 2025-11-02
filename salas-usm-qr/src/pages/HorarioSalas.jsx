import React, { useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import { salas, bloques } from "../data/mockData";

export default function HorarioSalas({ onNavigate }) {
  const [salaExpandida, setSalaExpandida] = useState(null);

  const toggleSala = (salaId) => {
    setSalaExpandida(salaExpandida === salaId ? null : salaId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Horario de Salas" onBack={() => onNavigate("home")} />

      <div className="max-w-sm mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Salas Disponibles
          </h2>
          <p className="text-sm text-gray-600">
            Consulta la disponibilidad de todas las salas
          </p>
        </div>

        <div className="space-y-4">
          {salas.map((sala) => {
            const isExpanded = salaExpandida === sala.id;
            const bloquesDisponibles = bloques.filter(
              (b) => !sala.ocupados.includes(b)
            ).length;
            const bloquesOcupados = sala.ocupados.length;

            return (
              <Card key={sala.id} className="overflow-hidden">
                {/* Header de la sala - Clickeable */}
                <button
                  onClick={() => toggleSala(sala.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        Sala {sala.nombre}
                      </h3>
                      <p className="text-sm text-gray-600">{sala.edificio}</p>
                    </div>
                    <div className="text-right mr-2">
                      <div className="text-xs text-gray-500">Disponibles</div>
                      <div className="text-2xl font-bold text-green-600">
                        {bloquesDisponibles}/{bloques.length}
                      </div>
                    </div>
                    <div className="text-2xl text-gray-400">
                      {isExpanded ? "▲" : "▼"}
                    </div>
                  </div>
                </button>

                {/* Contenido expandible */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {/* Información de la sala */}
                    <div className="mb-4 space-y-2 text-sm text-gray-700">
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">👥</span>
                        <span>Capacidad: {sala.capacidad} personas</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-semibold mr-2">🖥️</span>
                        <span>{sala.equipamiento}</span>
                      </div>
                    </div>

                    {/* Grid de bloques */}
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Estado por bloque:
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {bloques.map((bloque) => {
                          const ocupado = sala.ocupados.includes(bloque);
                          return (
                            <div
                              key={bloque}
                              className={`
                                text-center py-2 rounded-lg text-xs font-semibold
                                ${
                                  ocupado
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                                }
                              `}
                            >
                              {bloque}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="flex justify-around text-xs bg-gray-50 rounded-lg p-2">
                      <div className="text-center">
                        <div className="font-semibold text-green-600">
                          {bloquesDisponibles}
                        </div>
                        <div className="text-gray-600">Disponibles</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-red-600">
                          {bloquesOcupados}
                        </div>
                        <div className="text-gray-600">Ocupados</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-800">
                          {bloques.length}
                        </div>
                        <div className="text-gray-600">Total</div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Leyenda */}
        <Card className="mt-6 bg-blue-50 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">📊 Leyenda</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
              <span className="text-gray-700">Bloque disponible</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
              <span className="text-gray-700">Bloque ocupado</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
