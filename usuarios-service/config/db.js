
require('dotenv').config();

const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: '127.0.0.1',
    port: 1433,
    database: process.env.DB_NAME,

    options: {
        encrypt: false,
        trustServerCertificate: true
    },

    connectionTimeout: 15000
};

async function conectarSQL() {
    try {
        const pool = await sql.connect(dbConfig);

        console.log('Conectado correctamente a SQL Server');

        return pool;
    } catch (error) {
        console.error(
            'Error al conectar con SQL Server:',
            error.message
        );

        throw error;
    }
}

module.exports = { sql, conectarSQL };
