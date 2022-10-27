const {login, register} = require('../controllers/auth.js');
const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos.js');

const router = Router();

router.post('/',[
    check('username','Username es un campo obligatorio').not().isEmpty(),
    check('password','Password es un campo obligatorio').not().isEmpty(),
    validarCampos
],login);
router.post('/register',[
    check('username','Username es un campo obligatorio').not().isEmpty(),
    check('password','Password es un campo obligatorio').not().isEmpty(),
    validarCampos
],register);

module.exports = router;