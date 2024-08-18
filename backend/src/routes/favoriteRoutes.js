import { Router } from 'express';
import { getFavorites, getFavoriteById, addFavorite, deleteFavorite } from '../controllers/favoriteController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { favoriteValidator } from '../validations/favoriteValidation.js';

const router = Router();

router.get('/', authenticateToken(['guest', 'user', 'admin']), getFavorites);
router.get('/:id', authenticateToken(['guest', 'user', 'admin']), getFavoriteById);
router.post('/', authenticateToken(['user', 'admin']), favoriteValidator, addFavorite);
router.delete('/:id', authenticateToken(['admin']), deleteFavorite);

export default router;

