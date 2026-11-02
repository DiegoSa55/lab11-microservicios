
const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// Crear un usuario
router.post('/', userController.createUser);

// Listar usuarios
router.get('/', userController.getUsers);

// Actualizar un usuario
router.put('/:id', userController.updateUser);

// Eliminar un usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;
