# Load Balancer 

## Sobre o projeto

Este projeto foi desenvolvido com fins de estudo, com foco em aprofundar o entendimento sobre arquiteturas de sistemas distribuídos e bancos de dados não relacionais.

A aplicação implementa um Load Balancer com gerenciamento de tarefas baseado em filas (queues), explorando na prática conceitos de distribuição de carga, processamento assíncrono e escalabilidade.

### Tecnologias utilizadas

- **TypeScript** — tipagem estática e maior robustez no desenvolvimento
- **Redis** — gerenciamento de filas e cache em memória
- **MongoDB** — persistência de dados não relacional
- **Express** — camada de servidor HTTP leve e flexível

O principal objetivo é experimentar padrões que favorecem alta performance e baixa latência na execução de tarefas concorrentes.

### Testes de Performance

| Qtd. Handler's | 1º Teste | 2º Teste | 3º Teste |
|--------------|----------|----------|----------|
| Sem Load-Balancer | 10.8 s | 11.4 s | 11.2 s |
| 1 Handler | 6.42 s | 6.32 s | 6.36 s |
| 2 Handler's | 6.32 s | 6.35 s | 6.4 s |
| 3 Handler's | 6.37 s | 6.3 s | 6.70 s |
| 4 Handler's | 6.24 s | 5.99 s | 6.19 s|

- Redução de tempo = 47.8% mais rápido.

---
## Execution Flow

![](./public//worke-flow.png)

---
## Como adicionar mais Handler's ao projeto

<!--ADICIONAR NOVO CÓDIGO DEPOIS-->

- Dentro do arquivo 'src/api/controller/index.ts' alterar a váriavel 'handler_numbs' para a quantidade de handler's desejada.

``` ts
    import redis from '../../config/redis.ts';
    const handler_numbs: number = 2; // <-- Aqui

    type User = {
    [...]
```

- Após realizado, dentro da pasta 'src/handlers' criar um novo arquivo 'handler' com o seguinte código:

``` ts 
    import mongo_schema from '../api/model/User.ts';

    import mongodb from '../config/mongo.ts';
    import redis from '../config/redis.ts';

    import express from 'express';
    const app: express.Express = express();

    const handler_name: string = 'HANDLE_1';
    const port: number = 8080;

    type User = {
        email: string,
        password: string
    }

    await redis.connect()
    .then(() => console.log('redis connect'));

    await mongodb()
    .then(() => console.log(`mongodb connect in port ${port}`));

    app.listen(port, () => { 
        setInterval( async (): Promise<void> => {
            let HANDLE_1: string[] | null = await redis.lRange(handler_name, 0, -1) 
            
            if(HANDLE_1.length > 0){
                const user: any = await redis.lmPop( 
                    handler_name,
                    'RIGHT',
                ); 
        

                if(user && user[1]){
                    const user_json: User = JSON.parse(user[1][0]);
                
                    console.log(user_json)  
            
                    await mongo_schema.create({
                        email: user_json.email,
                        password: user_json.password
                    });
                }
            }
        }, 0);  
    });
```
- Não esqueça de alterar ```  const port: number = 8080; ``` para uma porta não utilizada e ```const handler_name: string = "HANDLE_1" ``` com "1" respectivo ao número do handler.
---
## Executando o Projeto
 
1. Realizar o clone desse repositório:
```bash
    git clone https://github.com/victorfreire7/job-queue-system.git

    cd job-queue-system
```

2. Preencher as variáveis de ambiente:
``` ts
    MONGO_CONNECTIONSTRING=
    MONGO_URI=
    MONGO_USER=
    REDIS_USER=
    REDIS_PASSWORD=
```

3. Executar o server da API:
``` bash
    node src/api/server.ts
```

4. Executar todos os handler's criado:
```bash
    node src/handler/handler.one.ts
    node src/handler/handler.two.ts
    [...]
```

5. A aplicação ficará ativa em [```127.0.0.1:5000```](http://127.0.0.1:5000).
---
## File Tree

```
    redis-connect/
    ├─ src/
    │  ├─ api/
    │  │  ├─ controller/
    │  │  │  └─ index.ts
    │  │  ├─ model/
    │  │  │  └─ User.ts
    │  │  └─ server.ts
    │  ├─ config/
    │  │  ├─ mongo.ts
    │  │  └─ redis.ts
    │  └─ handler/
    │     ├─ handler.one.ts
    │     └─ handler.two.ts
    ├─ .env
    ├─ .env.example
    ├─ .gitignore
    ├─ package-lock.json
    ├─ package.json
    ├─ README.md
    └─ tsconfig.json
```
---
## Dependências e Dependências de Desenvolvedor

```json
    "devDependencies": {
        "@types/express": "^5.0.6",
        "typescript": "^6.0.3"
    },
    "dependencies": {
        "dotenv": "^17.4.2",
        "express": "^5.2.1",
        "mongodb": "^7.2.0",
        "mongoose": "^9.5.0",
        "redis": "^5.12.1"
    }
```