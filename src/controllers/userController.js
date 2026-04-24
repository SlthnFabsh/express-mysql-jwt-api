import { findAllUsers } from '../models/userModel.js';

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
