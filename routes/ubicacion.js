import { Router } from "express";
const router = Router();
import { addLocation, listLocations, deleteLocation } from "../controllers/ubicacion.js";
import { ensureAuth } from "../middlewares/auth.js";

// Rutas para gestionar ubicaciones
router.post('/add', ensureAuth, addLocation); // Añadir nueva ubicación por usuario
router.get('/list', ensureAuth, listLocations); // Listar todas las ubicaciones del usuario auth
router.delete('/delete/:id', ensureAuth, deleteLocation); // Eliminar una ubicación

export default router;
