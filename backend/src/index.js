// src/index.js
/*import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import testRoutes from './routes/testRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js'; // Asegúrate de importar correctamente

import { testConnection } from './db.js';
import { insertInitialUserData } from './start_data.js';

const app = express();

// Configura CORS para permitir solicitudes desde el frontend
app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200'
}));

// Middleware para analizar cookies y el cuerpo de las solicitudes
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conectar a la base de datos e insertar datos iniciales
await testConnection();
await insertInitialUserData();

// Configurar rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/books', bookRoutes);
app.use('/test', testRoutes);
app.use('/recipes', recipeRoutes); // Asegúrate de que esta línea esté correcta

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});*/

// src/index.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js"; // Importar correctamente
import testRoutes from "./routes/testRoutes.js"; // Si esto es necesario
import commentRoutes from "./routes/commentRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import ingredientRoutes from "./routes/ingredientRoutes.js";
import recipeIngredientRoutes from "./routes/recipeIngredientRoutes.js";

import { testConnection } from "./db.js";
import insertInitialData from "./start_data.js";

const app = express();

// Configura CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);

// Middleware para analizar cookies y el cuerpo de las solicitudes
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//const initializeServer = async () => {
await testConnection();
await insertInitialData();

// Configurar rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes); // Asegúrate de que esta línea esté correcta
app.use("/test", testRoutes); // Si esto es necesario
app.use("/api/comments", commentRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/recipe-ingredients", recipeIngredientRoutes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
//};

//initializeServer();
