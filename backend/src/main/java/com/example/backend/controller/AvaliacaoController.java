package com.example.backend.controller;

import com.example.backend.domain.Avaliacao;
import com.example.backend.dto.AvaliacaoDTO;
import com.example.backend.service.AvaliacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @GetMapping
    public ResponseEntity<List<Avaliacao>> buscarAvaliacoes(
            @RequestParam(name = "servicoId", required = false) Long servicoId,
            @RequestParam(name = "usuarioId", required = false) Long usuarioId,
            @RequestParam(name = "notaMinima", required = false) Integer notaMinima,
            @RequestParam(name = "ordenarPor", defaultValue = "id") String ordenarPor,
            @RequestParam(name = "ordem", defaultValue = "desc") String ordem) {

        List<Avaliacao> filtradas = avaliacaoService.filtrarAvaliacoes(servicoId, usuarioId, notaMinima);
        List<Avaliacao> ordenadas = avaliacaoService.ordenarAvaliacoes(filtradas, ordenarPor, ordem);
        return ResponseEntity.ok(ordenadas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Avaliacao> buscarAvaliacaoPorId(@PathVariable Long id) {
        try {
            Avaliacao avaliacao = avaliacaoService.getAvaliacaoById(id);
            return ResponseEntity.ok(avaliacao);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/existe")
    public ResponseEntity<Boolean> avaliacaoExiste(
            @RequestParam Long usuarioId,
            @RequestParam Long servicoId
    ) {
        boolean existe = avaliacaoService.AvaliacaoExiste(usuarioId, servicoId);
        return ResponseEntity.ok(existe);
    }

    @GetMapping("/existe-por-servico/{servicoId}")
    public boolean existeAvaliacaoPorServico(@PathVariable Long servicoId) {
        return avaliacaoService.AvaliacaoExistePorServico(servicoId);
    }

    @GetMapping("/media/{servicoId}")
    public ResponseEntity<Double> mediaAvaliacoes(@PathVariable Long servicoId) {
        Double media = avaliacaoService.obterMediaAvaliacoes(servicoId);
        return ResponseEntity.ok(media != null ? media : 0.0);
    }

    @PostMapping
    public ResponseEntity<Avaliacao> criarAvaliacao(@Valid @RequestBody AvaliacaoDTO avaliacao) {
        Avaliacao nova = avaliacaoService.criarAvaliacao(avaliacao);
        return ResponseEntity.ok(nova);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirAvaliacao(@PathVariable Long id) {
        try {
            avaliacaoService.deletarAvaliacao(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<Avaliacao> atualizarAvaliacao(@Valid @RequestBody Avaliacao avaliacao) {
        try {
            Avaliacao atualizada = avaliacaoService.atualizarAvaliacao(avaliacao);
            return ResponseEntity.ok(atualizada);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Avaliacao> atualizarParcialmenteAvaliacao(@PathVariable Long id, @RequestBody Map<String, Object> fields) {
        try {
            Avaliacao atualizada = avaliacaoService.atualizarParcialmente(id, fields);
            return ResponseEntity.ok(atualizada);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
