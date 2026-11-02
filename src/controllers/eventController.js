
const Event = require('../models/event');

// POST: registrar un evento
async function createEvent(req, res) {
    try {
        const { userId, action, description } = req.body;

        if (!Number.isInteger(userId) || userId <= 0 ||
            typeof action !== 'string' || !action.trim() ||
            typeof description !== 'string' || !description.trim()) {
            return res.status(400).json({
                mensaje: 'Los datos del evento son inválidos'
            });
        }

        const evento = await Event.create({
            userId,
            action,
            description
        });

        res.status(201).json(evento);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar evento'
        });
    }
}

// GET: consultar todos los eventos
async function getEvents(req, res) {
    try {
        const eventos = await Event.find()
            .sort({ createdAt: -1 });

        res.json(eventos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar eventos'
        });
    }
}

// PUT: actualizar un evento
async function updateEvent(req, res) {
    try {
        const { userId, action, description } = req.body;

        if (!Number.isInteger(userId) || userId <= 0 ||
            typeof action !== 'string' || !action.trim() ||
            typeof description !== 'string' || !description.trim()) {
            return res.status(400).json({
                mensaje: 'Los datos del evento son inválidos'
            });
        }

        const evento = await Event.findByIdAndUpdate(
            req.params.id,
            { userId, action, description },
            { new: true, runValidators: true }
        );

        if (!evento) {
            return res.status(404).json({
                mensaje: 'Evento no encontrado'
            });
        }

        res.json(evento);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'ID de evento inválido'
            });
        }

        res.status(500).json({
            mensaje: 'Error al actualizar evento'
        });
    }
}

// DELETE: eliminar un evento
async function deleteEvent(req, res) {
    try {
        const evento = await Event.findByIdAndDelete(req.params.id);

        if (!evento) {
            return res.status(404).json({
                mensaje: 'Evento no encontrado'
            });
        }

        res.json({
            mensaje: 'Evento eliminado correctamente'
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                mensaje: 'ID de evento inválido'
            });
        }

        res.status(500).json({
            mensaje: 'Error al eliminar evento'
        });
    }
}

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
};
