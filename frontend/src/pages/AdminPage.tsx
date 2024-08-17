import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, updateUser } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import EditUserModal from './EditUserModal';
import '../styles/AdminDashboard.css';

interface User {
  id: number;
  fullName: string;
  email: string;
  roleId: number;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      const filteredUsers = response.data.filter(
        (user: User) => user.roleId !== 1
      );
      setUsers(filteredUsers);
    } catch (error) {
      toast.error('Error fetching users.');
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      toast.success('Usuario eliminado con éxito!');
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      toast.error('Error al eliminar el usuario.');
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const handleSaveUser = async (updatedUser: User) => {
    try {
      await updateUser(updatedUser.id, updatedUser);
      toast.success('Usuario actualizado con éxito!');
      fetchUsers(); // Refresh the user list after updating
      setEditModalVisible(false);
    } catch (error) {
      toast.error('Error al actualizar el usuario.');
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleDashboardRedirect = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <Button
          icon="pi pi-arrow-left"
          label="Dashboard"
          className="p-button-secondary"
          onClick={handleDashboardRedirect}
          style={{ marginRight: 'auto' }}
        />
        <Button
          icon="pi pi-user"
          label="Logout"
          className="p-button-danger"
          onClick={handleLogout}
        />
      </div>
      <h2>Admin Dashboard - Usuarios</h2>

      <div className="admin-users-list">
        <div className="card-grid">
          {users.map((user) => (
            <div key={user.id} className="card">
              <div className="card-title">
                {user.fullName} - {user.email}
              </div>
              <div className="card-description">Rol: {user.roleId}</div>
              <div className="card-actions">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-warning"
                  onClick={() => handleEditUser(user)}
                />
                <Button
                  icon="pi pi-times"
                  className="p-button-danger"
                  onClick={() => handleDeleteUser(user.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditUserModal
        visible={editModalVisible}
        user={selectedUser}
        onHide={() => setEditModalVisible(false)}
        onSave={handleSaveUser}
      />

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default AdminDashboard;
