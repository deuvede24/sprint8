import { Router } from 'express';
import { getMostUsedIngredients } from '../controllers/chartController.js';

const router = Router();

// Ruta para obtener los ingredientes más usados
router.get('/most-used-ingredients', getMostUsedIngredients);

export default router;
