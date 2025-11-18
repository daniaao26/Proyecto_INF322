import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Card from "../components/Card";
import ConfirmModal from "../components/ConfirmModal";
import { HiClock, HiCalendar, HiUser, HiCheckCircle } from "react-icons/hi2";

export default function MisReservas({ reservas, onNavigate, onCancelar }) {
  const [reservaACancelar, setReservaACancelar] = useState(null);
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
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

            <div className="space-y-3">
              {reservas.map((reserva) => (
                <Card key={reserva.id} className="hover:shadow-lg transition-shadow p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-gray-800">
                      Sala {reserva.sala}
                    </h3>
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1">
                      <HiCheckCircle /> Activa
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <HiClock className="mr-1.5 text-base" />
                      <span>Bloque {reserva.bloque}</span>
                    </div>
                    <div className="flex items-center">
                      <HiCalendar className="mr-1.5 text-base" />
                      <span>{reserva.fecha}</span>
                    </div>
                    <div className="flex items-center col-span-2">
                      <HiUser className="mr-1.5 text-base" />
                      <span>{reserva.usuario}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setReservaACancelar(reserva)}
                    variant="danger"
                    size="small"
                    className="w-full py-2 text-sm"
                  >
                    Cancelar Reserva
                  </Button>
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
      
      {/* Modal de confirmación para cancelar */}
      {reservaACancelar && (
        <ConfirmModal
          title="Cancelar Reserva"
          message={`¿Estás seguro de cancelar la reserva de la sala ${reservaACancelar.sala} para el bloque ${reservaACancelar.bloque}?`}
          onConfirm={() => {
            onCancelar(reservaACancelar.id);
            setReservaACancelar(null);
          }}
          onCancel={() => setReservaACancelar(null)}
        />
      )}
    </div>
  );
}
