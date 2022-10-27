require('dotenv').config();

const PORT = process.env.PORT || 3000;
const SECRET_JWT = process.env.SECRET_JWT;

module.exports = {
    PORT,
    SECRET_JWT
}