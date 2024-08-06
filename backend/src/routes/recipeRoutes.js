// src/routes/recipeRoutes.js
import { Router } from 'express';
import { getRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe } from '../controllers/recipeController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { recipeValidator } from '../validations/recipeValidation.js';
import { idValidator } from '../validations/genericValidation.js';

const router = Router();

router.get('/', authenticateToken(['guest', 'registered', 'admin']), getRecipes);
router.get('/:id', authenticateToken(['guest', 'registered', 'admin']), idValidator, getRecipeById);
router.post('/', authenticateToken(['registered', 'admin']), recipeValidator, addRecipe);
router.patch('/:id', authenticateToken(['registered', 'admin']), idValidator, recipeValidator, updateRecipe);
router.delete('/:id', authenticateToken(['admin']), idValidator, deleteRecipe);

export default router;


