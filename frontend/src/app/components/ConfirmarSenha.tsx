"use client";

import { useState } from "react";

interface ConfirmarSenhaProps {
    usuarioNome: string;
    onConfirmar: (senha: string) => void;
    onCancelar: () => void;
}

export default function ConfirmarSenha({ usuarioNome, onConfirmar, onCancelar }: ConfirmarSenhaProps) {
    const [senha, setSenha] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirmar(senha);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-xl font-bold text-center">Confirmar Contratação</h2>
                <p className="text-center">Usuário: {usuarioNome}</p>

                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <div className="flex gap-4 mt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Confirmar
                    </button>
                    <button
                        type="button"
                        onClick={onCancelar}
                        className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
