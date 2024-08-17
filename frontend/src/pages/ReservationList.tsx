import React from 'react';
import '../styles/Dashboard.css';
import { Reservation } from '../types/types';

interface ReservationListProps {
  reservations: Reservation[];
  onCancel: (reservationId: number) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
  onCancel,
}) => {
  return (
    <div className="reservations-list-container">
      <h3>Mis Reservas</h3>
      <div className="reservations-list">
        <div className="card-grid">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="card">
              <div className="card-title">Clase: {reservation.spaceId}</div>
              <div className="card-description">
                Hora: {new Date(reservation.startTime).toLocaleString()}
              </div>
              <button
                className="cancel-button"
                onClick={() => onCancel(reservation.id)}
              >
                Cancelar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
