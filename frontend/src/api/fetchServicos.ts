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