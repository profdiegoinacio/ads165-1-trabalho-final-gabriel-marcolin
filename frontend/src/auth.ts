// src/auth.ts
// Arquivo central de configuração do Auth.js v5
// Este arquivo define toda a lógica de autenticação da aplicação

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

// Configuração principal do Auth.js
export const config = {
    // Array de provedores de autenticação disponíveis
    providers: [
        // Provedor de credenciais customizado (username/password)
        Credentials({
            // Nome do provedor (usado internamente)
            name: "credentials",

            // Definição dos campos do formulário de login
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Digite seu nome de usuário"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Digite sua senha"
                }
            },

            // Função executada quando o usuário tenta fazer login
            async authorize(credentials) {
                try {
                    // 1. Validação básica dos campos obrigatórios
                    if (!credentials?.username || !credentials?.password) {
                        console.warn('Tentativa de login sem credenciais completas');
                        return null;
                    }

                    // 2. Preparar dados para envio ao backend
                    const loginData = {
                        username: credentials.username,
                        password: credentials.password,
                    };

                    console.log('Tentando autenticar usuário:', credentials.username);

                    // 3. Chamada HTTP para o endpoint de autenticação do backend Spring Boot
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // Headers adicionais se necessário
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify(loginData),
                        // Configurações de timeout e cache
                        cache: 'no-cache',
                    });

                    // 4. Verificar se a resposta foi bem-sucedida
                    if (response.ok) {
                        // Parse da resposta JSON do backend
                        const userData = await response.json();

                        console.log('Login bem-sucedido para usuário:', userData.username);
                        // 5. Retornar objeto do usuário que será armazenado na sessão
                        // IMPORTANTE: Este objeto será disponibilizado nos callbacks jwt() e session()
                        return {
                            id: userData.username,
                            username: userData.username,
                            email: userData.email || `${userData.username}@sistema.com`,
                            roles: userData.roles || [], // Array de papéis/permissões
                            accessToken: userData.accessToken, // JWT do backend para chamadas API
                        };
                    } else {
                        // 6. Tratar erros de autenticação
                        const errorData = await response.json().catch(() => ({}));
                        console.error('Erro de autenticação:', response.status, errorData);
                        return null; // Retorna null para indicar falha na autenticação
                    }

                } catch (error) {
                    // 7. Tratar erros de rede ou outros erros inesperados
                    console.error('Erro na função authorize:', error);
                    return null;
                }
            }
        })
    ],

    // Callbacks são funções que permitem personalizar o comportamento do Auth.js
    callbacks: {
        // Callback JWT: executado sempre que um JWT é criado, atualizado ou acessado
        async jwt({ token, user }) {
            // Este callback é executado:
            // 1. Quando o usuário faz login (user está presente)
            // 2. Quando uma sessão é verificada (apenas token está presente)
            // 3. Quando um token é atualizado

            if (user) {
                // Primeira execução após login bem-sucedido
                // Adicionar dados do usuário ao token JWT
                console.log('Criando token JWT para usuário:', user.username);

                token.accessToken = user.accessToken; // Token do backend
                token.roles = user.roles; // Papéis do usuário
                token.username = user.username; // Nome de usuário
                token.id = user.id; // ID do usuário

                // Adicionar timestamp de criação para controle de expiração
                token.createdAt = Date.now();
            } else {
                // Execuções subsequentes - token já existe
                // Aqui você pode implementar lógica de refresh token se necessário
                console.log('Verificando token existente para usuário:', token.username);

                // Exemplo de verificação de expiração personalizada
                const tokenAge = Date.now() - (token.createdAt as number || 0);
                const maxAge = 60 * 60 * 1000; // 1 hora em millisegundos

                if (tokenAge > maxAge) {
                    console.warn('Token expirado, forçando novo login');
                    // Em uma implementação real, você poderia tentar refresh do token aqui
                    return {}; // Token vazio força novo login
                }
            }

            return token;
        },

        // Callback Session: executado sempre que uma sessão é verificada
        async session({ session, token }) {
            // Este callback é executado:
            // 1. Quando getSession() é chamado
            // 2. Quando useSession() verifica a sessão
            // 3. Em verificações de middleware

            if (token) {
                // Transferir dados do token JWT para o objeto de sessão
                // IMPORTANTE: Apenas dados seguros devem ser expostos ao cliente

                console.log('Criando sessão para usuário:', token.username);

                // Adicionar propriedades customizadas à sessão
                session.accessToken = token.accessToken as string; // Token para chamadas API
                session.user.roles = token.roles as string[]; // Papéis do usuário
                session.user.username = token.username as string; // Nome de usuário
                session.user.id = token.id as string; // ID do usuário

                // Manter propriedades padrão do NextAuth
                session.user.email = session.user.email || `${token.username}@sistema.com`;
                session.user.name = token.username as string;
            } else {
                console.warn('Sessão solicitada sem token válido');
            }

            return session;
        },

        // Callback opcional: redirect - controla redirecionamentos após login/logout
        async redirect({ url, baseUrl }) {
            // Permitir redirecionamentos para URLs internas
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Permitir redirecionamentos para o mesmo domínio
            else if (new URL(url).origin === baseUrl) return url;
            // Fallback para página inicial
            return baseUrl;
        }
    },

    // Configuração de páginas customizadas
    pages: {
        signIn: '/login', // Página customizada de login
        error: '/login', // Redirecionar erros de autenticação para login
        // signOut: '/logout', // Página customizada de logout (opcional)
        // newUser: '/onboarding', // Página para novos usuários (opcional)
    },

    // Configuração de sessão
    session: {
        strategy: "jwt", // Usar JWT ao invés de sessões de banco de dados
        maxAge: 60 * 60, // Duração da sessão: 1 hora (em segundos)
        updateAge: 24 * 60 * 60, // Atualizar sessão a cada 24 horas
    },

    // Configuração de segurança
    secret: process.env.AUTH_SECRET, // Chave secreta para assinar tokens

    // Configuração de debug (apenas em desenvolvimento)
    debug: process.env.NODE_ENV === 'development',

    // Configuração de logger personalizado
    logger: {
        error(message) {
            console.error(`[NextAuth Error] ${message}:`);
        },
        warn(code) {
            console.warn(`[NextAuth Warning] ${code}`);
        },
        debug(code, metadata) {
            if (process.env.NODE_ENV === 'development') {
                console.debug(`[NextAuth Debug] ${code}:`, metadata);
            }
        },
    },

    // Configurações de eventos (opcional)
    events: {
        async signIn({ user, account, profile }) {
            console.log(`Usuário ${user.username} fez login`);
            // Aqui você pode implementar logging, analytics, etc.
        },
        async signOut(message) {
            let username = 'usuário desconhecido';

            // Verificar se o message contém token
            if ('token' in message && message.token) {
                username = (message.token as any).username || 'usuário desconhecido';
            }
            // Verificar se o message contém session
            else if ('session' in message && message.session) {
                // A session pode ter diferentes estruturas dependendo do adapter
                username = (message.session as any).user?.username ||
                    (message.session as any).username ||
                    'usuário desconhecido';
            }

            console.log(`Usuário ${username} fez logout`);
        },
    }
} satisfies NextAuthConfig

// Exportar handlers e funções do Auth.js
// Estas funções serão usadas em toda a aplicação
export const {
    handlers, // Handlers HTTP para as rotas de API
    auth,     // Função para verificar autenticação em Server Components
    signIn,   // Função para fazer login programaticamente
    signOut   // Função para fazer logout programaticamente
} = NextAuth(config)