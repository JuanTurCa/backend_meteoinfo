import jwt from 'jwt-simple';
import moment from 'moment';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Clave secreta para el token, obtenida desde variables de entorno
const secret = process.env.JWT_SECRET; // Asegúrate de que JWT_SECRET esté definida en tu archivo .env

// Generar el token
const createToken = (user) => {
    const payload = {
        userId: user._id, // ID de usuario en MongoDB
        name: user.name,
        email: user.email,
        // Fecha de creación y expiración del token
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix() // Expira en 15 días
    };
    return jwt.encode(payload, secret);
};

export {
    secret,
    createToken
};
