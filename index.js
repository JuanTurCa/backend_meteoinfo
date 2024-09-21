import express from "express";
import server from "./database/server.js";
import cors from "cors";
import dotenv from "dotenv";

//Importar Rutas
import UserRoutes from "./routes/usuario.js";
import LocationRoutes from "./routes/ubicacion.js"
import AlertRoutes from "./routes/alerta.js"
import SearchHistoryRoutes from "./routes/historial.js"

dotenv.config();

// Conexión a la BD
server();

// Crear el servidor de Node
const app = express();
const puerto = process.env.PORT || 3900;

// Configurar CORS
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Middleware para parsing JSON
app.use(express.json());

// Configurar rutas
app.use('/meteoinfo/usuarios', UserRoutes);
app.use('/meteoinfo/ubicaciones', LocationRoutes);
app.use('/meteoinfo/alertas', AlertRoutes);
app.use('/meteoinfo/historial', SearchHistoryRoutes);

// Configurar el servidor
app.listen(puerto, () => {
  console.log("Servidor de Node ejecutándose en el puerto", puerto);
});

export default app;
