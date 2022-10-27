const jwt = require('jsonwebtoken');
const {SECRET_JWT} = require('../config.js');

const generarJWT = (u_id) => {
    return new Promise ( (resolve, reject) => {
        const payload = {
            u_id
        };

        jwt.sign(payload,SECRET_JWT,{
            expiresIn: '1h'
        },
        (err, token) => {
            if (err) {
                console.log(err);
                reject('Token process error');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT,
}