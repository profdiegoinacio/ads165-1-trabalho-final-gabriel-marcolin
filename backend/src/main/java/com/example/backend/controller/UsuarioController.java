package com.example.backend.controller;

import com.example.backend.domain.Usuario;
import com.example.backend.service.UsuarioService;
import com.example.backend.utils.GeradorDeId;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private List<Usuario> usuarios = new ArrayList<>();

    @Autowired
    private UsuarioService usuarioService;

    @PostConstruct
    public void initUsuarios() {
        usuarios.add(new Usuario(
                GeradorDeId.gerarId("Usuarios"),
                'C',
                "João da Silva",
                "joao@email.com",
                "senha123",
                "54999881234"
        ));
        usuarios.add(new Usuario(
                GeradorDeId.gerarId("Usuarios"),
                'P',
                "Maria Souza",
                "maria@email.com",
                "senha456",
                "54999773344"
        ));
        usuarios.add(new Usuario(
                GeradorDeId.gerarId("Usuarios"),
                'C',
                "Carlos Lima",
                "carlos@email.com",
                "senha789",
                "54999665522"
        ));
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> buscarUsuarios(
            @RequestParam(name = "nome", required = false) String nome,
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "tipo", required = false) Character tipo,
            @RequestParam(name = "ordenarPor", defaultValue = "id") String ordenarPor,
            @RequestParam(name = "ordem", defaultValue = "asc") String ordem) {

        List<Usuario> usuariosFiltrados = usuarioService.filtrarUsuarios(usuarios, nome, email, tipo);
        usuariosFiltrados = usuarioService.ordenarUsuarios(usuariosFiltrados, ordenarPor, ordem);
        return ResponseEntity.ok(usuariosFiltrados);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuarioPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.getUsuarioById(usuarios, id));
    }

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@Valid @RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioService.criarUsuario(usuario);
        usuarios.add(novoUsuario);
        return ResponseEntity.ok(novoUsuario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Long id) {
        if (usuarios.stream().noneMatch(u -> u.getId().equals(id))) {
            return ResponseEntity.notFound().build();
        }
        usuarios.remove(usuarioService.getUsuarioById(usuarios, id));
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<Usuario> atualizarUsuario(@Valid @RequestBody Usuario usuario) {
        if (usuarios.stream().noneMatch(u -> u.getId().equals(usuario.getId()))) {
            return ResponseEntity.notFound().build();
        }
        Usuario usuarioAtualizado = usuarioService.atualizarUsuario(usuario);
        usuarios.removeIf(u -> u.getId().equals(usuario.getId()));
        usuarios.add(usuarioAtualizado);
        usuarios = usuarioService.ordenarUsuarios(usuarios, "id", "asc");
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Usuario> atualizarParcialmenteUsuario(@PathVariable Long id, @RequestBody Map<String, Object> fields) {
        try {
            Usuario atualizado = usuarioService.atualizarParcialmente(usuarios, id, fields);
            return ResponseEntity.ok(atualizado);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/{usuarioId}/contratar/{servicoId}")
    public ResponseEntity<Usuario> contratarServico(@PathVariable Long usuarioId, @PathVariable Long servicoId) {
        try {
            Usuario usuarioAtualizado = usuarioService.adicionarServicoContratado(usuarios, usuarioId, servicoId);
            return ResponseEntity.ok(usuarioAtualizado);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
