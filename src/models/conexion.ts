import mongoose from 'mongoose';
import {config} from "../config";

mongoose.set('strictQuery', true);

export const connectedToMongo = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
