
const { sql, conectarSQL } = require('../../config/db');

const { registrarEvento } = require('../services/auditService');

// Registrar un usuario
async function createUser(req, res) {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                mensaje: 'Nombre y correo son obligatorios'
            });
        }

        const pool = await conectarSQL();

        const resultado = await pool.request()
            .input('name', sql.VarChar(100), name)
            .input('email', sql.VarChar(100), email)
            .query(`
                INSERT INTO Users (name, email)
                OUTPUT INSERTED.id, INSERTED.name, INSERTED.email
                VALUES (@name, @email)
            `);

        const usuario = resultado.recordset[0];

        await registrarEvento(
            usuario.id,
            'CREATE',
            `Se registro al usuario ${usuario.name}`
        );

        res.status(201).json(usuario);
    } catch (error) {
        if (error.number === 2627 || error.number === 2601) {
            return res.status(409).json({
                mensaje: 'El correo ya está registrado'
            });
        }

        res.status(500).json({
            mensaje: 'Error al registrar usuario'
        });
    }
}

// Listar usuarios
async function getUsers(req, res) {
    try {
        const pool = await conectarSQL();

        const resultado = await pool.request()
            .query('SELECT id, name, email FROM Users ORDER BY id');

        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar usuarios'
        });
    }
}

// Actualizar usuario
async function updateUser(req, res) {
    try {
        const id = Number(req.params.id);
        const { name, email } = req.body;

        if (!Number.isInteger(id) || id <= 0 || !name || !email) {
            return res.status(400).json({
                mensaje: 'Datos de usuario inválidos'
            });
        }

        const pool = await conectarSQL();

        const resultado = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar(100), name)
            .input('email', sql.VarChar(100), email)
            .query(`
                UPDATE Users
                SET name = @name, email = @email
                OUTPUT INSERTED.id, INSERTED.name, INSERTED.email
                WHERE id = @id
            `);

        if (resultado.recordset.length === 0) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        const usuario = resultado.recordset[0];

        await registrarEvento(
            usuario.id,
            'UPDATE',
            `Se actualizaron los datos del usuario ${usuario.name}`
        );

res.json(usuario);
    } catch (error) {
        if (error.number === 2627 || error.number === 2601) {
            return res.status(409).json({
                mensaje: 'El correo ya está registrado'
            });
        }

        res.status(500).json({
            mensaje: 'Error al actualizar usuario'
        });
    }
}

// Eliminar usuario
async function deleteUser(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID inválido'
            });
        }

        const pool = await conectarSQL();

        const resultado = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Users OUTPUT DELETED.id WHERE id = @id');

        if (resultado.recordset.length === 0) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }


        await registrarEvento(
            id,
            'DELETE',
            `Se elimino al usuario con ID ${id}`
        );

        res.json({
            mensaje: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar usuario'
        });
    }
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};
