import { Router } from "express";
const router = Router();
import { listUserHistory, addSearchToHistory } from "../controllers/historial.js";
import { ensureAuth } from "../middlewares/auth.js";

// Rutas para gestionar el historial de búsquedas
router.get('/user/:user_id', ensureAuth, listUserHistory); // Obtener el historial de un usuario
router.post('/add', ensureAuth, addSearchToHistory); // Añadir una nueva búsqueda al historial

export default router;
