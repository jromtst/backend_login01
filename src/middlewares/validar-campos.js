const {validationResult} = require('express-validator');

const validarCampos = (req, res, next) => {
    //revisamos si exsten errores del middleware de express-validator
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok : false,
            errores : errores.mapped()//así podemos mapear los mensajes de errores
        });
    }

    next();
}

module.exports = {validarCampos};