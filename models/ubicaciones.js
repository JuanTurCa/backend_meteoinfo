import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const LocationSchema = Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Referencia a la colección User
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Añadir el plugin de paginación de Mongo
LocationSchema.plugin(mongoosePaginate);

export default model("Location", LocationSchema, "locations");

