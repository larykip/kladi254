import mongoose from 'mongoose';

const savedItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    required: true,
    ref: 'User',
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Item model
    required: true,
    ref: 'Item',
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
  item: {
    id: { type: String, required: true },
    img: { type: String, required: true },
    text: { type: String, required: true },
    price: { type: Number, required: true },
  }
});

const SavedItem = mongoose.models.SavedItem || mongoose.model('SavedItem', savedItemSchema);

export default SavedItem;
