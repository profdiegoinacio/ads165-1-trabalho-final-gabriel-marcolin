"use client";

import { useState } from "react";

interface ServicoFormProps {
    onCriar: (novoServico: { nome: string; descricao: string }) => void;
    onCancel: () => void;
}

export default function ServicoForm({ onCriar, onCancel }: ServicoFormProps) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCriar({ nome, descricao })
        setNome("");
        setDescricao("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 mt-6 rounded-2xl shadow">
            <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="nome">
                    Nome do Serviço
                </label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o nome do serviço"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="descricao">
                    Descrição
                </label>
                <textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full border rounded-lg p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descreva o serviço"
                    required
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
                >
                    Salvar
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

