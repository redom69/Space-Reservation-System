export interface Space {
  id: number;
  name: string;
  description: string;
}

export interface Reservation {
  id: number;
  spaceId: number;
  startTime: Date | string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  roleId: number;
}
