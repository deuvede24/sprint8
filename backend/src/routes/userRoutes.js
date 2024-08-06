// src/routes/userRoutes.js
// src/routes/userRoutes.js
import { Router } from 'express';
import { getUser, uploadPhoto } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { uploadFileMiddleware } from '../middlewares/upload.js';

const router = Router();

router.get('/', authenticateToken(['guest','registered', 'admin']), getUser);
router.post('/upload-photo', authenticateToken(['registered', 'admin']), uploadFileMiddleware, uploadPhoto);

export default router;
