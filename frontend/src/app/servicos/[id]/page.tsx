"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmarSenha from "@/app/components/ConfirmarSenha";

export default function DetalhesServico() {
    const { id } = useParams();
    const router = useRouter();
    const [servico, setServico] = useState<any>(null);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    // Usuários mockados TROCAR DEPOIS PELO FETCH
    const usuarioLogado = {
        id: 1,
        nome: "João da Silva",
        senha: "123456",
        servicosContratados: [1, 3]
    };

    const servicosMock = [
        { id: 1, nome: "Serviço 1", descricao: "Descrição completa do Serviço 1", usuario: { nome: "João" }, avaliacaoMedia: 4.5 },
        { id: 2, nome: "Serviço 2", descricao: "Descrição completa do Serviço 2", usuario: { nome: "Maria" }, avaliacaoMedia: 3.8 },
        { id: 3, nome: "Serviço 3", descricao: "Descrição completa do Serviço 3", usuario: { nome: "Carlos" }, avaliacaoMedia: 4.0 }
    ];

    useEffect(() => {
        const encontrado = servicosMock.find(s => s.id === Number(id));
        setServico(encontrado);
    }, [id]);

    if (!servico) {
        return <div className="p-6 text-center text-gray-600">Carregando serviço...</div>;
    }

    const handleContratar = () => {
        setMostrarConfirmacao(true);
    };

    const handleConfirmarSenha = (senhaDigitada: string) => {
        if (senhaDigitada === usuarioLogado.senha) {
            alert(`Serviço contratado com sucesso!`);
            usuarioLogado.servicosContratados.push(servico.id);
            setMostrarConfirmacao(false);
        } else {
            alert("Senha incorreta!");
        }
    };

    const handleCancelarConfirmacao = () => {
        setMostrarConfirmacao(false);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">{servico.nome}</h1>

            <div className="bg-white p-6 rounded-2xl shadow space-y-4">
                <p><span className="font-semibold">Descrição:</span> {servico.descricao}</p>
                <p><span className="font-semibold">Criado por:</span> {servico.usuario.nome}</p>
                <p><span className="font-semibold">Avaliação média:</span> {servico.avaliacaoMedia.toFixed(1)}</p>

                <button
                    onClick={handleContratar}
                    className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition mt-4"
                >
                    Contratar Serviço
                </button>

                <button
                    onClick={() => router.push("/servicos")}
                    className="w-full bg-gray-400 text-white font-semibold py-3 rounded-lg hover:bg-gray-500 transition mt-2"
                >
                    Voltar para listagem
                </button>
            </div>

            {mostrarConfirmacao && (
                <ConfirmarSenha
                    usuarioNome={usuarioLogado.nome}
                    onConfirmar={handleConfirmarSenha}
                    onCancelar={handleCancelarConfirmacao}
                />
            )}
        </div>
    );
}
