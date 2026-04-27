import mongo_schema from '../api/model/User.ts';

import mongodb from '../config/mongo.ts';
import redis from '../config/redis.ts';

import express from 'express';
const app: express.Express = express();
const port: number = 8080;

await redis.connect()
.then(() => console.log('redis connect'));

await mongodb()
.then(() => console.log(`mongodb connect in port ${port}`));

app.listen(port, async () => {                            
    const user = await redis.lmPop( // LRANGE HANDLE_2 0 -1
        'HANDLE_1',
        'RIGHT',
    ); // retorno: [ 'HANDLE_2', [ 'Katrina.Grady29@gmail.com G9KHj1MpR4aaEto' ] ]
});