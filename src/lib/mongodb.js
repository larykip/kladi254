// dbConnect.js
import mongoose from 'mongoose';

const connectMongoDB = async () => {
    const uri = process.env.MONGODB_URI;

    // Debug log to ensure URI is loaded
    console.log('MongoDB URI:', uri);

    if (!uri) {
        throw new Error('MongoDB URI is not defined');
    
    }
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export default connectMongoDB;
