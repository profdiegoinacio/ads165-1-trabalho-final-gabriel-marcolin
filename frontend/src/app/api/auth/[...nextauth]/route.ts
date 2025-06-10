// src/app/api/auth/[...nextauth]/route.ts
// Route Handler para todas as rotas de autenticação do Auth.js
// Este arquivo é obrigatório e deve estar exatamente neste caminho

// Importar os handlers HTTP do arquivo de configuração principal
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers

// Este arquivo minimalista exporta os handlers que gerenciam:
// - GET /api/auth/session - Obter sessão atual do usuário
// - POST /api/auth/signin - Processo de login com credenciais
// - POST /api/auth/signout - Processo de logout
// - GET /api/auth/providers - Listar provedores de autenticação disponíveis
// - GET /api/auth/csrf - Token CSRF para proteção
// - POST /api/auth/callback/credentials - Callback do provedor de credenciais

// O padrão [...nextauth] é um Dynamic Route que captura todos os segmentos
// Exemplo: /api/auth/signin, /api/auth/session, etc.

// IMPORTANTE: Este arquivo deve ser mantido simples
// Toda a lógica de configuração está no arquivo /src/auth.ts