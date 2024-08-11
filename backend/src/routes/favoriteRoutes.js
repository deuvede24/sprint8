/*import { Router } from 'express';
import { getFavorites, getFavoriteById, addFavorite, deleteFavorite } from '../controllers/favoriteController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken(['guest', 'registered', 'admin']), getFavorites);
router.get('/:id', authenticateToken(['guest', 'registered', 'admin']), getFavoriteById);
router.post('/', authenticateToken(['registered', 'admin']), addFavorite);
router.delete('/:id', authenticateToken(['admin']), deleteFavorite);

export default router;*/

import { Router } from 'express';
import { getFavorites, getFavoriteById, addFavorite, deleteFavorite } from '../controllers/favoriteController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { favoriteValidator } from '../validations/favoriteValidation.js';

const router = Router();

router.get('/', authenticateToken(['guest', 'registered', 'admin']), getFavorites);
router.get('/:id', authenticateToken(['guest', 'registered', 'admin']), getFavoriteById);
router.post('/', authenticateToken(['registered', 'admin']), favoriteValidator, addFavorite);
router.delete('/:id', authenticateToken(['admin']), deleteFavorite);

export default router;

