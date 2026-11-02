
require('dotenv').config();

const express = require('express');
const eventRoutes = require('./src/routes/eventRoutes');
const { conectarMongo } = require('./config/mongo');

const app = express();
const PORT = process.env.EVENTS_PORT || 3001;

// Permitir recibir datos JSON
app.use(express.json());

// Ruta principal del microservicio
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Microservicio de eventos funcionando',
        estado: 'OK',
        baseDeDatos: 'MongoDB'
    });
});

// Rutas CRUD de eventos
app.use('/api/events', eventRoutes);

// Iniciar el servidor después de conectar MongoDB
async function iniciarServidor() {
    try {
        await conectarMongo();

        app.listen(PORT, () => {
            console.log(
                `Microservicio de eventos funcionando en http://localhost:${PORT}`
            );
            console.log('API eventos: /api/events');
        });

    } catch (error) {
        console.error(
            'No se pudo iniciar el microservicio:',
            error.message
        );

        process.exitCode = 1;
    }
}

iniciarServidor();
