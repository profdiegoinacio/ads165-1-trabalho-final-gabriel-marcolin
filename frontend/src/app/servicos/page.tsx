"use client";

import { useState } from "react";
import ServicoForm from "@/app/components/ServicoForm";
import AvaliacaoForm from "@/app/components/AvaliacaoForm";
import { useRouter } from "next/navigation"

export default function Page() {

    // Dados mockados TROCAR DEPOIS PELO FETCH
    const [servicos, setServicos] = useState([
        { id: 1, nome: "Serviço 1", descricao: "Descrição do Serviço 1", usuario: { nome: "João", tipo: "C" }, avaliacaoMedia: 4.5 },
        { id: 2, nome: "Serviço 2", descricao: "Descrição do Serviço 2", usuario: { nome: "Maria", tipo: "P" }, avaliacaoMedia: 3.8 },
        { id: 3, nome: "Serviço 3", descricao: "Descrição do Serviço 3", usuario: { nome: "Carlos", tipo: "C" }, avaliacaoMedia: 4.0 }
    ]);

    const [usuarios, setUsuarios] = useState([
        {
            id: 1,
            nome: "João da Silva",
            tipoUsuario: "C",
            servicosContratados: [1, 3]
        },
        {
            id: 2,
            nome: "Maria Souza",
            tipoUsuario: "P",
            servicosContratados: []
        }
    ]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [servicoParaAvaliar, setServicoParaAvaliar] = useState<number | null>(null);

    const usuarioLogado = usuarios[1];

    const handleCriarServico = (novoServico: { nome: string; descricao: string }) => {
        setServicos([...servicos, { ...novoServico, id: servicos.length + 1, usuario: { nome: "Usuário Criado", tipo: "C" }, avaliacaoMedia: 0 }]);
        setMostrarFormulario(false);
    };

    const handleCancelarCriacao = () => {
        setMostrarFormulario(false);
    };

    const podeAvaliar = (servicoId: number) => {
        return usuarioLogado.servicosContratados.includes(servicoId);
    };

    const handleEnviarAvaliacao = (dados: { nota: number; comentario: string }) => {
        if (servicoParaAvaliar === null) return;

        console.log("Nova avaliação:", {
            id: Date.now(),
            servicoId: servicoParaAvaliar,
            usuarioId: usuarioLogado.id,
            nota: dados.nota,
            comentario: dados.comentario,
            data: new Date(),
        });

        setServicoParaAvaliar(null);
        alert("Avaliação enviada com sucesso!");
    };

    const handleCancelarAvaliacao = () => {
        setServicoParaAvaliar(null);
    };

    const router = useRouter();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Serviços Disponíveis</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {servicos.map((servico) => (
                    <div key={servico.id} className="border rounded-2xl p-6 shadow hover:shadow-lg transition-all bg-white">
                        <h2 className="text-xl font-semibold mb-2">{servico.nome}</h2>
                        <p className="text-gray-600 mb-2">{servico.descricao}</p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Criado por:</span> {servico.usuario.nome}
                        </p>
                        <p className="text-gray-700 mt-1">
                            <span className="font-semibold">Avaliação média:</span> {servico.avaliacaoMedia.toFixed(1)}
                        </p>

                        <button
                            onClick={() => router.push(`/servicos/${servico.id}`)}
                            className="mt-2 w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition"
                        >
                            Ver detalhes
                        </button>

                        {podeAvaliar(servico.id) && (
                            <>
                                <button
                                    onClick={() => setServicoParaAvaliar(servico.id)}
                                    className="mt-2 w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
                                >
                                    Avaliar
                                </button>

                                {servicoParaAvaliar === servico.id && (
                                    <AvaliacaoForm
                                        onSubmit={handleEnviarAvaliacao}
                                        onCancel={handleCancelarAvaliacao}
                                    />
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            {usuarioLogado.tipoUsuario === "P" && (
                <button
                    onClick={() => setMostrarFormulario(true)}
                    className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Criar novo serviço
                </button>
            )}

            {mostrarFormulario && (
                <div className="mt-8">
                    <ServicoForm onCriar={handleCriarServico} onCancel={handleCancelarCriacao} />
                </div>
            )}
        </div>
    );
}
