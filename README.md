tp-intermedio-sofia-fraga/
├── src/
│   ├── config/         # Conexión a DB y variables de entorno
│   ├── controllers/    # Lógica de las funciones (qué hace cada ruta)
│   ├── middlewares/    # Auth (verificar JWT) y manejo de errores
│   ├── models/         # Esquemas de MongoDB (Mongoose)
│   ├── routes/         # Definición de los endpoints
│   └── app.js          # Configuración de Express
├── .env                # Variables sensibles (no subir a GitHub)
├── .env.example        # Ejemplo para el README
├── server.js           # Punto de entrada (levanta el servidor)
├── .gitignore
├── README.md
├── tsconfig.json
├── package-lock.json
└── package.json
