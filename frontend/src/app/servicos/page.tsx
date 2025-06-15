"use client";

import {useEffect, useState} from "react";
import ServicoForm from "@/app/components/ServicoForm";
import AvaliacaoForm from "@/app/components/AvaliacaoForm";
import {criarServico, EditarServico, fetchTodosServicos, removerServico} from "@/api/fetchServicos";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react';
import {fetchUsuarioById, fetchUsuarioByUsername, fetchUsuarios} from "@/api/fetchUsuarios";
import {criarAvaliacao} from "@/api/fetchAvaliacoes";
import MediaAvaliacao from "@/app/components/MediaAvaliacao";

export default function Page() {
    const [servicos, setServicos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [servicoParaAvaliar, setServicoParaAvaliar] = useState<number | null>(null);
    const [servicoParaEditar, setServicoParaEditar] = useState<any | null>(null);
    const { data: session, status } = useSession();
    const [nomeUsuario, setNomeUsuario] = useState<string|any>(null);
    const [usuario, setUsuario] = useState<any>(null);
    const [usuarios, setUsuarios] = useState<any[]>([]); //Para poder evitar erro ao remover
    const [avaliacoesAtualizadas, setAvaliacoesAtualizadas] = useState(0);

    useEffect(() => {
        if (session?.user?.username) {
            setNomeUsuario(session.user.username);
        }
    }, [session]);

    useEffect(() => {
        async function carregarUsuario() {
            if (!nomeUsuario) return;

            try {
                const data = await fetchUsuarioByUsername(nomeUsuario);
                setUsuario(data);
                console.log(nomeUsuario)
                console.log(usuario)
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        }

        carregarUsuario();
    }, [nomeUsuario]);

    //Para poder evitar erro ao remover
    useEffect(() => {
        async function carregarUsuarios() {
            try {
                const dadosUsuarios = await fetchUsuarios();
                setUsuarios(dadosUsuarios);
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            }
        }
        carregarUsuarios();
    }, []);

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

    if (isLoading || !usuario) {
        return <LoadingSpinner />;
    }


    const handleCriarServico = async (novoServico: { titulo: string; descricao: string; categoria: string; preco: number; telefone: string }) => {
        try {
            const servicoComUsuario = {
                ...novoServico,
                usuarioId: usuario.id,
            };

            console.log("Criando serviço para usuário:", servicoComUsuario)
            const servicoCriado = await criarServico(servicoComUsuario);

            servicoCriado.usuario = usuario;

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

            servicoEditado.usuario = usuario;

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
        return usuario.servicosContratados.some((item: any) => item.id === servicoId);
    };

    const servicoProprio = (servico: any) => {
        return usuario && servico.usuario && usuario.id === servico.usuario.id;
    };

    const handleRemoverServico = async (id: number) => {
        const temContrato = usuarios.some(usuario =>
            usuario.servicosContratados?.some((servico: any) => servico.id === id)
        );

        if (temContrato) {
            alert("Não é possível remover esse serviço pois algum usuário já o contratou.");
            return;
        }
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

    const handleEnviarAvaliacao = async (dados: { nota: number; comentario: string }) => {
        if (servicoParaAvaliar === null) return;

        const res = await fetch(`http://localhost:8080/avaliacoes/existe?usuarioId=${usuario.id}&servicoId=${servicoParaAvaliar}`);
        const jaAvaliou = await res.json();
        if (jaAvaliou) {
            alert("Você já avaliou esse serviço.");
            return;
        }

        console.log("Nova avaliação:", {
            servicoId: servicoParaAvaliar,
            usuarioId: usuario.id,
            nota: dados.nota,
            comentario: dados.comentario,
            data: new Date(),
        });

        try {
            const avaliacao = {
                servicoId: servicoParaAvaliar,
                usuarioId: usuario.id,
                nota: dados.nota,
                comentario: dados.comentario,
                data: new Date(),
            };

            const AvaliacaoCriada = await criarAvaliacao(avaliacao);

            setServicoParaAvaliar(null);
            setAvaliacoesAtualizadas(prev => prev + 1);//Para atualizar a média em tela
            alert("Avaliação enviada com sucesso!");
        } catch (error) {
            console.error("Erro ao criar serviço:", error);
            alert("Erro ao criar serviço. Tente novamente.");
        }
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
                            <span className="font-semibold">Criado por:</span> {servico.usuario?.username}
                        </p>
                        <p className="text-gray-700 mt-1">
                            <span className="font-semibold">Avaliação média:</span>{" "}
                            <MediaAvaliacao servicoId={servico.id} atualizar={avaliacoesAtualizadas} />
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

            {usuario?.roles?.includes("ROLE_ADMIN")  && (
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
                                usuarioId: usuario.id,
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
