// src/routes/userRoutes.js
// src/routes/userRoutes.js
/*import { Router } from 'express';
import { getUser, uploadPhoto } from '../controllers/userController.js';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { uploadFileMiddleware } from '../middlewares/upload.js';

const router = Router();

router.get('/', authenticateToken(['guest','registered', 'admin']), getUser);
router.post('/upload-photo', authenticateToken(['registered', 'admin']), uploadFileMiddleware, uploadPhoto);

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;*/


import { Router } from 'express';
import { getUser, uploadPhoto, getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { uploadFileMiddleware } from '../middlewares/upload.js';

const router = Router();

// Ruta para obtener el perfil del usuario autenticado
router.get('/me', authenticateToken(['guest', 'registered', 'admin']), getUser);

// Ruta para subir la foto del usuario autenticado
router.post('/upload-photo', authenticateToken(['registered', 'admin']), uploadFileMiddleware, uploadPhoto);

// Rutas CRUD para administradores
router.get('/', authenticateToken(['admin']), getUsers); // Solo los administradores pueden obtener la lista de todos los usuarios
router.get('/:id', authenticateToken(['admin']), getUserById); // Solo los administradores pueden obtener un usuario por ID
router.post('/', authenticateToken(['admin']), createUser); // Solo los administradores pueden crear usuarios
router.put('/:id', authenticateToken(['admin']), updateUser); // Solo los administradores pueden actualizar usuarios
router.delete('/:id', authenticateToken(['admin']), deleteUser); // Solo los administradores pueden eliminar usuarios

export default router;
