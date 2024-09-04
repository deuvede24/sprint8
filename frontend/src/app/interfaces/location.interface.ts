// src/app/interfaces/location.interface.ts
export interface Location {
    id?: number; // Opcional, solo será necesario si necesitas identificar las ubicaciones de forma única
    name: string;
    description: string;
    latitude: number;
    longitude: number;
  }

  export interface CreateLocationResponse {
    message: string;
    newLocation: Location;
  }
  