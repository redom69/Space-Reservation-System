import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { User } from '../types/types'; // Adjust this import path based on your project structure

interface EditUserModalProps {
  visible: boolean;
  onHide: () => void;
  onSave: (user: User) => void;
  user: User | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  onHide,
  onSave,
  user,
}) => {
  const [localUser, setLocalUser] = useState<User | null>(user);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

  if (!localUser) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLocalUser((prevUser) => ({
      ...prevUser!,
      [id]: id === 'roleId' ? Number(value) : value,
    }));
  };

  return (
    <Dialog
      header="Editar Usuario"
      visible={visible}
      style={{ width: '50vw' }}
      modal
      className="edit-user-modal"
      onHide={onHide}
    >
      <div className="p-grid p-fluid">
        <div className="p-col-12">
          <label htmlFor="fullName">Nombre Completo</label>
          <input
            type="text"
            id="fullName"
            className="p-inputtext p-component"
            value={localUser.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="p-col-12">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="text"
            id="email"
            className="p-inputtext p-component"
            value={localUser.email}
            onChange={handleChange}
          />
        </div>

        <div className="p-col-12">
          <label htmlFor="roleId">Rol</label>
          <input
            type="number"
            id="roleId"
            className="p-inputtext p-component"
            value={localUser.roleId}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="p-d-flex p-jc-end p-mt-3" style={{ paddingTop: '20px' }}>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-cancel p-button-text"
          onClick={onHide}
          style={{ marginRight: 'auto' }} // Ensures Save button is right-aligned
        />
        <Button
          label="Save"
          icon="pi pi-check"
          className="p-button-save"
          onClick={() => onSave(localUser)}
        />
      </div>
    </Dialog>
  );
};

export default EditUserModal;
