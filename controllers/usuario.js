import User from "../models/usuarios.js";
import bcrypt from "bcrypt";
import { createToken } from "../servicios/jwt.js";

// Método de prueba de usuario
export const testUser = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde el controlador user.js",
    user: req.user
  });
}

// Método Registro de Usuarios
export const register = async (req, res) => {
  try {
    let params = req.body;

    if (!params.name || !params.email || !params.password) {
      return res.status(400).send({
        status: "error",
        message: "Faltan datos por enviar"
      });
    }

    let user_to_save = new User({
      name: params.name,
      email: params.email.toLowerCase(),
      password: params.password,
      favorites: []
    });

    const existingUser = await User.findOne({ email: user_to_save.email });

    if (existingUser) {
      return res.status(409).send({
        status: "error",
        message: "¡El usuario ya existe!"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_to_save.password, salt);
    user_to_save.password = hashedPassword;

    await user_to_save.save();

    return res.status(201).json({
      status: "created",
      message: "Registro de usuario exitoso",
      user_to_save
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error en el registro de usuario"
    });
  }
}

// Método de autenticación de usuarios (login)
export const login = async (req, res) => {
  try {
    let params = req.body;

    if (!params.email || !params.password) {
      return res.status(400).send({
        status: "error",
        message: "Faltan datos por enviar"
      });
    }

    const user = await User.findOne({ email: params.email.toLowerCase() });

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    const validPassword = await bcrypt.compare(params.password, user.password);

    if (!validPassword) {
      return res.status(401).send({
        status: "error",
        message: "Contraseña incorrecta"
      });
    }

    const token = createToken(user);

    return res.status(200).json({
      status: "success",
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        favorites: user.favorites
      }
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error en la autenticación del usuario"
    });
  }
}

// Método para mostrar el perfil del usuario
export const profile = async (req, res) => {
  try {
    const userId = req.params.id;

    const userProfile = await User.findById(userId).select('-password');

    if (!userProfile) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    return res.status(200).json({
      status: "success",
      user: userProfile
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al obtener el perfil del usuario"
    });
  }
}

// Método para listar usuarios
export const listUsers = async (req, res) => {
  try {
    let page = req.params.page ? parseInt(req.params.page, 10) : 1;
    let itemsPerPage = req.query.limit ? parseInt(req.query.limit, 10) : 10;

    const options = {
      page: page,
      limit: itemsPerPage,
      select: '-password'
    };
    const users = await User.paginate({}, options);

    if (!users || users.docs.length === 0) {
      return res.status(404).send({
        status: "error",
        message: "No existen usuarios disponibles"
      });
    }

    return res.status(200).json({
      status: "success",
      users: users.docs,
      totalDocs: users.totalDocs,
      totalPages: users.totalPages,
      currentPage: users.page
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al listar los usuarios"
    });
  }
}

// Método para actualizar los datos del usuario
export const updateUser = async (req, res) => {
  try {
    let userToUpdate = req.body;

    if (userToUpdate.password) {
      const salt = await bcrypt.genSalt(10);
      userToUpdate.password = await bcrypt.hash(userToUpdate.password, salt);
    } else {
      delete userToUpdate.password;
    }

    const userUpdated = await User.findByIdAndUpdate(req.user.userId, userToUpdate, { new: true });

    if (!userUpdated) {
      return res.status(400).send({
        status: "error",
        message: "Error al actualizar el usuario"
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Usuario actualizado correctamente",
      user: userUpdated
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al actualizar el usuario"
    });
  }
}

// Método para subir AVATAR (imagen de perfil) y actualizar el campo image del User
export const uploadAvatar = async (req, res) => {
  try {
    // Verificar si se ha subido un archivo
    if(!req.file){
      return res.status(400).send({
        status: "error",
        message: "Error la petición no incluye la imagen"
      });
    }

    // Obtener la URL del archivo subido a Cloudinary
    const avatarUrl = req.file.path; // Esta propiedad contiene la URL de Cloudinary

    // Guardar la imagen en la BD
    const userUpdated = await User.findByIdAndUpdate(
      req.user.userId,
      { image: avatarUrl },
      { new: true }
    );

    // verificar si la actualización fue exitosa
    if (!userUpdated) {
      return res.status(500).send({
        status: "error",
        message: "Eror en la subida de la imagen"
      });
    }

    // Devolver respuesta exitosa
    return res.status(200).json({
      status: "success",
      user: userUpdated,
      file: avatarUrl
    });

  } catch (error) {
    console.log("Error al subir archivos", error)
    return res.status(500).send({
      status: "error",
      message: "Error al subir archivos"
    });
  }
}

// Método para mostrar el AVATAR (imagen de perfil)
export const avatar = async (req, res) => {
  try {
    // Obtener el parámetro del archivo desde la url
    const userId = req.params.file;

    // Buscar al usuario en la base de datos para obtener la URL de Cloudinary
    const user = await User.findById(userId).select('image');

    // Verificar si el usuario existe y tiene una imagen
    if (!user || !user.image) {
      return res.status(404).send({
        status: "error",
        message: "No existe la imagen o el usuario"
      });
    }

    // Devolver la URL de la imagen desde Cloudinary
    return res.status(200).json({
      status: "success",
      imageUrl: user.image // URL de Cloudinary almacenada en la BD
    });

  } catch (error) {
    console.log("Error al mostrar la imagen", error)
    return res.status(500).send({
      status: "error",
      message: "Error al mostrar la imagen"
    });
  }
}

