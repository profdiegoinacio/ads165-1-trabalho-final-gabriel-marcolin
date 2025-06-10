// src/app/login/page.tsx
'use client';

import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, FormEvent, useEffect, useCallback } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/servicos';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const checkExistingAuth = useCallback(async () => {
        try {
            const session = await getSession();
            if (session) {
                router.push(callbackUrl);
            }
        } catch (error) {
            console.error('Erro ao verificar sessão:', error);
        }
    }, [callbackUrl, router]);

    useEffect(() => {
        checkExistingAuth();
    }, [checkExistingAuth]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (!username.trim()) {
                setError('Nome de usuário é obrigatório');
                return;
            }

            if (!password.trim()) {
                setError('Senha é obrigatória');
                return;
            }

            if (password.length < 3) {
                setError('Senha deve ter pelo menos 3 caracteres');
                return;
            }

            const result = await signIn('credentials', {
                redirect: false,
                username: username.trim(),
                password: password,
                callbackUrl: callbackUrl,
            });

            if (result?.error) {
                switch (result.error) {
                    case 'CredentialsSignin':
                        setError('Nome de usuário ou senha inválidos.');
                        break;
                    default:
                        setError('Erro durante o login. Tente novamente.');
                }
            } else if (result?.ok) {
                setTimeout(() => {
                    router.push(callbackUrl);
                    router.refresh();
                }, 500);
            }

        } catch (e) {
            setError('Erro de conexão. Verifique sua internet.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
            if (error) setError(null);
        };
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-md m-auto">
                <div className="bg-white rounded-xl shadow-xl p-8 space-y-8">
                    {/* Cabeçalho com ícone */}
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Acesso ao Sistema
                        </h1>
                        <p className="text-gray-500">
                            Entre com suas credenciais para acessar o dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Nome de Usuário
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={handleInputChange(setUsername)}
                                disabled={isLoading}
                                autoComplete="username"
                                autoFocus
                                className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                                    error ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Digite seu nome de usuário"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handleInputChange(setPassword)}
                                    disabled={isLoading}
                                    autoComplete="current-password"
                                    className={`w-full px-4 py-3 pr-12 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                                        error ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Digite sua senha"
                                    required
                                />

                                {/* Toggle visibilidade senha */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 p-4 rounded-lg" role="alert">
                                <div className="flex">
                                    <svg className="h-5 w-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <p className="ml-3 text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !username.trim() || !password.trim()}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                isLoading || !username.trim() || !password.trim()
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Entrando...
                                </div>
                            ) : (
                                'Entrar'
                            )}
                        </button>
                    </form>

                    {/* Links adicionais */}
                    <div className="text-center space-y-2">
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-500 hover:underline transition-colors">
                            Esqueceu sua senha?
                        </a>
                        <div className="text-sm text-gray-600">
                            Não tem uma conta?{' '}
                            <a href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                Registre-se aqui
                            </a>
                        </div>
                    </div>

                    {/* Info de desenvolvimento */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">
                                <strong>Modo Desenvolvimento</strong>
                            </p>
                            <p className="text-xs text-yellow-700 mt-1">
                                Credenciais de teste: admin/admin ou user/user
                            </p>
                            <p className="text-xs text-yellow-700">
                                Callback URL: {callbackUrl}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}