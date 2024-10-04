import { Router } from "express";
const router = Router();
import { reportAlert, listAlerts, resolveAlert } from "../controllers/alerta.js";
import { ensureAuth } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js"; // El middleware configurado para multer

// Rutas para gestionar alertas
router.post('/report', ensureAuth, upload.single('file'), reportAlert); // Reportar una nueva alerta
router.get('/list', ensureAuth, listAlerts); // Listar todas las alertas activas
router.put('/resolve/:id', ensureAuth, resolveAlert); // Marcar una alerta como resuelta

export default router;
