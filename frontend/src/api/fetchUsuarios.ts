import {auth} from "@/auth";

export async function fetchUsuarioById(id: string | Array<string> | undefined) {
    const session = await auth(); // Em Server Component

    if (!session?.accessToken) {
        throw new Error('Not authenticated or no access token found');
    }
    try {
        const resposta = await fetch(`http://localhost:8080/usuarios/${id}`, {
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
        console.error("Erro ao buscar usuário:", erro);
        return null;
    }
}