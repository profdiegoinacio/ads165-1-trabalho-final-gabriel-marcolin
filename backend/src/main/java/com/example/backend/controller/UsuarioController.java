package com.example.backend.controller;

import com.example.backend.domain.Servico;
import com.example.backend.domain.Usuario;
import com.example.backend.dto.UsuarioUpdateDTO;
import com.example.backend.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> buscarUsuarios(
            @RequestParam(name = "nome", required = false) String nome,
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "roles", required = false) String role,
            @RequestParam(name = "ordenarPor", defaultValue = "id") String ordenarPor,
            @RequestParam(name = "ordem", defaultValue = "asc") String ordem) {

        List<Usuario> filtrados = usuarioService.filtrarUsuarios(nome, /*email,*/ role);
        filtrados = usuarioService.ordenarUsuarios(filtrados, ordenarPor, ordem);
        return ResponseEntity.ok(filtrados);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.getUsuarioById(id));
    }

    @GetMapping("/nome/{username}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable String username) {
        return ResponseEntity.ok(usuarioService.getUsuarioByUsername(username));
    }

    /*
    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@Valid @RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.criarUsuario(usuario));
    }*/

    @PutMapping
    public ResponseEntity<Usuario> atualizarUsuario(@RequestBody UsuarioUpdateDTO dto) {
        Usuario atualizado = usuarioService.atualizarUsuario(dto);
        return ResponseEntity.ok(atualizado);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Usuario> atualizarParcialmente(@PathVariable Long id, @RequestBody Map<String, Object> fields) {
        try {
            return ResponseEntity.ok(usuarioService.atualizarParcialmente(id, fields));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        try {
            usuarioService.excluirUsuario(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{usuarioId}/contratar/{servicoId}")
    public ResponseEntity<Usuario> contratarServico(@PathVariable Long usuarioId, @RequestBody Servico servico) {
        try {
            return ResponseEntity.ok(usuarioService.adicionarServicoContratado(usuarioId, servico));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
