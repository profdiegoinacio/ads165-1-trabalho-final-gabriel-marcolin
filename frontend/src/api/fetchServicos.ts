export async function fetchServicoById(id: string | Array<string> | undefined) {
    try {
        const resposta = await fetch(`http://localhost:8080/servicos/${id}`);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar serviço");
        }

        return await resposta.json();
    } catch (erro) {
        console.error("Erro ao buscar serviço:", erro);
        return null;
    }
}

export async function fetchTodosServicos() {
    try {
        const resposta = await fetch(`http://localhost:8080/servicos`);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar serviços");
        }
        return await resposta.json();
    } catch (erro) {
        console.error("Erro ao buscar serviços:", erro);
        return null;
    }
}

export async function criarServico(servico: any) {
    const resposta = await fetch("http://localhost:8080/servicos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(servico),
    });

    if (!resposta.ok) {
        throw new Error("Erro ao criar serviço");
    }

    return resposta.json();
}

export async function removerServico(id: number) {
    const resposta = await fetch(`http://localhost:8080/servicos/${id}`, {
        method: "DELETE",
    });

    if (!resposta.ok) {
        throw new Error("Erro ao remover serviço");
    }

    return resposta.text();
}

export async function EditarServico(servicoAtualizado:any) {
    const resposta = await fetch("http://localhost:8080/servicos", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(servicoAtualizado),
    });

    if (!resposta.ok) {
        throw new Error("Erro ao Editar serviço");
    }

    return resposta.json();
}