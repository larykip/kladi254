import mongoose, { Schema } from "mongoose";

// Define the schema for saved items
const savedItemSchema = new Schema({
    itemId: { type: String, required: true }, // Assuming item IDs are strings
    itemDetails: { 
        // Add any other details you want to store about the item
        text: String,
        img: String,
        price: Number,
        description: String,
    },
});

// Define the user schema
const userSchema = new Schema({
    username: {
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
        required: true,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    savedItems: [savedItemSchema] // Array of saved items
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
