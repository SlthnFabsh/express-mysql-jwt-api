import express from 'express';
import { getAllUsers, getUserById, deleteUser, createNewUser } from '../controllers/userController.js';
import { verifyToken, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Super-admin only
router.get('/', verifyToken, authorizeRoles('super-admin'), getAllUsers);

// Admin and Super-admin
router.post('/', verifyToken, authorizeRoles('admin', 'super-admin'), createNewUser);
router.get('/:id', verifyToken, authorizeRoles('admin', 'super-admin'), getUserById);
router.delete('/:id', verifyToken, authorizeRoles('admin', 'super-admin'), deleteUser);

export default router;
