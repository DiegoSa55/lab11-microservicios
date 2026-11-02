
const { mongoose, conectarMongo } = require('./config/mongo');

async function probar() {
    try {
        await conectarMongo();

        const resultado = await mongoose.connection.db.admin().ping();

        console.log('Respuesta de MongoDB:', resultado);
        console.log('Base de datos:', mongoose.connection.name);

    } catch (error) {
        console.error('Falló la prueba:', error.message);
        process.exitCode = 1;

    } finally {
        await mongoose.disconnect();
    }
}

probar();
