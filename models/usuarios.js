import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }],
  image: {
    type: String,
    default: "default.png"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Añadir el plugin de paginación de Mongo
UserSchema.plugin(mongoosePaginate);

export default model("User", UserSchema, "users");
