import Location from "../models/ubicaciones.js";
import User from "../models/usuarios.js";

//Metodo para agregar un sitio favorito
export const addLocation = async (req, res) => {
  try {
    const { name, country, city, latitude, longitude } = req.body;
    const userId = req.user.userId; // Obtener el ID del usuario que la añade

    // Validar que todos los datos estén presentes
    if (!name || !country || !city || !latitude || !longitude) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar"
      });
    }

    // Verificar si ya existe una ubicación con las mismas coordenadas
    const existingLocation = await Location.findOne({ latitude, longitude });
    if (existingLocation) {
      return res.status(400).json({
        status: "error",
        message: "Ya existe una ubicación con estas coordenadas"
      });
    }

    // Crear la nueva ubicación, asignando el ID del usuario que la agregó
    const newLocation = new Location({
      name,
      country,
      city,
      latitude,
      longitude,
      addedBy: userId // Guardar el ID del usuario
    });

    // Guardar la nueva ubicación en la base de datos
    await newLocation.save();

    return res.status(201).json({
      status: "success",
      message: "Ubicación añadida con éxito",
      location: newLocation
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al añadir la ubicación"
    });
  }
};

// Listar ubicaciones del usuario logueado
export const listLocations = async (req, res) => {
  try {
    const userId = req.user.userId; // Obtener el ID del usuario logueado

    // Buscar las ubicaciones que fueron añadidas por el usuario logueado
    const locations = await Location.find({ addedBy: userId });

    if (!locations || locations.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se encontraron ubicaciones para este usuario"
      });
    }

    return res.status(200).json({
      status: "success",
      locations
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al listar las ubicaciones"
    });
  }
};

// Eliminar una ubicación
export const deleteLocation = async (req, res) => {
  try {
    const locationId = req.params.id;

    const deletedLocation = await Location.findByIdAndDelete(locationId);

    if (!deletedLocation) {
      return res.status(404).json({
        status: "error",
        message: "Ubicación no encontrada"
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Ubicación eliminada con éxito"
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar la ubicación"
    });
  }
};
