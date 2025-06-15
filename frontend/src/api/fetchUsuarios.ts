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

export async function fetchUsuarios() {
    try {
        const resposta = await fetch(`http://localhost:8080/usuarios`);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar usuários");
        }

        return await resposta.json();
    } catch (erro) {
        console.error("Erro ao buscar usuários:", erro);
        return null;
    }
}

export async function fetchUsuarioByUsername(username: string | Array<string> | undefined) {
    try {
        const resposta = await fetch(`http://localhost:8080/usuarios/nome/${username}`);
        console.log('Buscando usuário na URL:', `http://localhost:8080/usuarios/nome/${username}`);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar usuário");
        }

        return await resposta.json();
    } catch (erro) {
        console.error("Erro ao buscar usuário:", erro);
        return null;
    }
}

export async function EditarUsuario(usuarioAtualizado:any) {
    const resposta = await fetch("http://localhost:8080/usuarios", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioAtualizado),
    });

    if (!resposta.ok) {
        throw new Error("Erro ao Editar usuário");
    }

    return resposta.json();
}