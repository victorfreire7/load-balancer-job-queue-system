import { createClient } from 'redis';
import { config } from "dotenv";
config();

const redis_user:any = process.env.REDIS_USER
const redis_password:any = process.env.REDIS_PASSWORD
const redis_host:any = process.env.REDIS_HOST

const client = createClient({
    username: redis_user,
    password: redis_password,
    socket: {
        host: redis_host,
        port: 13460
    }
});

export default client;