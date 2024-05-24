import mongoose from 'mongoose';
import 'dotenv/config';
import process from 'process';

const connectDB = async () => {
    try {
        console.log(process.env)
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;