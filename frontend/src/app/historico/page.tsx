"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUsuarioByUsername, EditarUsuario } from "@/api/fetchUsuarios";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";

export default function HistoricoServicos() {
    const { data: session } = useSession();
    const [usuario, setUsuario] = useState<any>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const carregarUsuario = async () => {
            if (!session?.user?.username) return;

            try {
                const data = await fetchUsuarioByUsername(session.user.username);
                setUsuario(data);
            } catch (error) {
                console.error("Erro ao carregar usuário:", error);
            } finally {
                setCarregando(false);
            }
        };

        carregarUsuario();
    }, [session]);

    const handleCancelarContratacao = async (id: number) => {
        try {
            const atualizados = usuario.servicosContratados.filter((servico: any) =>
                (typeof servico === "object" ? servico.id : servico) !== id
            );

            const usuarioAtualizado = {
                ...usuario,
                servicosContratados: atualizados.map((s: any) => (typeof s === "object" ? s.id : s)),
            };

            await EditarUsuario(usuarioAtualizado);

            setUsuario({
                ...usuario,
                servicosContratados: atualizados,
            });

            alert("Serviço removido do histórico com sucesso!");
        } catch (erro) {
            console.error("Erro ao cancelar contratação:", erro);
            alert("Erro ao cancelar a contratação.");
        }
    };

    if (carregando) {
        return <LoadingSpinner />;
    }

    if (!usuario || !usuario.servicosContratados?.length) {
        return (
            <div className="text-center p-6">
                <h1 className="text-2xl font-bold mb-4">Histórico de Serviços</h1>
                <p>Você ainda não contratou nenhum serviço.</p>
                <Link href="/servicos" className="text-blue-600 underline mt-4 block">Explorar Serviços</Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Histórico de Serviços Contratados</h1>

            <div className="grid md:grid-cols-2 gap-6">
                {usuario.servicosContratados.map((servico: any) => (
                    <div key={servico.id} className="bg-white p-6 rounded-2xl shadow space-y-3">
                        <h2 className="text-xl font-semibold">{servico.titulo}</h2>
                        <p><span className="font-semibold">Descrição:</span> {servico.descricao}</p>
                        <p><span className="font-semibold">Categoria:</span> {servico.categoria}</p>
                        <p><span className="font-semibold">Preço:</span> R$ {servico.preco?.toFixed(2)}</p>
                        <p><span className="font-semibold">Telefone:</span> {servico.telefone}</p>
                        <p><span className="font-semibold">Prestador:</span> {servico.usuario?.username}</p>

                        <button
                            onClick={() => handleCancelarContratacao(servico.id)}
                            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Cancelar Contratação
                        </button>
                    </div>
                ))}
            </div>

            <div className="text-center mt-8">
                <Link href="/servicos" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    Voltar para lista de serviços
                </Link>
            </div>
        </div>
    );
}
