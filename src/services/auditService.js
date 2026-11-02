
const Event = require('../models/event');

// Registrar automáticamente una operación de usuario.
async function registrarEvento(userId, action, description) {
    try {
        const evento = await Event.create({
            userId,
            action,
            description
        });

        console.log(
            `[AUDITORÍA] ${action}: usuario ${userId}`
        );

        return evento;

    } catch (error) {
        // La operación SQL ya puede haberse realizado.
        // Un fallo del registro histórico no debe provocar
        // una respuesta falsa sobre el resultado del CRUD.
        console.error(
            '[AUDITORÍA] No se pudo registrar el evento:',
            error.message
        );

        return null;
    }
}

module.exports = { registrarEvento };
