import SearchHistory from "../models/historiales.js";

// Añadir una nueva búsqueda al historial
export const addSearchToHistory = async (req, res) => {
  try {
    const { user_id, search_term } = req.body;

    if (!user_id || !search_term) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar"
      });
    }

    const newSearch = new SearchHistory({
      user_id,
      search_term
    });

    await newSearch.save();

    return res.status(201).json({
      status: "success",
      message: "Búsqueda añadida al historial",
      search: newSearch
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al añadir la búsqueda al historial"
    });
  }
};

// Listar el historial de un usuario
export const listUserHistory = async (req, res) => {
  try {
    const { user_id } = req.params;

    const history = await SearchHistory.find({ user_id });

    if (!history || history.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No se encontró historial de búsquedas"
      });
    }

    return res.status(200).json({
      status: "success",
      history
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al listar el historial"
    });
  }
};
