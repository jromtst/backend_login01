const {pool} = require('../database/db.js');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt.js');

const login = async(req, res) => {

    const {username, password} = req.body;

    /**
     * Verificamos que exista un usuario con esa contraasenia 
     */

    try {
        const result = await pool.query(`SELECT COUNT(1) AS qres FROM usuario WHERE username = '${username}'`);
        if(result[0][0].qres < 1){
            return res.status(404).json({
                ok : false,
                msg : 'Usuario o contraseña incorrectos'
            })
        }
        
        /**
         * Comparar la contraseña que se pasa por req
         * con bcrypt
         */
        const u_pass_res = await pool.query(`SELECT password AS u_pass, id AS u_id FROM usuario WHERE username = '${username}'`);
        const u_pass = u_pass_res[0][0].u_pass;

        const valid_pass = bcrypt.compareSync(password, u_pass);

        if(!valid_pass){
            return res.status(404).json({
                ok : false,
                msg : 'Usuario o contraseña incorrectos'
            })
        }
        
        /**
         * parte para generar el token 
         * ya que sabemos que se logueo bien 
         */
        const token = await generarJWT(u_pass_res[0][0].u_id);

        res.status(200).json({
            ok : true,
            token
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg : 'Error inesperado, contate al adminstrador de sistemas'
        });
    }
}

const register = async(req, res) => {
    const {name, username, password } = req.body;

    try { 
        /**
         * Verificar que no exista un usuario igual
         */
        const [ver_username] = await pool.query(`SELECT COUNT(1) as qres FROM usuario WHERE username = '${username}'`);
        if(ver_username[0].qres > 0){
            return res.status(404).json({
                ok : false,
                msg : `Ya existe un usuario ${username}, favor de intentar con otro nombre de usuario`
            });
        }

        /**
         * Encriptación de la contraseña
         */
        const salt = bcrypt.genSaltSync();
        const encripted_pass = bcrypt.hashSync(password, salt);

        /**
         * Insert del usuario nuevo
         */
        const [result] = await pool.query(`INSERT INTO usuario (name, username, password) VALUES ('${name}','${username}','${encripted_pass}')`);

        if(result.affectedRows != 1){
            return res.status(404).json({
                ok : false,
                msg : 'Error al crear al usuario'
            });
        }

        /**
         * ya que el usuario se creo correctamente vamos a generar su token
         */
         const token = await generarJWT(result.insertId);
        
        res.status(200).json({
            ok : true,
            msg : 'Usuario creado correctamente',
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg : 'Error inesperado, contate al adminstrador de sistemas'
        });
    }
} 

module.exports = {
    login, 
    register
}