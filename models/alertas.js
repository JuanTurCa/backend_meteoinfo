import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const AlertSchema = Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  disaster_type: {
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

  latitude: {type: Number, required: true},

  longitude: {type: Number, required: true},

  description: {
    type: String,
    required: true
  },

  image: {
    type: String,
    default: "default.png"
  },

  status: {
    type: String,
    default: 'Active'
  },

  reported_at: {
    type: Date,
    default: Date.now
  }
});

// Añadir el plugin de paginación
AlertSchema.plugin(mongoosePaginate);

export default model("Alert", AlertSchema, "alerts");
