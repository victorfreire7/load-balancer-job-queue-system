import redis from '../../config/redis.ts';
import { faker } from '@faker-js/faker';
let i = 0;
const handler_numbs: number = 1;

type User = {
    email: string,
    password: string
}

const random_num = (min : number, max : number) => {
    return Math.round(Math.random() * (max - min) + min);
}

const store = async (req: any, res: any) => {
    while (i < 1) {        
        try {
            const email = faker.internet.email();
            const password = faker.internet.password();

            const rand: number = random_num(0.59, handler_numbs + 0.49)
    
            const user: User = {
                email: email,
                password: password
            }

    
            await redis.lPush(
                `HANDLE_${rand}`, 
                JSON.stringify(user) 
            );
            i++; 
            continue  
        } catch (error) {
            console.error(`ERRO: ${error}`)
        }
    }

    i = 0;
    res.json({
        "finish": true,
    })
}

export default { store }