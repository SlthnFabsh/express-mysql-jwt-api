import express from 'express';
import { getAllUsers, getUserById, deleteUser } from '../controllers/userController.js';
import { verifyToken, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Super-admin only
router.get('/', verifyToken, authorizeRoles('super-admin'), getAllUsers);

// Admin and Super-admin
router.get('/:id', verifyToken, authorizeRoles('admin', 'super-admin'), getUserById);
router.delete('/:id', verifyToken, authorizeRoles('admin', 'super-admin'), deleteUser);

export default router;
