import { Router } from "express";
const router = Router();
import { register, login, profile, listUsers, updateUser, uploadAvatar, avatar, reportAlert, addFavoriteLocation } from "../controllers/users.js";
import { ensureAuth } from "../middlewares/auth.js";
import multer from "multer";
import User from "../models/users.js";
import Location from "../models/location.js";
import { checkEntityExists } from "../middlewares/checkEntityExists.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary';

// Configuración de subida de archivos en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
    public_id: (req, file) => 'avatar-' + Date.now()
  }
});

// Configurar multer con límites de tamaño
const uploads = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 } // Limitar tamaño a 1 MB
});

// Definir las rutas
router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', ensureAuth, profile);
router.get('/list/:page?', ensureAuth, listUsers);
router.put('/update', ensureAuth, updateUser);

// Subida de avatar con Cloudinary
router.post('/upload-avatar', [ensureAuth, checkEntityExists(User, 'user_id'), uploads.single("file0")], uploadAvatar);
router.get('/avatar/:file', avatar);

// Ruta para reportar una alerta de desastre
router.post('/report-alert', ensureAuth, reportAlert);

// Ruta para agregar una ubicación favorita
router.post('/add-favorite-location', [ensureAuth, checkEntityExists(Location, 'location_id')], addFavoriteLocation);

// Exportar el Router
export default router;
