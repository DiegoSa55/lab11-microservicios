
require('dotenv').config();

const express = require('express');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = process.env.USERS_PORT || 3000;

app.use(express.json());

// Ruta principal del microservicio
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Microservicio de usuarios funcionando',
        estado: 'OK',
        baseDeDatos: 'SQL Server'
    });
});

// Rutas CRUD de usuarios
app.use('/api/users', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(
        `Microservicio de usuarios funcionando en http://localhost:${PORT}`
    );
    console.log('API usuarios: /api/users');
});
