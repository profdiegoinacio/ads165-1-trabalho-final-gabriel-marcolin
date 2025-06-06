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

## Decisões arquiteturais

### Backend
- Framework: Spring Boot
- Estrutura organizada em pacotes:
   - `controller` – exposição dos endpoints REST
   - `service` – lógica de negócio
   - `model` – entidades do sistema
   - `dto` – transferência de dados
   - `repository(WIP)` – será feito caso tenhamos integração com JPA

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

| Método | Rota               | Descrição                          |
|--------|--------------------|------------------------------------|
| GET    | `/usuarios`        | Lista todos os usuários            |
| GET    | `/usuarios/{id}`   | Retorna um usuário por ID          |
| POST   | `/usuarios`        | Cadastra um novo usuário           |
| PUT    | `/usuarios`        | Atualiza um usuário existente      |
| PATCH  | `/usuarios/{id}`   | Atualiza parcialmente por ID       |
| DELETE | `/usuarios/{id}`   | Remove um usuário por ID           |

### Avaliações

| Método | Rota                 | Descrição                            |
|--------|----------------------|--------------------------------------|
| GET    | `/avaliacoes`        | Lista todas as avaliações            |
| GET    | `/avaliacoes/{id}`   | Retorna uma avaliação por ID         |
| POST   | `/avaliacoes`        | Cadastra uma nova avaliação          |
| PUT    | `/avaliacoes`        | Atualiza uma avaliação existente     |
| PATCH  | `/avaliacoes/{id}`   | Atualiza parcialmente por ID         |
| DELETE | `/avaliacoes/{id}`   | Remove uma avaliação por ID          |

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
- Integração futura com banco de dados e autenticação

## Autor

Gabriel Marcolin  
Todos os direitos reservados – 2025
