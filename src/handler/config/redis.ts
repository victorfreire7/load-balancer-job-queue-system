import { createClient } from 'redis';
import { config } from 'dotenv';
config();

const redis_user:any = process.env.REDIS_USER
const redis_password:any = process.env.REDIS_PASSWORD

const client = createClient({
    username: redis_user,
    password: redis_password,
    socket: {
        host: 'redis-13460.c308.sa-east-1-1.ec2.cloud.redislabs.com',
        port: 13460
    }
});

export default client;