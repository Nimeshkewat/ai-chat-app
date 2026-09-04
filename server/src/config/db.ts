import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) return;
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Db Connected`);
  } catch (error) {
    console.log(`Error connecting to db: ${error}`);
  }
};

export default connectDb;
