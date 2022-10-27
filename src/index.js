const express = require('express');
const { PORT } = require('./config.js');

const app = express();

//Middlewares
app.use(express.json());

//Rutas
app.use('/auth', require('./routes/auth'));

/**
 * Manejo de la rutas no encontradas
 */
 app.use((req,res,next) => {
    res.status(404).json({
        ok : false,
        msg : 'Endpoint no encontrado'
    });
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

