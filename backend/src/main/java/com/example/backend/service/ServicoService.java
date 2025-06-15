package com.example.backend.service;

import com.example.backend.domain.Servico;
import com.example.backend.domain.Usuario;
import com.example.backend.dto.ServicoDTO;
import com.example.backend.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository repository;
    @Autowired
    private UsuarioService usuarioService;
    @Lazy
    @Autowired
    private AvaliacaoService avaliacaoService;

    public List<Servico> filtrarServicos(String titulo, Double precoMinimo, List<String> categorias) {
        return repository.findAll().stream()
                .filter(s -> titulo == null || s.getTitulo().toLowerCase().contains(titulo.toLowerCase()))
                .filter(s -> precoMinimo == null || s.getPreco() >= precoMinimo)
                .filter(s -> categorias == null || categorias.isEmpty() ||
                        categorias.stream().anyMatch(cat -> cat.equalsIgnoreCase(s.getCategoria())))
                .collect(Collectors.toList());
    }

    public List<Servico> ordenarServicos(List<Servico> servicos, String ordenarPor, String ordem) {
        return servicos.stream()
                .sorted((s1, s2) -> {
                    int comp = switch (ordenarPor) {
                        case "titulo" -> s1.getTitulo().compareToIgnoreCase(s2.getTitulo());
                        case "id" -> Long.compare(s1.getId(), s2.getId());
                        case "preco" -> Double.compare(s1.getPreco(), s2.getPreco());
                        default -> 0;
                    };
                    return "desc".equalsIgnoreCase(ordem) ? -comp : comp;
                })
                .collect(Collectors.toList());
    }

    public Servico getServicoById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Serviço não encontrado com o ID: " + id));
    }

    public Servico criarServico(ServicoDTO dto) {
        Usuario usuario = usuarioService.getUsuarioById(dto.getUsuarioId());

        Servico servico = new Servico();
        servico.setTitulo(dto.getTitulo());
        servico.setDescricao(dto.getDescricao());
        servico.setCategoria(dto.getCategoria());
        servico.setPreco(dto.getPreco());
        servico.setTelefone(dto.getTelefone());
        servico.setUsuario(usuario);

        return repository.save(servico);
    }
    public Servico atualizarServico(ServicoDTO dto) {
        Servico existente = getServicoById(dto.getId());

        Usuario usuario = usuarioService.getUsuarioById(dto.getUsuarioId());

        existente.setTitulo(dto.getTitulo());
        existente.setDescricao(dto.getDescricao());
        existente.setCategoria(dto.getCategoria());
        existente.setPreco(dto.getPreco());
        existente.setTelefone(dto.getTelefone());
        existente.setUsuario(usuario);

        return repository.save(existente);
    }

    public void deletarServico(Long id) {
        Servico servico = getServicoById(id);
        if(avaliacaoService.AvaliacaoExistePorServico(id)) {
            throw new RuntimeException("Não é possível remover o serviço. Há avaliações vinculadas.");
        }
        repository.delete(servico);
    }

    public Servico atualizarParcialmente(Long id, Map<String, Object> fields) {
        Servico servico = getServicoById(id);
        Usuario usuario = null;

        for (Map.Entry<String, Object> entry : fields.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            if (value == null) {
                throw new IllegalArgumentException("O valor para o campo '" + key + "' não pode ser nulo.");
            }

            switch (key) {
                case "titulo" -> servico.setTitulo((String) value);
                case "descricao" -> servico.setDescricao((String) value);
                case "categoria" -> servico.setCategoria((String) value);
                case "preco" -> servico.setPreco(Double.valueOf(value.toString()));
                case "telefone" -> servico.setTelefone((String) value);
                case "idUsuario" -> {
                    Long idUsuario = Long.valueOf(value.toString());
                    usuario = usuarioService.getUsuarioById(idUsuario);
                    if (usuario == null) {
                        throw new IllegalArgumentException("Usuário com ID " + idUsuario + " não encontrado.");
                    }
                    servico.setUsuario(usuario);
                }
                default -> throw new IllegalArgumentException("Campo inválido: " + key);
            }
        }

        return repository.save(servico);
    }
}
