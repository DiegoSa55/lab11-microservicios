# Laboratorio 11 — Gestión de Usuarios con Dos Bases de Datos

## 1. Descripción del proyecto

Este proyecto implementa un sistema de gestión de usuarios utilizando Node.js, Express, SQL Server y MongoDB, mediante una arquitectura de dos microservicios independientes.

El sistema permite realizar operaciones CRUD sobre los usuarios y almacenar un historial de eventos relacionados con su creación, actualización y eliminación.

## 2. Tecnologías utilizadas

- Node.js 24
- Express 5
- Microsoft SQL Server 2025 Express
- MongoDB Community Server 9
- Librería MSSQL
- Mongoose
- dotenv
- APIs RESTful

## 3. Arquitectura

El proyecto contiene dos microservicios:

**Microservicio de usuarios (puerto 3000)**

Administra los usuarios almacenados en SQL Server y permite realizar las operaciones CREATE, READ, UPDATE y DELETE.

**Microservicio de eventos (puerto 3001)**

Administra los eventos históricos almacenados en MongoDB, mediante operaciones CRUD.

Ambos microservicios se comunican mediante peticiones HTTP REST para registrar automáticamente los cambios realizados sobre los usuarios.

## 4. Estructura del proyecto

```text
Lab_11/
├── usuarios-service/
│   ├── config/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   ├── server.js
│   └── package.json
├── eventos-service/
│   ├── config/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## 5. Configuración

Cada microservicio requiere un archivo `.env` privado.

**Usuarios:**

```dotenv
USERS_PORT=3000
DB_NAME=miapp_sql
DB_USER=lab11_app
DB_PASSWORD=CONTRASENA_CONFIGURADA_LOCALMENTE
EVENTOS_URL=http://127.0.0.1:3001
```

**Eventos:**

```dotenv
EVENTS_PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/lab11_eventos
```

Las credenciales reales no deben incluirse en el repositorio.

## 6. Instalación y ejecución

Instalar las dependencias en cada microservicio:

```powershell
cd usuarios-service
npm install
```

```powershell
cd eventos-service
npm install
```

Ejecutar cada microservicio en una terminal independiente:

```powershell
cd usuarios-service
npm start
```

```powershell
cd eventos-service
npm start
```

Para su funcionamiento se requiere que SQL Server y MongoDB estén instalados, iniciados y configurados con las bases de datos correspondientes.

## 7. Endpoints REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | localhost:3000/api/users | Listar usuarios |
| POST | localhost:3000/api/users | Crear usuario |
| PUT | localhost:3000/api/users/:id | Actualizar usuario |
| DELETE | localhost:3000/api/users/:id | Eliminar usuario |
| GET | localhost:3001/api/events | Listar eventos |
| POST | localhost:3001/api/events | Crear evento |
| PUT | localhost:3001/api/events/:id | Actualizar evento |
| DELETE | localhost:3001/api/events/:id | Eliminar evento |

## 8. Resultados de las pruebas

Se verificó el funcionamiento de las operaciones CRUD de ambas bases de datos.

También se comprobó la comunicación HTTP entre los microservicios y el registro automático de eventos CREATE, UPDATE y DELETE.

Como resultado final de las pruebas, SQL Server conservó tres usuarios y MongoDB almacenó seis eventos históricos.

## 9. Limitaciones

El registro histórico utiliza comunicación HTTP directa entre los microservicios.

Si el microservicio de eventos no está disponible durante una operación SQL, esta puede completarse sin que el evento se registre.

Para mejorar la confiabilidad en un entorno de producción podría implementarse un sistema de reintentos, una cola de mensajes o un patrón de almacenamiento transaccional de eventos pendientes.

## 10. Conclusiones

Se implementó satisfactoriamente un sistema de gestión de usuarios con SQL Server y MongoDB, separando las responsabilidades mediante dos microservicios desarrollados con Node.js y Express.

Las pruebas permitieron verificar las operaciones CRUD, la persistencia de los datos y la comunicación entre los microservicios utilizando APIs RESTful.