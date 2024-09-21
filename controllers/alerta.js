import Alert from "../models/alertas.js";

// Reportar una nueva alerta
export const reportAlert = async (req, res) => {
  try {
    const { user_id, disaster_type, location, description } = req.body;

    if (!user_id || !disaster_type || !location || !description) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar"
      });
    }

    const newAlert = new Alert({
      user_id,
      disaster_type,
      location,
      description
    });

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
