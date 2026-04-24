import redis from '../config/redis.ts';
import { faker } from '@faker-js/faker';
// import User from '../model/User.ts';


        // 1. criar set: count + "email pass"
        // 2. verificar qual handle esta mais disponivel
        // 3. adicionar um append no value com o handle que esta mais vazio
        // 4. adicionar 1 no contador

const store = async (req: any, res: any) => {
    try {
        const email = faker.internet.email();
        const password = faker.internet.password();
        const info:any = `${email} ${password}`;

        let handle:string | any = 'HANDLE_2';

        await redis.lPush(
            handle, 
            info 
        );

        const HANDLE_1 = await redis.lRange("HANDLE_1", 0, -1) // RETORNO = ARRAY
        const HANDLE_2 = await redis.lRange("HANDLE_2", 0, -1) // RETORNO = ARRAY

        console.log(HANDLE_1)
        console.log(HANDLE_2)

        res.json({
            "HANDLE": handle,
            "EMAIL": email, 
            "PASSWORD": password
        })

    } catch (error) {
        console.error(`ERRO: ${error}`)
    }
  
  
    // try {
    //     const user = await User.create({
    //         email: faker.internet.email(),
    //         password: faker.internet.password()
    //     });

    //     return res.json(user);
    // } catch (error) {
    //     console.error(`ERRO: ${error}`)        
    // }
}

export default { store }