/*import { Router } from 'express';
import { getIngredients, getIngredientById, addIngredient, updateIngredient, deleteIngredient } from '../controllers/ingredientController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken(['guest', 'registered', 'admin']), getIngredients);
router.get('/:id', authenticateToken(['guest', 'registered', 'admin']), getIngredientById);
router.post('/', authenticateToken(['registered', 'admin']), addIngredient);
router.put('/:id', authenticateToken(['registered', 'admin']), updateIngredient);
router.delete('/:id', authenticateToken(['admin']), deleteIngredient);

export default router;*/

import { Router } from 'express';
import { getIngredients, getIngredientById, addIngredient, updateIngredient, deleteIngredient } from '../controllers/ingredientController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { ingredientValidator } from '../validations/ingredientValidation.js';

const router = Router();

router.get('/', authenticateToken(['guest', 'registered', 'admin']), getIngredients);
router.get('/:id', authenticateToken(['guest', 'registered', 'admin']), getIngredientById);
router.post('/', authenticateToken(['registered', 'admin']), ingredientValidator, addIngredient);
router.put('/:id', authenticateToken(['registered', 'admin']), ingredientValidator, updateIngredient);
router.delete('/:id', authenticateToken(['admin']), deleteIngredient);

export default router;

