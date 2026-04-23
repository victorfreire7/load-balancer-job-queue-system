import express from 'express';
import redis from './src/api/config/redis.ts';
import mongodb from './src/api/config/mongo.ts';
import controller from './src/api/controller/index.ts'
const app = express();

await mongodb()
.then(() => {
    app.emit('mongodb OK')
});

await redis.connect()
.then(()=>console.log('redis connect'));

app.get('/', controller.store);

app.listen('8080', () => {
    console.log(`http://127.0.0.1:8080`)
})
