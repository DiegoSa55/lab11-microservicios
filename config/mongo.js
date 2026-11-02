
require('dotenv').config();

const mongoose = require('mongoose');

async function conectarMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });

        console.log('Conectado correctamente a MongoDB');

    } catch (error) {
        console.error(
            'Error al conectar con MongoDB:',
            error.message
        );

        throw error;
    }
}

module.exports = { mongoose, conectarMongo };
