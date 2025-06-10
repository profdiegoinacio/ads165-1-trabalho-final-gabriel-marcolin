"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginForm from "@/app/components/LoginForm";

// Usuários mockados TROCAR DEPOIS PELO FETCH
const usuariosMockados = [
    { id: 1, nome: "João da Silva", email: "joao@email.com", senha: "123456", tipoUsuario: "C", servicosContratados: [1, 3] },
    { id: 2, nome: "Maria Souza", email: "maria@email.com", senha: "abcdef", tipoUsuario: "P", servicosContratados: [] }
];

export default function LoginPage() {
    const router = useRouter();
    const [erro, setErro] = useState("");

    const handleLogin = (email: string, senha: string) => {
        const usuario = usuariosMockados.find((u) => u.email === email && u.senha === senha);

        if (usuario) {
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            router.push("/servicos");
        } else {
            setErro("Email ou senha inválidos");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div>
                <LoginForm onLogin={handleLogin} />
                {erro && <p className="text-red-500 text-center mt-4">{erro}</p>}
            </div>
        </div>
    );
}
