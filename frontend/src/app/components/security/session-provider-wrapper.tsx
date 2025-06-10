// src/components/session-provider-wrapper.tsx
// Wrapper para o SessionProvider do NextAuth que deve ser um Client Component

'use client'; // Diretiva obrigatória para Client Components

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// Interface para as props do componente
interface SessionProviderWrapperProps {
    children: ReactNode; // Componentes filhos que terão acesso à sessão
}

/**
 * Wrapper para o SessionProvider do NextAuth
 *
 * Este componente é necessário porque:
 * 1. O SessionProvider deve ser um Client Component ('use client')
 * 2. Permite configurações centralizadas do provider
 * 3. Facilita testes e mocking
 * 4. Isola a dependência do NextAuth em um único local
 */
export default function SessionProviderWrapper({ children }: SessionProviderWrapperProps) {
    return (
        <SessionProvider
            // Configuração de refetch automático da sessão
            refetchInterval={5 * 60} // Revalidar sessão a cada 5 minutos (300 segundos)

            // Revalidar sessão quando a janela/aba ganha foco
            refetchOnWindowFocus={true}

            // Revalidar quando a conexão de internet é restaurada
            refetchWhenOffline={false}

            // URL base para chamadas de API (opcional, usa padrão se não especificado)
            basePath="/api/auth"
        >
            {/* Todos os componentes filhos terão acesso ao contexto de sessão */}
            {children}
        </SessionProvider>
    );
}

// Notas sobre configurações do SessionProvider:
// - refetchInterval: Define intervalo automático de revalidação da sessão
// - refetchOnWindowFocus: Revalida quando usuário volta para a aba
// - refetchWhenOffline: Controla comportamento quando offline
// - basePath: Caminho base para rotas de autenticação (se diferente do padrão)