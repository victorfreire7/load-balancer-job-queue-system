import mongo_schema from '../api/model/User.ts';

import mongodb from '../config/mongo.ts';
import redis from '../config/redis.ts';

import express from 'express';
const app: express.Express = express();

const handler_name: string = 'HANDLE_3' 
const port: number = 8082;

await redis.connect()
.then(() => console.log('redis connect'));

await mongodb()
.then(() => console.log(`mongodb connect in port ${port}`));

app.listen(port, async (): Promise<void> => { 
    while (true) {   
        let HANDLE_3: string[] | null = await redis.lRange(handler_name, 0, -1) // RETORNO = ARRAY
        
        if(HANDLE_3.length > 0){
            const user: any = await redis.lmPop( // LRANGE HANDLE_2 0 -1
                handler_name,
                'RIGHT',
            ); // retorno: [ 'HANDLE_2', [ 'Katrina.Grady29@gmail.com G9KHj1MpR4aaEto' ] ]
    
            const user_split: string[] = user[1][0]?.split(' '); // retorno: ['email', 'password']
            let user_email: any = user_split[0];
            let user_password: any = user_split[1];
        
            console.log(user_split)
    
            await mongo_schema.create({ // estou buscando o schema de dentro da API; talvez nao seja a melhor maneira de fazer isso.
                email: user_email,
                password: user_password
            });
        } else {
            continue;
        }
    }
});