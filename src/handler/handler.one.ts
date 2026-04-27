import mongo_schema from '../api/model/User.ts';

import mongodb from '../config/mongo.ts';
import redis from '../config/redis.ts';

import express from 'express';
const app: express.Express = express();

const handler_name: string = 'HANDLE_1' 
const port: number = 8080;

await redis.connect()
.then(() => console.log('redis connect'));

await mongodb()
.then(() => console.log(`mongodb connect in port ${port}`));

type User = {
    email: string,
    password: string
}

app.listen(port, async (): Promise<void> => { 
    while (true) {   
        let HANDLE_1: string[] | null = await redis.lRange(handler_name, 0, -1) // BUSCANDO O TAMANHO DO HANDLER RETORNO = ARRAY
        
        if(HANDLE_1.length > 0){
            const user: any = await redis.lmPop( // como lmpush guarda itens em formato de pilha, eu estou buscando o item da direita para esquerda (do ultimo para o primeiro)
                handler_name,
                'RIGHT',
            ); // retorno: [ 'HANDLE_2', [ 'Katrina.Grady29@gmail.com G9KHj1MpR4aaEto' ] ]
            
            const user_json: User = JSON.parse(user[1][0]);

            console.log(user_json)
            
            await mongo_schema.create({ // estou buscando o schema de dentro da API; talvez nao seja a melhor maneira de fazer isso.
                email: user_json.email,
                password: user_json.password
            });
    } else {
            continue;
        }
    }
});