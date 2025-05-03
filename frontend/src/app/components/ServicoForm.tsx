"use client";

import { useEffect, useState } from "react";

interface ServicoFormProps {
    servicoInicial?: any;
    onCriar?: (servico: any) => void;
    onEditar?: (servico: any) => void;
    onCancel: () => void;
}

export default function ServicoForm({ servicoInicial, onCriar, onEditar, onCancel }: ServicoFormProps) {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");
    const [telefone, setTelefone] = useState("");

    useEffect(() => {
        if (servicoInicial) {
            setTitulo(servicoInicial.titulo || "");
            setDescricao(servicoInicial.descricao || "");
            setCategoria(servicoInicial.categoria || "");
            setPreco(servicoInicial.preco?.toString() || "");
            setTelefone(servicoInicial.telefone || "");
        }
    }, [servicoInicial]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const servico = {
            ...(servicoInicial?.id && { id: servicoInicial.id }), // importante para edição!
            titulo,
            descricao,
            categoria,
            preco: parseFloat(preco),
            telefone,
        };

        if (servicoInicial && onEditar) {
            onEditar(servico);
        } else if (onCriar) {
            onCriar(servico);
        }

        setTitulo("");
        setDescricao("");
        setCategoria("");
        setPreco("");
        setTelefone("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 mt-6 rounded-2xl shadow">
            <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="titulo">
                    Título do Serviço
                </label>
                <input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o título do serviço"
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

            <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="categoria">
                    Categoria
                </label>
                <input
                    id="categoria"
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Categoria do serviço"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="preco">
                    Preço (R$)
                </label>
                <input
                    id="preco"
                    type="number"
                    min="0"
                    step="0.01"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Valor do serviço"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold text-gray-700" htmlFor="telefone">
                    Telefone de Contato
                </label>
                <input
                    id="telefone"
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Telefone para contato (somente números)"
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
