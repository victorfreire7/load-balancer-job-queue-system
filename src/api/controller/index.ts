import redis from '../../config/redis.ts';

const store = async (req: any, res: any) => {
    try {
        const info:string = `${req.body.email} ${req.body.password}`;

        const HANDLE_1 = await redis.lRange("HANDLE_1", 0, -1) // RETORNO = ARRAY
        const HANDLE_2 = await redis.lRange("HANDLE_2", 0, -1) // RETORNO = ARRAY

        let handle:string | any = 'HANDLE_1';
        if(HANDLE_1.length > HANDLE_2.length){            
            handle = 'HANDLE_2';
        }

        // LPUSH (HANDLE_1 || HANDLE_2) "EMAIL PASSWORD"

        await redis.lPush(
            handle, 
            info 
        );

        res.json({
            "HANDLE": handle,
            "EMAIL": req.body.email, 
            "PASSWORD": req.body.password
        })

    } catch (error) {
        console.error(`ERRO: ${error}`)
    }
}

export default { store }