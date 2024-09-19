import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const SearchHistorySchema = Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  search_term: {
    type: String,
    required: true
  },
  search_date: {
    type: Date,
    default: Date.now
  }
});

// Añadir el plugin de paginación
SearchHistorySchema.plugin(mongoosePaginate);

export default model("SearchHistory", SearchHistorySchema, "search_histories");
