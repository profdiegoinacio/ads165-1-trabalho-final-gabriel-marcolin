// src/components/security/auth-status.tsx
'use client';
//SUBSTITUIR BOTÕES DE PERFIL PÓR ESSE COMPONENTEEEEEEEEE!!!
import { useSession, signIn, signOut } from 'next-auth/react';
import React, { useState } from 'react';

export default function AuthStatus() {
    const { data: session, status } = useSession();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        setIsSigningOut(true);

        try {
            console.log('Iniciando processo de logout...');

            await signOut({
                callbackUrl: '/login',
                redirect: true
            });

        } catch (error) {
            console.error('Erro durante o logout:', error);
            setIsSigningOut(false);
            alert('Erro durante o logout. Tente novamente.');
        }
    };

    const handleSignIn = () => {
        console.log('Redirecionando para página de login...');
        signIn();
    };

    if (status === "loading") {
        return (
            <div className="text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                    <svg
                        className="animate-spin h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span className="animate-pulse">Verificando...</span>
                </div>
            </div>
        );
    }

    if (session) {
        return (
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                {/* Nome do usuário */}
                <p className="font-medium text-gray-700 dark:text-gray-300">
                    {session.user?.username || session.user?.email || 'Usuário Logado'}
                </p>

                {/* Papéis/roles do usuário (se disponíveis) */}
                {session.user?.roles && session.user.roles.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {session.user.roles.map((role, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                {role}
              </span>
                        ))}
                    </div>
                )}

                {/* Informações adicionais (apenas em desenvolvimento) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="text-xs opacity-75 space-y-1">
                        <p>ID: {session.user?.id}</p>
                        <p>Token: {session.accessToken ? '✓ Presente' : '✗ Ausente'}</p>
                    </div>
                )}

                <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className={`
            text-xs transition-colors inline-flex items-center space-x-1
            ${isSigningOut
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-600 hover:text-red-700 hover:underline dark:text-red-400 dark:hover:text-red-300'
                    }
          `}
                    aria-label={isSigningOut ? 'Fazendo logout...' : 'Fazer logout'}
                >
                    {isSigningOut ? (
                        <>
                            <svg
                                className="animate-spin h-3 w-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            <span>Saindo...</span>
                        </>
                    ) : (
                        <>
                            <svg
                                className="h-3 w-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            <span>Sair</span>
                        </>
                    )}
                </button>
            </div>
        );
    }

    return (
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p className="italic">Não autenticado</p>

            <button
                onClick={handleSignIn}
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline transition-colors dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center space-x-1"
                aria-label="Fazer login"
            >
                <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                </svg>
                <span>Entrar</span>
            </button>
        </div>
    );
}