import { faker } from '@faker-js/faker';
import User from '../model/User.ts';

const store = async (req: any, res: any) => {
    try {
        const user = await User.create({
            email: faker.internet.email(),
            password: faker.internet.password()
        });

        return res.json(user);
    } catch (error) {
        console.error(`ERRO: ${error}`)        
    }
}

export default { store }