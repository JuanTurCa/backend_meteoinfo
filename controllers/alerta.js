import Alert from "../models/alertas.js";

// Reportar una nueva alerta
export const reportAlert = async (req, res) => {
  try {
    // Extraer los datos desde `req.body` y `req.file`
    const { user_id, disaster_type, country, city, latitude, longitude, description } = req.body;
    
    let file = "default.png"; // Valor por defecto si no se sube una imagen

    // Si existe un archivo, obtener la URL de la imagen subida (usando, por ejemplo, Cloudinary)
    if (req.file) {
      file = req.file.path; // Aquí se asume que Cloudinary devuelve la URL del archivo en `req.file.path`
    }

    // Validar que los campos requeridos estén presentes
    if (!user_id || !disaster_type || !country || !city || !latitude || !longitude || !description) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar"
      });
    }

    // Crear una nueva alerta con los datos correctos
    const newAlert = new Alert({
      user_id,
      disaster_type,
      country,
      city,
      latitude,
      longitude,
      description,
      file // Guardamos el archivo si se subió, o "default.png" si no
    });

    // Guardar la nueva alerta en la base de datos
    await newAlert.save();

    return res.status(201).json({
      status: "success",
      message: "Alerta reportada con éxito",
      alert: newAlert
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al reportar la alerta"
    });
  }
};

// Listar todas las alertas activas
export const listAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ status: 'Active' });

    if (!alerts || alerts.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se encontraron alertas activas"
      });
    }

    return res.status(200).json({
      status: "success",
      alerts
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al listar las alertas"
    });
  }
};

// Resolver una alerta
export const resolveAlert = async (req, res) => {
  try {
    const alertId = req.params.id;

    const updatedAlert = await Alert.findByIdAndUpdate(
      alertId,
      { status: 'Resolved' },
      { new: true }
    );

    if (!updatedAlert) {
      return res.status(404).json({
        status: "error",
        message: "Alerta no encontrada"
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Alerta marcada como resuelta",
      alert: updatedAlert
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al resolver la alerta"
    });
  }
};
