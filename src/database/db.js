const {createPool} = require('mysql2/promise');

const pool = createPool({
    host : 'localhost',
    port : 3306,
    user : 'jromlh',
    password : 'contrasenia',
    database : 'practica'
});

module.exports = {
    pool
}