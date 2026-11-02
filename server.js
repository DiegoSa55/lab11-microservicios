
require('dotenv').config();

const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const { conectarMongo } = require('./config/mongo');

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir recibir datos JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Laboratorio 11 - Backend funcionando',
        estado: 'OK',
        basesDeDatos: ['SQL Server', 'MongoDB']
    });
});

// CRUD de usuarios en SQL Server
app.use('/api/users', userRoutes);

// CRUD de eventos en MongoDB
app.use('/api/events', eventRoutes);

// Iniciar Express después de conectar MongoDB
async function iniciarServidor() {
    try {
        await conectarMongo();

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
            console.log('API usuarios: /api/users');
            console.log('API eventos: /api/events');
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error.message);
        process.exitCode = 1;
    }
}

iniciarServidor();
