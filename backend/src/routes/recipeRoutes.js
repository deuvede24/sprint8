// src/routes/recipeRoutes.js
/*import { Router } from 'express';
import { getRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe } from '../controllers/recipeController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { recipeValidator } from '../validations/recipeValidation.js';
import { idValidator } from '../validations/genericValidation.js';

const router = Router();

//router.get('/', authenticateToken(['user', 'admin']), getRecipes);
//router.get('/:id', authenticateToken([' user', 'admin']), idValidator, getRecipeById);
router.get('/:id', getRecipeById);
router.post('/', authenticateToken(['user', 'admin']), recipeValidator, addRecipe);
router.patch('/:id', authenticateToken(['user', 'admin']), idValidator, recipeValidator, updateRecipe);
router.put('/:id', authenticateToken(['user', 'admin']), idValidator, recipeValidator, updateRecipe);
router.delete('/:id', authenticateToken(['user', 'admin']), idValidator, deleteRecipe);

//router.get('/public', getRecipes); // No requiere autenticación
router.get('/', getRecipes); // Ahora esta ruta está accesible para todos


export default router;*/

import { Router } from 'express';
import { getRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe } from '../controllers/recipeController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { recipeValidator } from '../validations/recipeValidation.js';
import { idValidator } from '../validations/genericValidation.js';

const router = Router();

router.get('/:id', getRecipeById);
router.post('/', authenticateToken(['user', 'admin']), recipeValidator, addRecipe);

// Aquí añadimos ambas rutas para actualizar recetas: PUT y PATCH
router.put('/:id', authenticateToken(['user', 'admin']), idValidator, recipeValidator, updateRecipe);
router.patch('/:id', authenticateToken(['user', 'admin']), idValidator, recipeValidator, updateRecipe);

router.delete('/:id', authenticateToken(['user','admin']), idValidator, deleteRecipe);

// Ruta accesible para todos para obtener las recetas
router.get('/', getRecipes); 

export default router;



