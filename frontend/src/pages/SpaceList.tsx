import React from 'react';
import '../styles/Dashboard.css';

import { Space } from '../types/types';

interface SpaceListProps {
  spaces: Space[];
  onReserve: (spaceId: number) => void;
}

const SpaceList: React.FC<SpaceListProps> = ({ spaces, onReserve }) => {
  return (
    <div className="spaces-list-container">
      <h3>Clases Disponibles</h3>
      <div className="spaces-list">
        <div className="card-grid">
          {spaces.map((space) => (
            <div key={space.id} className="card">
              <div className="card-title">{space.name}</div>
              <div className="card-description">{space.description}</div>
              <button
                className="reserve-button"
                onClick={() => onReserve(space.id)}
              >
                Reservar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpaceList;
