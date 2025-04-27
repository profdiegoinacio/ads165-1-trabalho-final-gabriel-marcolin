package com.example.backend.controller;

import com.example.backend.dto.AvaliacaoDTO;
import com.example.backend.service.AvaliacaoService;
import com.example.backend.utils.GeradorDeId;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {

    private List<AvaliacaoDTO> avaliacoes = new ArrayList<>();

    @Autowired
    private AvaliacaoService avaliacaoService;

    @PostConstruct
    public void initAvaliacoes() {
        avaliacoes.add(new AvaliacaoDTO(
                GeradorDeId.gerarId("Avaliacoes"),
                1L,
                3L,
                5,
                "Ótimo serviço!",
                new Date()
        ));
        avaliacoes.add(new AvaliacaoDTO(
                GeradorDeId.gerarId("Avaliacoes"),
                2L,
                3L,
                4,
                "Muito bom!",
                new Date()
        ));
        avaliacoes.add(new AvaliacaoDTO(
                GeradorDeId.gerarId("Avaliacoes"),
                1L,
                1L,
                2,
                "Foi razoável.",
                new Date()
        ));
    }

    @GetMapping
    public ResponseEntity<List<AvaliacaoDTO>> buscarAvaliacoes(
            @RequestParam(name = "servicoId", required = false) Long servicoId,
            @RequestParam(name = "usuarioId", required = false) Long usuarioId,
            @RequestParam(name = "notaMinima", required = false) Integer notaMinima,
            @RequestParam(name = "ordenarPor", defaultValue = "id") String ordenarPor,
            @RequestParam(name = "ordem", defaultValue = "desc") String ordem) {

        List<AvaliacaoDTO> Avaliacoesfiltradas = avaliacaoService.filtrarAvaliacoes(avaliacoes, servicoId, usuarioId, notaMinima);
        Avaliacoesfiltradas = avaliacaoService.ordenarAvaliacoes(Avaliacoesfiltradas, ordenarPor, ordem);
        return ResponseEntity.ok(Avaliacoesfiltradas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AvaliacaoDTO> buscarAvaliacaoPorId(@PathVariable Long id) {
        return ResponseEntity.ok(avaliacaoService.getAvaliacaoById(avaliacoes, id));
    }

    @PostMapping
    public ResponseEntity<AvaliacaoDTO> criarAvaliacao(@Valid @RequestBody AvaliacaoDTO avaliacao) {
        AvaliacaoDTO nova = avaliacaoService.criarAvaliacao(avaliacao);
        avaliacoes.add(nova);
        return ResponseEntity.ok(nova);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirAvaliacao(@PathVariable Long id) {
        if (avaliacoes.stream().noneMatch(a -> a.getId().equals(id))) {
            return ResponseEntity.notFound().build();
        }
        avaliacoes.remove(avaliacaoService.getAvaliacaoById(avaliacoes, id));
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<AvaliacaoDTO> atualizarAvaliacao(@Valid @RequestBody AvaliacaoDTO avaliacao) {
        if (avaliacoes.stream().noneMatch(a -> a.getId().equals(avaliacao.getId()))) {
            return ResponseEntity.notFound().build();
        }
        AvaliacaoDTO atualizada = avaliacaoService.atualizarAvaliacao(avaliacao);
        avaliacoes.removeIf(a -> a.getId().equals(avaliacao.getId()));
        avaliacoes.add(atualizada);
        avaliacoes = avaliacaoService.ordenarAvaliacoes(avaliacoes, "id", "asc");
        return ResponseEntity.ok(atualizada);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AvaliacaoDTO> atualizarParcialmenteAvaliacao(@PathVariable Long id, @RequestBody Map<String, Object> fields) {
        try {
            AvaliacaoDTO atualizada = avaliacaoService.atualizarParcialmente(avaliacoes, id, fields);
            return ResponseEntity.ok(atualizada);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
