
require('dotenv').config();

const EVENTOS_URL =
    process.env.EVENTOS_URL || 'http://127.0.0.1:3001';

async function registrarEvento(userId, action, description) {
    try {
        const respuesta = await fetch(
            `${EVENTOS_URL}/api/events`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    action,
                    description
                }),
                signal: AbortSignal.timeout(5000)
            }
        );

        if (!respuesta.ok) {
            throw new Error(
                `Error HTTP ${respuesta.status}`
            );
        }

        const evento = await respuesta.json();

        console.log(
            `[AUDITORÍA HTTP] ${action}: usuario ${userId}`
        );

        return evento;

    } catch (error) {
        console.error(
            '[AUDITORÍA] No se pudo registrar el evento:',
            error.message
        );

        return null;
    }
}

module.exports = { registrarEvento };
