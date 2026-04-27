import redis from '../../config/redis.ts';
import { faker } from '@faker-js/faker';
let i = 0

const random_num = (min : number, max : number) => {
    return Math.round(Math.random() * (max - min) + min);
}

const store = async (req: any, res: any) => {
    while (i < 1000) {        
        try {
            const email = faker.internet.email();
            const password = faker.internet.password();
            const info:any = `${email} ${password}`;
            const rand: number = random_num(0.6, 4.49)
    
            let handle:string | any = `HANDLE_${rand}`;
      
    
            // LPUSH (HANDLE_1 || HANDLE_2) "EMAIL PASSWORD"
    
            await redis.lPush(
                handle, 
                info 
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