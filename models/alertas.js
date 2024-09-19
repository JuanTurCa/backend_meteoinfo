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
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    latitude: Number,
    longitude: Number
  },
  description: {
    type: String,
    required: true
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
