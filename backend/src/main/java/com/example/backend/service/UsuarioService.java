package com.example.backend.service;

import com.example.backend.domain.Usuario;
import com.example.backend.utils.GeradorDeId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    public List<Usuario> filtrarUsuarios(List<Usuario> usuarios, String nome, String email, Character tipo) {
        return usuarios.stream()
                .filter(u -> nome == null || u.getNome().toLowerCase().contains(nome.toLowerCase()))
                .filter(u -> email == null || u.getEmail().toLowerCase().contains(email.toLowerCase()))
                .filter(u -> tipo == null || u.getTipoUsuario() == tipo)
                .collect(Collectors.toList());
    }

    public List<Usuario> ordenarUsuarios(List<Usuario> usuarios, String ordenarPor, String ordem) {
        return usuarios.stream()
                .sorted((u1, u2) -> {
                    int comparison = switch (ordenarPor) {
                        case "id" -> Long.compare(u1.getId(), u2.getId());
                        case "nome" -> u1.getNome().compareToIgnoreCase(u2.getNome());
                        case "email" -> u1.getEmail().compareToIgnoreCase(u2.getEmail());
                        case "tipoUsuario" -> Character.compare(u1.getTipoUsuario(), u2.getTipoUsuario());
                        default -> 0;
                    };
                    return "desc".equalsIgnoreCase(ordem) ? -comparison : comparison;
                })
                .collect(Collectors.toList());
    }

    public Usuario getUsuarioById(List<Usuario> usuarios, Long id) {
        return usuarios.stream()
                .filter(u -> u.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado com o ID: " + id));
    }

    public Usuario criarUsuario(Usuario usuario) {
        Usuario usuarioCriado = new Usuario(
                GeradorDeId.gerarId("Usuarios"),
                usuario.getTipoUsuario(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getSenha(),
                usuario.getTelefone()
        );
        return usuarioCriado;
    }

    public Usuario atualizarUsuario(Usuario usuario) {
        Usuario usuarioAtualizado = new Usuario();
        usuarioAtualizado.setId(usuario.getId());
        usuarioAtualizado.setTipoUsuario(usuario.getTipoUsuario());
        usuarioAtualizado.setNome(usuario.getNome());
        usuarioAtualizado.setEmail(usuario.getEmail());
        usuarioAtualizado.setSenha(usuario.getSenha());
        usuarioAtualizado.setTelefone(usuario.getTelefone());
        return usuarioAtualizado;
    }

    public Usuario atualizarParcialmente(List<Usuario> usuarios, Long id, Map<String, Object> fields) {
        Usuario usuario = usuarios.stream()
                .filter(u -> u.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado com o ID: " + id));

        for (Map.Entry<String, Object> entry : fields.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            if (value == null) {
                throw new IllegalArgumentException("O valor para o campo '" + key + "' não pode ser nulo.");
            }

            switch (key) {
                case "tipoUsuario" -> {
                    if (!(value instanceof Character)) {
                        throw new IllegalArgumentException("O campo 'tipoUsuario' deve ser um caractere.");
                    }
                    usuario.setTipoUsuario((Character) value);
                }
                case "nome" -> {
                    if (!(value instanceof String)) {
                        throw new IllegalArgumentException("O campo 'nome' deve ser uma String.");
                    }
                    usuario.setNome((String) value);
                }
                case "email" -> {
                    if (!(value instanceof String)) {
                        throw new IllegalArgumentException("O campo 'email' deve ser uma String.");
                    }
                    usuario.setEmail((String) value);
                }
                case "senha" -> {
                    if (!(value instanceof String)) {
                        throw new IllegalArgumentException("O campo 'senha' deve ser uma String.");
                    }
                    usuario.setSenha((String) value);
                }
                case "telefone" -> {
                    if (!(value instanceof String)) {
                        throw new IllegalArgumentException("O campo 'telefone' deve ser uma String.");
                    }
                    usuario.setTelefone((String) value);
                }
                default -> throw new IllegalArgumentException("Campo inválido: " + key);
            }
        }

        return usuario;
    }

    public Usuario adicionarServicoContratado(List<Usuario> usuarios, Long usuarioId, Long servicoId) {
        Usuario usuario = usuarios.stream()
                .filter(u -> u.getId().equals(usuarioId))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));

        if (!usuario.getServicosContratados().contains(servicoId)) {
            usuario.getServicosContratados().add(servicoId);
        }

        return usuario;
    }
}