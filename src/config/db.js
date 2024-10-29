import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Conection at ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
}
