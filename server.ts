import express from 'express';
import redis from './src/config/redis.ts';
const app = express();

app.use(express.json());

await redis.connect()
.then(()=>console.log('connect'));

await redis.set('key', 'value')
.then(()=>console.log('set'))

await redis.get('key')
.then((result)=>console.log(result));


app.listen('8080', () => {
    console.log(`http://127.0.0.1:8080`)
})
