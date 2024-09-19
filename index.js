import express from "express";
import server from "./database/server.js";
import cors from "cors";
import UserRoutes from "./routes/user.js";
import LocationRoutes from "./routes/location.js";
import AlertRoutes from "./routes/alert.js";
import dotenv from "dotenv";
import SearchHistoryRoutes from "./routes/searchHistory.js";

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
