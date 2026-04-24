import connection from '../config/database.js';

export const findUserByUsername = async (username) => {
    const [rows] = await connection.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );
    return rows;
};

export const findAllUsers = async () => {
    const [rows] = await connection.query('SELECT * FROM users');
    return rows;
};
