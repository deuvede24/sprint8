/*import { Router } from 'express';
import { getComments, getCommentById, addComment, updateComment, deleteComment } from '../controllers/commentController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken(['guest', 'registered', 'admin']), getComments);
router.get('/:id', authenticateToken(['guest', 'registered', 'admin']), getCommentById);
router.post('/', authenticateToken(['registered', 'admin']), addComment);
router.put('/:id', authenticateToken(['registered', 'admin']), updateComment);
router.delete('/:id', authenticateToken(['admin']), deleteComment);

export default router;*/


import { Router } from 'express';
import { getComments, getCommentById, addComment, updateComment, deleteComment } from '../controllers/commentController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { commentValidator } from '../validations/commentValidation.js'; // Añade esta línea

const router = Router();

router.get('/', authenticateToken(['guest', 'registered', 'admin']), getComments);
router.get('/:id', authenticateToken(['guest', 'registered', 'admin']), getCommentById);
router.post('/', authenticateToken(['registered', 'admin']), commentValidator, addComment); // Añade commentValidator aquí
router.put('/:id', authenticateToken(['registered', 'admin']), commentValidator, updateComment); // Añade commentValidator aquí
router.delete('/:id', authenticateToken(['admin']), deleteComment);

export default router;
