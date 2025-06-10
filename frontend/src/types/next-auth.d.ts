// src/types/next-auth.d.ts
// Extensão de tipos TypeScript para NextAuth.js
// Este arquivo permite adicionar propriedades customizadas aos tipos do NextAuth

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

/**
 * Extensão do módulo "next-auth" para adicionar tipos customizados
 *
 * Esta declaração permite que o TypeScript reconheça propriedades
 * adicionais que adicionamos aos objetos Session e User
 */
declare module "next-auth" {
    /**
     * Interface Session personalizada
     *
     * Estende a sessão padrão do NextAuth com propriedades específicas
     * da nossa aplicação
     */
    interface Session {
        // Token de acesso do backend para chamadas API
        accessToken?: string;

        // Objeto user personalizado
        user: {
            // ID do usuário (sempre presente)
            id: string;

            // Nome de usuário customizado
            username?: string;

            // Array de papéis/permissões do usuário
            roles?: string[];

            // Mantém propriedades padrão do NextAuth
        } & DefaultSession["user"]; // Merge com propriedades padrão (name, email, image)
    }

    /**
     * Interface User personalizada
     *
     * Representa o objeto de usuário retornado pela função authorize()
     * no provider de credenciais
     */
    interface User extends DefaultUser {
        // Nome de usuário único
        username?: string;

        // Array de papéis do usuário
        roles?: string[];

        // Token JWT fornecido pelo backend
        accessToken?: string;

        // Propriedades padrão: id, name, email, image são herdadas de DefaultUser
    }

    /**
     * Interface AdapterUser (se usando adapter de banco de dados)
     *
     * Uncomment se estiver usando database adapter
     */
    // interface AdapterUser extends User {
    //   emailVerified: Date | null;
    // }
}

/**
 * Extensão do módulo "next-auth/jwt" para tipos de JWT personalizados
 *
 * Esta declaração permite adicionar propriedades customizadas ao token JWT
 */
declare module "next-auth/jwt" {
    /**
     * Interface JWT personalizada
     *
     * Representa o token JWT usado internamente pelo NextAuth
     * e acessível no callback jwt()
     */
    interface JWT extends DefaultJWT {
        // Token de acesso do backend
        accessToken?: string;

        // Nome de usuário
        username?: string;

        // Papéis do usuário
        roles?: string[];

        // ID do usuário
        id?: string;

        // Timestamp de criação (para controle de expiração)
        createdAt?: number;

        // Propriedades padrão incluem: name, email, picture, sub, iat, exp, jti
    }
}

// Tipos auxiliares para uso na aplicação

/**
 * Tipo para representar um usuário autenticado
 * Usado em componentes e hooks
 */
export interface AuthenticatedUser {
    id: string;
    username: string;
    email?: string;
    roles: string[];
    accessToken: string;
}

/**
 * Tipo para estado de autenticação
 * Usado em hooks customizados
 */
export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: AuthenticatedUser | null;
    error: string | null;
}

/**
 * Tipo para configurações de autorização
 * Usado no hook useAuth
 */
export interface AuthOptions {
    required?: boolean;
    redirectTo?: string;
    roles?: string[];
}

/**
 * Enum para papéis do sistema
 * Ajuda a manter consistência nos papéis utilizados
 */
export enum UserRole {
    ADMIN = 'ROLE_ADMIN',
    USER = 'ROLE_USER',
    MODERATOR = 'ROLE_MODERATOR',
    GUEST = 'ROLE_GUEST',
}

/**
 * Tipo para resposta de login do backend
 * Usado na função authorize() do provider
 */
export interface LoginResponse {
    id: number;
    username: string;
    email: string;
    roles: string[];
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
}

/**
 * Tipo para dados de login
 * Usado no formulário de login
 */
export interface LoginCredentials {
    username: string;
    password: string;
}

/**
 * Tipo para erro de autenticação
 * Usado no tratamento de erros
 */
export interface AuthError {
    code: string;
    message: string;
    details?: any;
}

/**
 * Tipo para configuração de sessão
 * Usado em configurações avançadas
 */
export interface SessionConfig {
    maxAge: number;
    updateAge: number;
    strategy: 'jwt' | 'database';
}

// Utilitários de tipo para validação de papéis

/**
 * Type guard para verificar se um valor é um papel válido
 */
export function isValidRole(role: string): role is UserRole {
    return Object.values(UserRole).includes(role as UserRole);
}

/**
 * Type helper para propriedades opcionais de usuário
 */
export type PartialUser = Partial<AuthenticatedUser>;

/**
 * Type helper para atualização de usuário
 */
export type UserUpdate = Pick<AuthenticatedUser, 'username' | 'email'>;

// Notas sobre declaração de módulos:
// 1. Estas declarações "estendem" os tipos existentes do NextAuth
// 2. Propriedades opcionais (?) devem ser tratadas nos componentes
// 3. Sempre manter compatibilidade com tipos padrão
// 4. Usar enums para valores fixos como papéis
// 5. Type guards ajudam na validação em runtime
// 6. Manter tipos atualizados com mudanças no backend