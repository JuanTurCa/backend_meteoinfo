import { Router } from "express";
const router = Router();
import { register, login, profile, listUsers, updateUser, uploadAvatar, avatar } from "../controllers/usuario.js";
import { reportAlert } from "../controllers/alerta.js"; // Cambiado a controlador de alertas
import { ensureAuth } from "../middlewares/auth.js";
import multer from "multer";
import User from "../models/usuarios.js";
import Location from "../models/ubicaciones.js";
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
router.put('/update', ensureAuth, updateUser);

// Subida de avatar con Cloudinary
router.post('/upload-avatar', [ensureAuth, checkEntityExists(User, 'user_id'), uploads.single("file0")], uploadAvatar);
router.get('/avatar/:file', avatar);

// Exportar el Router
export default router;
