import { Router } from 'express';
import { getComments, getCommentById, addComment, updateComment, deleteComment } from '../controllers/commentController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken(['guest', 'registered', 'admin']), getComments);
router.get('/:id', authenticateToken(['guest', 'registered', 'admin']), getCommentById);
router.post('/', authenticateToken(['registered', 'admin']), addComment);
router.put('/:id', authenticateToken(['registered', 'admin']), updateComment);
router.delete('/:id', authenticateToken(['admin']), deleteComment);

export default router;
