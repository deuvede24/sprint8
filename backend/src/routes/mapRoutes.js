// backend/routes/mapLocationRoutes.js

/*import { Router } from 'express';

const router = Router();

// Datos fijos de ubicaciones
const locations = [
  { name: 'Restaurante 1', description: 'Aquí sirven nuestra receta especial', latitude: 41.3851, longitude: 2.1734 },
  { name: 'Tienda de Ingredientes 2', description: 'Aquí puedes encontrar todos los ingredientes frescos', latitude: 41.3751, longitude: 2.1834 },
  // Agrega más ubicaciones según necesites
];

// Ruta para obtener todas las ubicaciones
router.get('/', (req, res) => {
  res.json(locations);
});

export default router;*/

import { Router } from 'express';
import { getMapLocations, createMapLocation, updateMapLocation, deleteMapLocation } from '../controllers/mapController.js';

const router = Router();

router.get('/', getMapLocations);
router.post('/', createMapLocation);
router.put('/:id', updateMapLocation);
router.delete('/:id', deleteMapLocation);

export default router;

