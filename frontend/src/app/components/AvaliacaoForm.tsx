"use client";

import { useState } from "react";

interface AvaliacaoFormProps {
    onSubmit: (avaliacao: { nota: number; comentario: string }) => void;
    onCancel: () => void;
}

export default function AvaliacaoForm({ onSubmit, onCancel }: AvaliacaoFormProps) {
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ nota, comentario });
        setNota(5);
        setComentario("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow mt-4">
            <div>
                <label className="block mb-1 font-semibold text-gray-700">Nota</label>
                <select
                    value={nota}
                    onChange={(e) => setNota(Number(e.target.value))}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1 font-semibold text-gray-700">Comentário</label>
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="w-full border rounded-lg p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escreva seu comentário"
                    required
                />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
                >
                    Enviar
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
