"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmarSenha from "@/app/components/ConfirmarSenha";
import {fetchServicoById} from "@/api/fetchServicos";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";

export default function DetalhesServico() {
    const { id } = useParams();
    const [servico, setServico] = useState<any>(null);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    // Usuários mockados TROCAR DEPOIS PELO FETCH
    const usuarioLogado = {
        id: 1,
        nome: "João da Silva",
        senha: "123456",
        servicosContratados: [1, 3]
    };

    useEffect(() => {
        async function carregar() {
            const data = await fetchServicoById(id);
            setServico(data);
        }

        carregar();
    }, [id]);

    if (!servico) {
        return <LoadingSpinner />;
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
            <h1 className="text-3xl font-bold mb-6 text-center">{servico.titulo}</h1>

            <div className="bg-white p-6 rounded-2xl shadow space-y-4">
                <p><span className="font-semibold">Descrição:</span> {servico.descricao}</p>
                <p><span className="font-semibold">Categoria:</span> {servico.categoria}</p>
                <p><span className="font-semibold">Preço:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico.preco)}</p>
                <p><span className="font-semibold">Telefone:</span> {servico.telefone.toString()}</p>
                <p><span className="font-semibold">Criado por:</span> {servico.idUsuario /*Botar o nome quando tivermos a integração com banco*/}</p>

                <button
                    onClick={handleContratar}
                    className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition mt-4"
                >
                    Contratar Serviço
                </button>

                <Link href="/servicos" className="w-full block bg-gray-400 text-white font-semibold py-3 rounded-lg hover:bg-gray-500 transition mt-2 text-center">
                    Voltar para listagem
                </Link>
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
