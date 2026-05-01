import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectionstring: string | undefined = process.env.MONGO_CONNECTIONSTRING;

const db = async (): Promise<void> => {
  try {
    if(typeof connectionstring === 'string'){
      await mongoose.connect(connectionstring);
    }
  } catch (error) {
    console.error(`ERRO: ${error}`);
  }
};

export default db;