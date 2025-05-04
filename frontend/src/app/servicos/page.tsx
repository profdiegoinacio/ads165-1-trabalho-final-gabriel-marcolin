"use client";

import {useEffect, useState} from "react";
import ServicoForm from "@/app/components/ServicoForm";
import AvaliacaoForm from "@/app/components/AvaliacaoForm";
import {criarServico, EditarServico, fetchTodosServicos, removerServico} from "@/api/fetchServicos";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";

export default function Page() {
    const [servicos, setServicos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [servicoParaAvaliar, setServicoParaAvaliar] = useState<number | null>(null);
    const [servicoParaEditar, setServicoParaEditar] = useState<any | null>(null);

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

    const usuarioLogado = usuarios[1];

    useEffect(() => {
        async function carregarServicos() {
            try {
                const data = await fetchTodosServicos();
                setServicos(data);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            } finally {
                setIsLoading(false);
            }
        }

        carregarServicos();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }


    const handleCriarServico = async (novoServico: { titulo: string; descricao: string; categoria: string; preco: number; telefone: string }) => {
        try {
            const servicoComUsuario = {
                ...novoServico,
                idUsuario: usuarioLogado.id,
            };

            const servicoCriado = await criarServico(servicoComUsuario);

            setServicos([...servicos, servicoCriado]);
            setMostrarFormulario(false);
        } catch (error) {
            console.error("Erro ao criar serviço:", error);
            alert("Erro ao criar serviço. Tente novamente.");
        }
    };

    const handleEditarServico = async (servicoAtualizado: any) => {
        try {
            const servicoEditado = await EditarServico(servicoAtualizado);

            servicoEditado.idUsuario = servicoAtualizado.idUsuario;

            setServicos(servicos.map(s => s.id === servicoEditado.id ? servicoEditado : s));
            alert("Serviço atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao editar serviço:", error);
            alert("Erro ao editar serviço. Tente novamente.");
        }
    };

    const handleCancelarCriacao = () => {
        setMostrarFormulario(false);
    };

    const podeAvaliar = (servicoId: number) => {
        return usuarioLogado.servicosContratados.includes(servicoId);
    };

    const servicoProprio = (servico: any) => {
        return usuarioLogado.id == servico.idUsuario;
    }

    const handleRemoverServico = async (id: number) => {
        try {
            await removerServico(id);
            const atualizados = servicos.filter(s => s.id !== id);
            setServicos(atualizados);
            alert("Serviço removido com sucesso!");
        } catch (erro) {
            console.error("Erro ao remover serviço:", erro);
            alert("Erro ao remover serviço.");
        }
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

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Serviços Disponíveis</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {servicos.map((servico) => (
                    <div key={servico.id} className="border rounded-2xl p-6 shadow hover:shadow-lg transition-all bg-white">
                        <h2 className="text-xl font-semibold mb-2">{servico.titulo}</h2>
                        <p className="text-gray-600 mb-2">{servico.descricao}</p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Criado por:</span> {servico.idUsuario /*Botar o nome quando tivermos a integração com banco*/}
                        </p>
                        <p className="text-gray-700 mt-1">
                            <span className="font-semibold">Avaliação média:</span> {}
                        </p>

                        <Link
                            href={`/servicos/${servico.id}`}
                            className="mt-2 w-full inline-block text-center bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition"
                        >
                            Ver detalhes
                        </Link>

                        {servicoProprio(servico) && (
                            <>
                                <button
                                    onClick={() => setServicoParaEditar(servico)}
                                    className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleRemoverServico(servico.id)}
                                    className="mt-2 w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    Remover
                                </button>
                            </>
                        )}

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

            {servicoParaEditar && (
                <div className="mt-8">
                    <ServicoForm
                        servicoInicial={servicoParaEditar}
                        onEditar={(servicoAtualizado) => {
                            handleEditarServico({
                                ...servicoAtualizado,
                                idUsuario: usuarioLogado.id,
                            });
                            setServicoParaEditar(null);
                        }}

                        onCancel={() => setServicoParaEditar(null)}
                    />
                </div>
            )}
        </div>
    );
}
