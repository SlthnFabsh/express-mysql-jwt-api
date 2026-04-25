import { findUserByUsername, createUser } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function login(req, res) {
    if (!req.body?.username || !req.body?.password) {
        return res.status(400).json({
            message: "username & password are required!"
        });
    }

    try {
        const users = await findUserByUsername(req.body.username);

        if(!users.length || req.body.password != users[0].password) {
            return res.status(400).json({
                message: "login failed."
            });
        }

        const token = jwt.sign(users[0], process.env.JWT_SECRET);

        res.json({
            message: "sukses",
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export async function register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: "username & password are required!"
        });
    }

    try {
        const existingUser = await findUserByUsername(username);
        if (existingUser.length > 0) {
            return res.status(400).json({
                message: "Username already exists!"
            });
        }

        await createUser(username, password, 'user');
        res.status(201).json({
            message: "Registration successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}
