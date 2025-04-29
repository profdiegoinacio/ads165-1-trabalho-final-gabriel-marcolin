package com.example.backend.controller;

import com.example.backend.dto.ServicoDTO;
import com.example.backend.service.ServicoService;
import com.example.backend.utils.GeradorDeId;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/servicos")
public class ServicoController {
    private List<ServicoDTO> servicos = new ArrayList<>();
    @Autowired
    private ServicoService servicoService;

    //DTO são temporário, comparar com as coisas
    //Criar as entidades pras listas, por exemplo
    @PostConstruct
    public void initServicos(){
        servicos.add(new ServicoDTO(
                GeradorDeId.gerarId("Servicos"),
                "Limpeza de Jardim",
                "Limpo o jardim da sua casa por um preço acessível, trabalho de segunda à sábado e atendo a região de passo fundo",
                "Limpeza",
                100.0,
                "54999787472",
                1L
        ));

        servicos.add(new ServicoDTO(
                GeradorDeId.gerarId("Servicos"),
                "Aulas de Matemática",
                "Ofereço reforço escolar em matemática para ensino fundamental e médio. Aulas presenciais ou online com material incluso.",
                "Educação",
                80.0,
                "54999881234",
                2L
        ));

        servicos.add(new ServicoDTO(
                GeradorDeId.gerarId("Servicos"),
                "Conserto de Computadores",
                "Serviço de manutenção e formatação de computadores e notebooks. Atendimento rápido e com garantia.",
                "Tecnologia",
                120.0,
                "54999674321",
                3L
        ));
    }

    @GetMapping
    public ResponseEntity<List<ServicoDTO>> buscarProdutos(
            @RequestParam(name="titulo", required = false) String titulo,
            @RequestParam(name = "precoMinimo", required = false) Double precoMinimo,
            @RequestParam(name = "categoria", required = false) List<String> categorias,
            @RequestParam(name = "ordenarPor", defaultValue = "nome") String ordenarPor,
            @RequestParam(name = "ordem", defaultValue = "asc") String ordem) {

        List<ServicoDTO>servicosFiltrados = servicoService.filtrarServicos(servicos,titulo,precoMinimo,categorias);
        servicosFiltrados = servicoService.ordenarServicos(servicosFiltrados,ordenarPor,ordem);

        return ResponseEntity.ok(servicosFiltrados);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicoDTO> buscarServicoPorId(@PathVariable Long id) {
        return ResponseEntity.ok(servicoService.getServicoById(servicos,id));
    }

    @PostMapping
    public ResponseEntity<ServicoDTO> criarServico(@Valid @RequestBody ServicoDTO servico) {
        ServicoDTO novoServico = servicoService.criarServico(servico);
        servicos.add(novoServico);
        return ResponseEntity.ok(novoServico);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirServico(@PathVariable Long id) {
        if (servicos.stream().noneMatch(s -> s.getId().equals(id))) {
            return ResponseEntity.notFound().build();
        }
        servicos.remove(servicoService.getServicoById(servicos,id));
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<ServicoDTO> atualizarServico(@Valid @RequestBody ServicoDTO servico) {
        if (servicos.stream().noneMatch(s -> s.getId().equals(servico.getId()))) {
            return ResponseEntity.notFound().build();
        }
        ServicoDTO servicoAtualizado = servicoService.atualizarServico(servico);
        servicos.removeIf(s -> s.getId().equals(servico.getId()));
        servicos.add(servicoAtualizado);
        servicos = servicoService.ordenarServicos(servicos,"id","asc");
        return ResponseEntity.ok(servicoAtualizado);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ServicoDTO> atualizarParcialmenteServico(@PathVariable Long id, @RequestBody Map<String, Object> fields) {
        try {
            ServicoDTO atualizado = servicoService.atualizarParcialmente(servicos, id, fields);
            return ResponseEntity.ok(atualizado);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}

