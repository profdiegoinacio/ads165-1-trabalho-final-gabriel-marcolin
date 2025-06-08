import {auth} from "@/auth";

export async function fetchServicoById(id: string | Array<string> | undefined) {
    const session = await auth(); // Em Server Component

    if (!session?.accessToken) {
        throw new Error('Not authenticated or no access token found');
    }
    try {
        const resposta = await fetch(`http://localhost:8080/servicos/${id}`, {
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
            },
        });
        if (!resposta.ok) {
            // Lidar com erros, e.g., token expirado (401 Unauthorized)
            if (resposta.status === 401) {
                // Potencialmente redirecionar para login ou tentar refresh token (avançado)
                console.error("Unauthorized, token might be expired.");
            }
            throw new Error(`API request failed with status ${resposta.status}`);
        }
        return resposta.json();
    } catch (erro) {
        console.error("Erro ao buscar serviço:", erro);
        return null;
    }
}

export async function fetchTodosServicos() {
    const session = await auth(); // Em Server Component

    if (!session?.accessToken) {
        throw new Error('Not authenticated or no access token found');
    }
    try {
        const resposta = await fetch(`http://localhost:8080/servicos`, {
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
            },
        });
        if (!resposta.ok) {
            // Lidar com erros, e.g., token expirado (401 Unauthorized)
            if (resposta.status === 401) {
                // Potencialmente redirecionar para login ou tentar refresh token (avançado)
                console.error("Unauthorized, token might be expired.");
            }
            throw new Error(`API request failed with status ${resposta.status}`);
        }
        return resposta.json();
    } catch (erro) {
        console.error("Erro ao buscar serviços:", erro);
        return null;
    }
}

export async function criarServico(servico: any) {
    const session = await auth(); // Em Server Component

    if (!session?.accessToken) {
        throw new Error('Not authenticated or no access token found');
    }
    const resposta = await fetch("http://localhost:8080/servicos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(servico),
    });

    if (!resposta.ok) {
        // Lidar com erros, e.g., token expirado (401 Unauthorized)
        if (resposta.status === 401) {
            // Potencialmente redirecionar para login ou tentar refresh token (avançado)
            console.error("Unauthorized, token might be expired.");
        }
        throw new Error(`API request failed with status ${resposta.status}`);
    }
    return resposta.json();
}

export async function removerServico(id: number) {
    const session = await auth(); // Em Server Component

    if (!session?.accessToken) {
        throw new Error('Not authenticated or no access token found');
    }
    const resposta = await fetch(`http://localhost:8080/servicos/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${session.accessToken}`,
        },
    });

    if (!resposta.ok) {
        // Lidar com erros, e.g., token expirado (401 Unauthorized)
        if (resposta.status === 401) {
            // Potencialmente redirecionar para login ou tentar refresh token (avançado)
            console.error("Unauthorized, token might be expired.");
        }
        throw new Error(`API request failed with status ${resposta.status}`);
    }
    return resposta.json();
}

export async function EditarServico(servicoAtualizado:any) {
    const session = await auth(); // Em Server Component

    if (!session?.accessToken) {
        throw new Error('Not authenticated or no access token found');
    }
    const resposta = await fetch("http://localhost:8080/servicos", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(servicoAtualizado),
    });

    if (!resposta.ok) {
        // Lidar com erros, e.g., token expirado (401 Unauthorized)
        if (resposta.status === 401) {
            // Potencialmente redirecionar para login ou tentar refresh token (avançado)
            console.error("Unauthorized, token might be expired.");
        }
        throw new Error(`API request failed with status ${resposta.status}`);
    }
    return resposta.json();
}