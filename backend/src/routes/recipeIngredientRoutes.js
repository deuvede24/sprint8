import { Router } from 'express';
import { getRecipeIngredients, getRecipeIngredientById, addRecipeIngredient, updateRecipeIngredient, deleteRecipeIngredient } from '../controllers/recipeIngredientController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken(['guest', 'registered', 'admin']), getRecipeIngredients);
router.get('/:recipe_id/:ingredient_id', authenticateToken(['guest', 'registered', 'admin']), getRecipeIngredientById);
router.post('/', authenticateToken(['registered', 'admin']), addRecipeIngredient);
router.put('/:recipe_id/:ingredient_id', authenticateToken(['registered', 'admin']), updateRecipeIngredient);
router.delete('/:recipe_id/:ingredient_id', authenticateToken(['admin']), deleteRecipeIngredient);

export default router;
