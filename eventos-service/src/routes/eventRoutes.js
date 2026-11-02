
const express = require('express');

const router = express.Router();

const eventController = require('../controllers/eventController');

// POST: registrar un evento en MongoDB
router.post('/', eventController.createEvent);

// GET: consultar todos los eventos
router.get('/', eventController.getEvents);

// PUT: actualizar un evento por su ID
router.put('/:id', eventController.updateEvent);

// DELETE: eliminar un evento por su ID
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
