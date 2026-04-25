import { findAllUsers, findUserById, deleteUserById, createUser } from '../models/userModel.js';

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

export const createNewUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  let finalRole = 'user'; // Default role

  if (req.user.role === 'super-admin') {
    // Super-admin can create user and admin
    if (role === 'admin' || role === 'user') {
      finalRole = role;
    } else if (role === 'super-admin') {
        return res.status(403).json({ message: 'Cannot create super-admin role' });
    }
  } else if (req.user.role === 'admin') {
    // Admin can only create user
    if (role && role !== 'user') {
      return res.status(403).json({ message: 'Admin hanya diperbolehkan membuat user biasa' });
    }
    finalRole = 'user';
  }

  try {
    await createUser(username, password, finalRole);
    res.status(201).json({
      message: 'User created successfully',
      data: { username, role: finalRole }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
};
