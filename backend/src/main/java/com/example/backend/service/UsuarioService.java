package com.example.backend.service;

import com.example.backend.domain.Servico;
import com.example.backend.domain.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> filtrarUsuarios(String nome, /*String email,*/ String role) {
        return usuarioRepository.findAll().stream()
                .filter(u -> nome == null || u.getUsername().toLowerCase().contains(nome.toLowerCase()))
                /*.filter(u -> email == null || u.getEmail().toLowerCase().contains(email.toLowerCase()))*/
                .filter(u -> role == null || u.getRoles().contains(role))
                .collect(Collectors.toList());
    }

    public List<Usuario> ordenarUsuarios(List<Usuario> usuarios, String ordenarPor, String ordem) {
        return usuarios.stream()
                .sorted((u1, u2) -> {
                    int comparison = switch (ordenarPor) {
                        case "id" -> Long.compare(u1.getId(), u2.getId());
                        case "nome" -> u1.getUsername().compareToIgnoreCase(u2.getUsername());
                        /*case "email" -> u1.getEmail().compareToIgnoreCase(u2.getEmail());*/
                        case "roles" -> u1.getRoles().toString().compareToIgnoreCase(u2.getRoles().toString());
                        default -> 0;
                    };
                    return "desc".equalsIgnoreCase(ordem) ? -comparison : comparison;
                })
                .collect(Collectors.toList());
    }

    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado com o ID: " + id));
    }

    public Usuario criarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizarUsuario(Usuario usuario) {
        if (!usuarioRepository.existsById(usuario.getId())) {
            throw new NoSuchElementException("Usuário não encontrado com o ID: " + usuario.getId());
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizarParcialmente(Long id, Map<String, Object> fields) {
        Usuario usuario = getUsuarioById(id);

        for (Map.Entry<String, Object> entry : fields.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            if (value == null) {
                throw new IllegalArgumentException("O valor para o campo '" + key + "' não pode ser nulo.");
            }

            switch (key) {
                case "roles" -> {
                    if (value instanceof List<?>) {
                        Set<String> roles = ((List<?>) value).stream()
                                .map(Object::toString)
                                .collect(Collectors.toSet());
                        usuario.setRoles(roles);
                    } else {
                        throw new IllegalArgumentException("Formato inválido para 'roles'. Esperado: lista de strings.");
                    }
                }
                case "username" -> usuario.setUsername((String) value);
                /*case "email" -> usuario.setEmail((String) value);*/
                case "password" -> usuario.setPassword((String) value);
                /*case "telefone" -> usuario.setTelefone((String) value);*/
                default -> throw new IllegalArgumentException("Campo inválido: " + key);
            }
        }

        return usuarioRepository.save(usuario);
    }

    public Usuario adicionarServicoContratado(Long usuarioId, Servico servico) {
        Usuario usuario = getUsuarioById(usuarioId);

        if (!usuario.getServicosContratados().contains(servico)) {
            usuario.getServicosContratados().add(servico);
        }

        return usuarioRepository.save(usuario);
    }

    public void excluirUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new NoSuchElementException("Usuário não encontrado com o ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
}
