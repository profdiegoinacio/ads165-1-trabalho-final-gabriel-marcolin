package com.example.backend.controller;

import com.example.backend.domain.Servico;
import com.example.backend.service.ServicoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/servicos")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @GetMapping
    public ResponseEntity<List<Servico>> buscarServicos(
            @RequestParam(name = "titulo", required = false) String titulo,
            @RequestParam(name = "precoMinimo", required = false) Double precoMinimo,
            @RequestParam(name = "categoria", required = false) List<String> categorias,
            @RequestParam(name = "ordenarPor", defaultValue = "nome") String ordenarPor,
            @RequestParam(name = "ordem", defaultValue = "asc") String ordem) {

        List<Servico> servicosFiltrados = servicoService.filtrarServicos(titulo, precoMinimo, categorias);
        servicosFiltrados = servicoService.ordenarServicos(servicosFiltrados, ordenarPor, ordem);

        return ResponseEntity.ok(servicosFiltrados);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscarServicoPorId(@PathVariable Long id) {
        try {
            Servico servico = servicoService.getServicoById(id);
            return ResponseEntity.ok(servico);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Servico> criarServico(@Valid @RequestBody Servico servico) {
        Servico novoServico = servicoService.criarServico(servico);
        return ResponseEntity.ok(novoServico);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirServico(@PathVariable Long id) {
        try {
            servicoService.deletarServico(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<Servico> atualizarServico(@Valid @RequestBody Servico servico) {
        try {
            Servico servicoAtualizado = servicoService.atualizarServico(servico);
            return ResponseEntity.ok(servicoAtualizado);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Servico> atualizarParcialmenteServico(@PathVariable Long id, @RequestBody Map<String, Object> fields) {
        try {
            Servico atualizado = servicoService.atualizarParcialmente(id, fields);
            return ResponseEntity.ok(atualizado);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
