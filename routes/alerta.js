import { Router } from "express";
const router = Router();
import { reportAlert, listAlerts, resolveAlert } from "../controllers/alerta.js";
import { ensureAuth } from "../middlewares/auth.js";

// Rutas para gestionar alertas
router.post('/report', ensureAuth, reportAlert); // Reportar una nueva alerta
router.get('/list', ensureAuth, listAlerts); // Listar todas las alertas activas
router.put('/resolve/:id', ensureAuth, resolveAlert); // Marcar una alerta como resuelta

export default router;
