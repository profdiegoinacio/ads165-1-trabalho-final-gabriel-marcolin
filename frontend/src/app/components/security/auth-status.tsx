'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import React, { useState } from 'react';

export default function AuthStatus() {
    const { data: session, status } = useSession();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        try {
            console.log('Iniciando processo de logout...');
            await signOut({ callbackUrl: '/login', redirect: true });
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
            <div className="flex items-center gap-2 text-xs text-gray-300">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A7.96 7.96 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z" />
                </svg>
                <span className="animate-pulse">Verificando sessão...</span>
            </div>
        );
    }

    if (session) {
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm shadow-md max-w-xs">
                <p className="text-gray-800 dark:text-gray-100 font-semibold truncate">
                    {session.user?.username || session.user?.email || 'Usuário Logado'}
                </p>

                <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className={`mt-2 w-full flex items-center justify-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md transition
                    ${isSigningOut
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                        : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800'
                    }`}
                    aria-label={isSigningOut ? 'Fazendo logout...' : 'Fazer logout'}
                >
                    {isSigningOut ? (
                        <>
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A7.96 7.96 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z" />
                            </svg>
                            <span>Saindo...</span>
                        </>
                    ) : (
                        <>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Sair</span>
                        </>
                    )}
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm shadow-md max-w-xs">
            <p className="italic text-gray-600 dark:text-gray-300">Não autenticado</p>

            <button
                onClick={handleSignIn}
                className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 hover:bg-blue-200
                       dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800
                       rounded-md text-xs font-medium transition w-full justify-center"
                aria-label="Fazer login"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Entrar</span>
            </button>
        </div>
    );
}