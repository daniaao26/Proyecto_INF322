import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";

export default function MisReservas({ reservas, onNavigate, onCancelar }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Mis Reservas" onBack={() => onNavigate("home")} />

      <div className="max-w-sm mx-auto p-6">
        {reservas.length === 0 ? (
          <div className="text-center mt-20">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-5xl">📋</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              No tienes reservas
            </h2>
            <p className="text-gray-600 mb-6">
              Escanea una sala para hacer tu primera reserva
            </p>
            <Button
              onClick={() => onNavigate("escanear")}
              variant="primary"
            >
              Escanear Sala
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Tienes {reservas.length} reserva{reservas.length !== 1 ? "s" : ""}
              </h2>
              <p className="text-sm text-gray-600">
                Gestiona tus reservas activas
              </p>
            </div>

            <div className="space-y-4">
              {reservas.map((reserva) => (
                <Card key={reserva.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        Sala {reserva.sala}
                      </h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="mr-2">🕐</span>
                          <span>Bloque {reserva.bloque}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">📅</span>
                          <span>{reserva.fecha}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">👤</span>
                          <span>{reserva.usuario}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        Activa
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => {
                        if (window.confirm(`¿Estás seguro de cancelar la reserva de la sala ${reserva.sala}?`)) {
                          onCancelar(reserva.id);
                        }
                      }}
                      variant="danger"
                      size="small"
                      className="w-full"
                    >
                      Cancelar Reserva
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Button
                onClick={() => onNavigate("escanear")}
                variant="primary"
                className="w-full"
              >
                + Nueva Reserva
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
