export async function fetchUsuarioById(id: string | Array<string> | undefined) {
    try {
        const resposta = await fetch(`http://localhost:8080/usuarios/${id}`);
        console.log('Buscando usuário na URL:', `http://localhost:8080/usuarios/${id}`);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar usuário");
        }

        return await resposta.json();
    } catch (erro) {
        console.error("Erro ao buscar usuário:", erro);
        return null;
    }
}