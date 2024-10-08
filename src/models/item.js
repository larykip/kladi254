// models/item.js
import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;
