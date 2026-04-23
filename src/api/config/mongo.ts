import mongoose from "mongoose";
import { config } from 'dotenv';
config();

const connectionstring:any = process.env.MONGO_CONNECTIONSTRING;

const db = async () => {
    try {
        await mongoose.connect(connectionstring);
        console.log('mongoDB connection OK')
    } catch (error) {
        console.error(`ERRO: ${error}`)        
    }
}

export default db;