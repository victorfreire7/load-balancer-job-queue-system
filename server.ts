import express from 'express';
import db from './src/config/redis.ts';
const app = express();

app.use(express.json());

await db.connect()
.then(()=>console.log('connect'));

await db.set('key', 'value')
.then(()=>console.log('set'))

await db.get('key')
.then((result)=>console.log(result));


app.listen('8080', () => {
    console.log(`http://127.0.0.1:8080`)
})
