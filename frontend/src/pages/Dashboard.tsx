import React, { useState, useEffect } from 'react';
import {
  getSpaces,
  createReservation,
  cancelReservation,
  getReservationByUser,
  getUserIdFromToken,
} from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import SpaceList from './SpaceList';
import ReservationList from './ReservationList';
import '../styles/Dashboard.css';

import { Space, Reservation } from '../types/types';

const Dashboard: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    async function fetchSpaces() {
      try {
        const response = await getSpaces();
        setSpaces(response.data);
      } catch (error) {
        toast.error('Error fetching spaces.');
        console.error('Error fetching spaces:', error);
      }
    }

    async function fetchReservations() {
      const userId = getUserIdFromToken();
      if (!userId) {
        toast.error('No userId found in token.');
        return;
      }

      try {
        const response = await getReservationByUser(userId);
        setReservations(response.data);
      } catch (error) {
        toast.error('Error fetching reservations.');
        console.error('Error fetching reservations:', error);
      }
    }

    fetchSpaces();
    fetchReservations();
  }, []);

  const handleReserve = async (spaceId: number) => {
    const userId = getUserIdFromToken();
    try {
      await createReservation({
        spaceId,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        userId: userId,
      });
      toast.success('Reserva creada con éxito!');
      const response = await getReservationByUser(getUserIdFromToken());
      setReservations(response.data);
    } catch (error) {
      toast.error('Error al crear la reserva.');
      console.error('Error al crear la reserva:', error);
    }
  };

  const handleCancelReservation = async (reservationId: number) => {
    try {
      await cancelReservation(reservationId);
      toast.success('Reserva cancelada con éxito!');
      const response = await getReservationByUser(getUserIdFromToken());
      setReservations(response.data);
    } catch (error) {
      toast.error('Error al cancelar la reserva.');
      console.error('Error al cancelar la reserva:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleAdminRedirect = () => {
    window.location.href = '/admin';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Button
          icon="pi pi-cog"
          label="Admin"
          className="p-button-secondary"
          onClick={handleAdminRedirect}
          style={{ marginRight: 'auto' }} // This makes the button align to the left
        />
        <Button
          icon="pi pi-user"
          label="Logout"
          className="p-button-danger"
          onClick={handleLogout}
        />
      </div>

      <h2>Dashboard de Reservas</h2>

      <div className="section-container">
        <SpaceList spaces={spaces} onReserve={handleReserve} />
        <ReservationList
          reservations={reservations}
          onCancel={handleCancelReservation}
        />
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default Dashboard;
