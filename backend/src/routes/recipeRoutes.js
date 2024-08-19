// src/routes/recipeRoutes.js
import { Router } from 'express';
import { getRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe } from '../controllers/recipeController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { recipeValidator } from '../validations/recipeValidation.js';
import { idValidator } from '../validations/genericValidation.js';

const router = Router();

router.get('/', authenticateToken(['user', 'admin']), getRecipes);
router.get('/:id', authenticateToken([' user', 'admin']), idValidator, getRecipeById);
router.post('/', authenticateToken(['user', 'admin']), recipeValidator, addRecipe);
router.patch('/:id', authenticateToken(['user', 'admin']), idValidator, recipeValidator, updateRecipe);
router.delete('/:id', authenticateToken(['admin']), idValidator, deleteRecipe);

router.get('/public', getRecipes); // No requiere autenticación


export default router;


