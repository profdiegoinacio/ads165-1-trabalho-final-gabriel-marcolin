# Plataforma de Serviços Comunitários

Este projeto é uma aplicação web para gestão e contratação de serviços comunitários. Ele é dividido em dois módulos principais:

- **Backend** (Java + Spring Boot)
- **Frontend** (Next.js 15 + TypeScript)

## Requisitos

### Backend
- Java 17 ou superior
- Maven 3.8 ou superior

### Frontend
- Node.js 18 ou superior
- npm 9+

## Como configurar e executar

### Backend

1. Clone o repositório e vá para o diretório do backend:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd backend
   ```

2. Compile e execute a aplicação:
   ```bash
   ./mvnw spring-boot:run
   ```

3. A API estará disponível em:
   ```
   http://localhost:8080
   ```

### Frontend

1. Acesse o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o projeto:
   ```bash
   npm run dev
   ```

4. A interface estará disponível em:
   ```
   http://localhost:3000
   ```
   
5. Os dados de acesso são:
- admin (admin123)
- user (user123)

## Decisões arquiteturais

### Backend
- Framework: Spring Boot
- Estrutura organizada em pacotes:
   - `controller` – exposição dos endpoints REST
   - `service` – lógica de negócio
   - `model` – entidades do sistema
   - `dto` – transferência de dados
   - `repository` – comunicação com o banco de dados

### Frontend
- Framework: Next.js 15 (App Router)
- Linguagem: TypeScript
- Estilização: Tailwind CSS
- Pastas principais:
   - `components/` – componentes reutilizáveis
   - `api/` – integração com backend
   - `app/` – estrutura de rotas e páginas

## Endpoints da API

### Serviços

| Método | Rota                | Descrição                          |
|--------|---------------------|------------------------------------|
| GET    | `/servicos`         | Lista todos os serviços            |
| GET    | `/servicos/{id}`    | Retorna um serviço por ID          |
| POST   | `/servicos`         | Cadastra um novo serviço           |
| PUT    | `/servicos`         | Atualiza um serviço existente      |
| PATCH  | `/servicos/{id}`    | Atualiza parcialmente por ID       |
| DELETE | `/servicos/{id}`    | Remove um serviço por ID           |

### Usuários

| Método | Rota                        | Descrição                            |
|--------|-----------------------------|--------------------------------------|
| GET    | `/usuarios`                 | Lista todos os usuários              |
| GET    | `/usuarios/{id}`            | Retorna um usuário por ID            |
| GET    | `/usuarios/nome/{username}` | Retorna um usuário pelo seu username |
| PUT    | `/usuarios`                 | Atualiza um usuário existente        |
| PATCH  | `/usuarios/{id}`            | Atualiza parcialmente por ID         |
| DELETE | `/usuarios/{id}`            | Remove um usuário por ID             |

### Avaliações

| Método | Rota                                            | Descrição                                                        |
|--------|-------------------------------------------------|------------------------------------------------------------------|
| GET    | `/avaliacoes`                                   | Lista todas as avaliações                                        |
| GET    | `/avaliacoes/{id}`                              | Retorna uma avaliação por ID                                     |
| GET    | `/avaliacoes/existe`                            | Retorna se existe uma avaliação para determinado serviço/usuário |
| GET    | `/avaliacoes/existe-por-servico/{servicoId}`    | Retorna se existe uma avaliação para determinado serviço         |
| GET    | `/avaliacoes/media/{servicoid}`                 | Retorna a média de avaliações de um serviço                      |
| POST   | `/avaliacoes`                                   | Cadastra uma nova avaliação                                      |
| PUT    | `/avaliacoes`                                   | Atualiza uma avaliação existente                                 |
| PATCH  | `/avaliacoes/{id}`                              | Atualiza parcialmente por ID                                     |
| DELETE | `/avaliacoes/{id}`                              | Remove uma avaliação por ID                                      |

### Autenticação

| Método | Rota             | Descrição            |
|--------|------------------|----------------------|
| POST   | `/auth/login`    | Rota de Login        |
| POST   | `/auth/register` | Rota de registrar-se |

### Exemplo de requisição: `POST /servicos`

```json
{
  "titulo": "Aula de Matemática",
  "descricao": "Aulas para ensino médio e fundamental",
  "categoria": "Educação",
  "preco": 50.0,
  "telefone": "11999999999",
  "idUsuario": 1
}
```

## Funcionalidades principais

- Listagem, filtro e ordenação de serviços
- Cadastro, edição e exclusão de serviços
- Detalhamento e contratação com confirmação de senha
- Histórico de serviços contratados (em progresso)
- Avaliações de serviços prestados
- Segurança usando JWT para o backend, e NextAuthJS para o frontend
- Conexão com banco de dados PostgreSQL

## Autor

Gabriel Marcolin  
Todos os direitos reservados – 2025
