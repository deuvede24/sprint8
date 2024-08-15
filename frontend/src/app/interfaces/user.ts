/*export interface User {
  fullName: string;
  email: string;
  password: string;
  role?: 'admin' | 'user' | 'guest';  // Añadimos el rol aquí
}*/
export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  role?: 'admin' | 'user' | 'guest';
}


export interface AuthResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
    role: 'admin' | 'user' | 'guest';  // Asegúrate de que la respuesta del servidor incluya el rol
  };
}

export interface Login {
  email: string;
  password: string;
}

