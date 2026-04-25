import connection from '../config/database.js';

export const findUserByUsername = async (username) => {
    const [rows] = await connection.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );
    return rows;
};

export const findAllUsers = async () => {
    const [rows] = await connection.query('SELECT id, username, role FROM users');
    return rows;
};

export const findUserById = async (id) => {
    const [rows] = await connection.query(
        'SELECT id, username, role FROM users WHERE id = ?',
        [id]
    );
    return rows[0];
};

export const deleteUserById = async (id) => {
    const [result] = await connection.query(
        'DELETE FROM users WHERE id = ?',
        [id]
    );
    return result;
};

export const createUser = async (username, password, role) => {
    const [result] = await connection.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, password, role]
    );
    return result;
};
