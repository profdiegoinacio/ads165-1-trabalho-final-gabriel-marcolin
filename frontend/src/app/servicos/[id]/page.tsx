"use client";

import {useParams, useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmarSenha from "@/app/components/ConfirmarSenha";
import {fetchServicoById} from "@/api/fetchServicos";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {EditarUsuario, fetchUsuarioByUsername} from "@/api/fetchUsuarios";

export default function DetalhesServico() {
    const { id } = useParams();
    const [servico, setServico] = useState<any>(null);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [usuario, setUsuario] = useState<any>(null);
    const [nomeUsuario, setNomeUsuario] = useState<string|any>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

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

    useEffect(() => {
        async function carregar() {
            const data = await fetchServicoById(id);
            setServico(data);
        }

        carregar();
    }, [id]);

    if (!servico || !usuario) {
        return <LoadingSpinner />;
    }

    const handleContratar = async () => {
        usuario.servicosContratados = usuario.servicosContratados.map((item: any) =>
            typeof item === "object" ? item.id : item
        );

        if(usuario.servicosContratados.includes(servico.id)) {
            alert("Você já contratou esse serviço.");
            return;
        }

        try {
            const novosServicos = [...usuario.servicosContratados, servico.id];
            const usuarioAtualizado = {...usuario, servicosContratados: novosServicos };
            const usuarioEditado = await EditarUsuario(usuarioAtualizado);

            alert("Serviço contratado com sucesso!");
            router.push("/servicos");
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            alert("Erro ao editar usuário. Tente novamente.");
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">{servico.titulo}</h1>

            <div className="bg-white p-6 rounded-2xl shadow space-y-4">
                <p><span className="font-semibold">Descrição:</span> {servico.descricao}</p>
                <p><span className="font-semibold">Categoria:</span> {servico.categoria}</p>
                <p><span className="font-semibold">Preço:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico.preco)}</p>
                <p><span className="font-semibold">Telefone:</span> {servico.telefone.toString()}</p>
                <p><span className="font-semibold">Criado por:</span> {servico.usuario.username}</p>

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
        </div>
    );
}
