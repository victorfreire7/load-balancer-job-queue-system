import redis from '../../config/redis.ts';
const handler_numbs: number = 2;

type User = {
    email: string,
    password: string
}

const rand_numb = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min) + min);
}

const store = async (req: any, res: any) => {
    try {
        // const info:string = `${req.body.email} ${req.body.password}`;
        const user: User = { email: req.body.email, password: req.body.password }
        const rand: number = rand_numb(0.59, handler_numbs + 0.49)

        let handle:string = `HANDLE_${rand}`;
        let user_json = JSON.stringify(user);
        
        await redis.lPush(
            handle, 
            user_json
        );

        res.json({
            "HANDLE": handle,
            "USER": user
        })

    } catch (error) {
        console.error(`ERRO: ${error}`)
    }
}

export default { store }