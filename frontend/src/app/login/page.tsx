'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, FormEvent } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'; // Rota padrão após login

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        try {
            const result = await signIn('credentials', {
                redirect: false, // Não redirecionar automaticamente, lidaremos com isso
                username,
                password,
                callbackUrl,
            });

            if (result?.error) {
                setError('Invalid username or password. Please try again.'); // Mensagem de erro genérica
                console.error('Sign in error:', result.error);
            } else if (result?.ok) {
                router.push(callbackUrl); // Redireciona após login bem-sucedido
            }
        } catch (e) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Sign in exception:', e);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            {/* Opcional: link para registro */}
            {/* <p>Don't have an account? <a href="/register">Register here</a></p> */}
        </div>
    );
}
/*"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginForm from "@/app/components/LoginForm";

// Usuários mockados TROCAR DEPOIS PELO FETCH
const usuariosMockados = [
    { id: 1, nome: "João da Silva", email: "joao@email.com", senha: "123456", tipoUsuario: "C", servicosContratados: [1, 3] },
    { id: 2, nome: "Maria Souza", email: "maria@email.com", senha: "abcdef", tipoUsuario: "P", servicosContratados: [] }
];

export default function LoginPage() {
    const router = useRouter();
    const [erro, setErro] = useState("");

    const handleLogin = (email: string, senha: string) => {
        const usuario = usuariosMockados.find((u) => u.email === email && u.senha === senha);

        if (usuario) {
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            router.push("/servicos");
        } else {
            setErro("Email ou senha inválidos");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div>
                <LoginForm onLogin={handleLogin} />
                {erro && <p className="text-red-500 text-center mt-4">{erro}</p>}
            </div>
        </div>
    );
}
*/