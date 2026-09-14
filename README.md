# Blog API

Uma API RESTful para uma plataforma de blog.

## Tech Stack

- **Liguagem**: JavaScript (ESM)
- **Runtime**: Node.js
- **Framework**: Express 5
- **Banco de dados**: PostgreSQL
- **ORM**: Prisma 7 (`@prisma/adapter-pg`)
- **Autenticação**: JWT, bcrypt
- **Validação**: express-validatior

## Estrutura do projeto

```text
blog-api/
├── src/
│   ├── controllers/
│   │   ├── authController.js
|   |   ├── commentController.js
│   │   ├── postController.js
│   │   └── userController.js
│   │
│   ├── lib/
│   │   └── prisma.js
|   |
│   ├── middlewares/
│   │   ├── authenticateToken.js
│   │   └── errorHandler.js
│   │
│   ├── routes/
│   │   ├── authRouter.js
│   │   ├── commentRouter.js
│   │   ├── postRouter.js
│   │   └── userRouter.js
│   │
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
|   |
│   ├── utils/
│   │   ├── CustomError.js
│   │   ├── hashPassword.js
│   │   └── validation.js
│   │
│   └── app.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── prisma7.config.js
└── README.md
```

## Pré-requisitos

- Node.js (v18+)
- PostgreSQL

## Instalação

1. Instale as dependências:

    ```bash
    npm install
    ```

2. Crie um arquivo `.env` na raiz do projeto (veja [Variáveis de Ambiente](#variáveis-de-ambiente)).

3. Execute as migrações do prisma:
    ```bash
    npx prisma migrate dev
    ```

4. Inicie o servidor:
    ```bash
    npm run dev
    ```
    O servidor roda em `http://localhost:3000` por padrão.

## Variáveis de Ambiente

| Variável              | Descrição                         | Exemplo                                                 |
| --------------------- | --------------------------------- | -------------------------------------------------- -----|
| `DATABASE_URL`        | Conexão com PostgreSQL            | `postgresql://usuario:senha@localhost:5432/nomedobanco` |
| `ACCESS_TOKEN_SECRET` | Chave para assinar tokens JWT     | `sua-chave-secreta`                                     |
| `PORT`                | Porta de escuta do servidor       | `3000` (padrão)                                         |

## Endpoints da API

### Autenticação

| Method | Endpoint       | Description                   |
| ------ | -------------- | ----------------------------- |
| POST   | `/auth/login`  | Conecta e recebe um token JWT |

### Posts

| Método | Endpoint             | Autenticação | Descição                               |
| ------ | -------------------- | ------------ | -------------------------------------- |
| GET    | `/posts`             | Opcional     | Lista todos os posts                   |
| GET    | `/posts/:id`         | Opcional     | Busca um único post e seus comentários |
| POST   | `/posts`             | Obrigatória  | Cria um novo post                      |
| PUT    | `/posts/:id`         | Obrigatória  | Atualiza um post                       |
| DELETE | `/posts/:id`         | Obrigatória  | Deleta um post                         |

### Comentários

| Método | Endpoint             | Autenticação | Descição                               |
| ------ | -------------------- | ------------ | -------------------------------------- |
| GET    | `/comments`          | Opcional     | Lista todos os comentários             |
| GET    | `/comments/:id`      | Opcional     | Busca um único comentário              |
| POST   | `/comments`          | Obrigatória  | Cria um novo comentário                |
| PUT    | `/comments/:id`      | Obrigatória  | Atualiza um comentário                 |
| DELETE | `/comments/:id`      | Obrigatória  | Deleta um comentário                   |

### Usuários

| Método | Endpoint          | Autenticação | Descição                               |
| ------ | ----------------- | ------------ | -------------------------------------- |
| GET    | `/users`          | Opcional     | Lista todos os usuário                 |
| GET    | `/users/:id`      | Opcional     | Busca um único usuário                 |
| POST   | `/users`          | Obrigatória  | Cria um novo usuário                   |
| PUT    | `/users/:id`      | Obrigatória  | Atualiza um usuário                    |
| DELETE | `/users/:id`      | Obrigatória  | Deleta um usuário                      |
