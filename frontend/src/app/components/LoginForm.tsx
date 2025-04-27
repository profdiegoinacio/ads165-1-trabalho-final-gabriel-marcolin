"use client";

import { useState } from "react";

interface LoginFormProps {
    onLogin: (email: string, senha: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, senha);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

            <div>
                <label className="block mb-2 font-semibold">Email</label>
                <input
                    type="email"
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    required
                />
            </div>

            <div>
                <label className="block mb-2 font-semibold">Senha</label>
                <input
                    type="password"
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                Entrar
            </button>
        </form>
    );
}
