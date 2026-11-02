
const { conectarSQL, sql } = require('./config/db');

async function probar() {
    try {
        const pool = await conectarSQL();

        const resultado = await pool.request().query(
            'SELECT id, name, email FROM dbo.Users'
        );

        console.table(resultado.recordset);
    } catch (error) {
        process.exitCode = 1;
    } finally {
        await sql.close();
    }
}

probar();
