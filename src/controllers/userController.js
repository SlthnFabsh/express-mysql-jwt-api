import { findAllUsers, findUserById, deleteUserById } from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const rows = await findAllUsers();
    res.json({
      message: 'Success',
      data: rows
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    })
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      message: 'Success',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optional: Prevent admin from deleting super-admin or other admins
    if (req.user.role === 'admin' && (user.role === 'admin' || user.role === 'super-admin')) {
      return res.status(403).json({
        message: 'Admin hanya dapat menghapus user biasa.'
      });
    }

    await deleteUserById(req.params.id);
    res.json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};
