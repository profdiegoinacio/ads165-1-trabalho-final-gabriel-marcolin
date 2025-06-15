export async function criarAvaliacao(avaliacao: any) {
    const resposta = await fetch("http://localhost:8080/avaliacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(avaliacao),
    });

    if (!resposta.ok) {
        throw new Error("Erro ao criar avaliação");
    }

    return resposta.json();
}

export async function getMediaAvaliacao (servicoId: number) {
    const resposta = await fetch(`http://localhost:8080/avaliacoes/media/${servicoId}`);
    if (!resposta.ok) {
        throw new Error("Erro ao criar avaliação");
    }

    return resposta.json();
}