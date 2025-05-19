package com.example.backend.service;

import com.example.backend.domain.Avaliacao;
import com.example.backend.repository.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public List<Avaliacao> filtrarAvaliacoes(Long servicoId, Long usuarioId, Integer notaMinima) {
        List<Avaliacao> todas = avaliacaoRepository.findAll();

        return todas.stream()
                .filter(a -> servicoId == null || a.getServico().getId().equals(servicoId))
                .filter(a -> usuarioId == null || a.getUsuario().getId().equals(usuarioId))
                .filter(a -> notaMinima == null || a.getNota() >= notaMinima)
                .toList();
    }

    public List<Avaliacao> ordenarAvaliacoes(List<Avaliacao> avaliacoes, String ordenarPor, String ordem) {
        return avaliacoes.stream()
                .sorted((a1, a2) -> {
                    int comparison = switch (ordenarPor) {
                        case "id" -> Long.compare(a1.getId(), a2.getId());
                        case "nota" -> Integer.compare(a1.getNota(), a2.getNota());
                        case "data" -> {
                            if (a1.getData() == null || a2.getData() == null) yield 0;
                            yield a1.getData().compareTo(a2.getData());
                        }
                        default -> 0;
                    };
                    return "desc".equalsIgnoreCase(ordem) ? -comparison : comparison;
                })
                .toList();
    }

    public Avaliacao getAvaliacaoById(Long id) {
        return avaliacaoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Avaliação não encontrada com o ID: " + id));
    }

    public Avaliacao criarAvaliacao(Avaliacao avaliacao) {
        if (avaliacao.getData() == null) {
            avaliacao.setData(new Date());
        }
        return avaliacaoRepository.save(avaliacao);
    }

    public Avaliacao atualizarAvaliacao(Avaliacao avaliacao) {
        if (!avaliacaoRepository.existsById(avaliacao.getId())) {
            throw new NoSuchElementException("Avaliação não encontrada para atualizar");
        }
        return avaliacaoRepository.save(avaliacao);
    }

    public Avaliacao atualizarParcialmente(Long id, Map<String, Object> fields) {
        Avaliacao avaliacao = getAvaliacaoById(id);

        for (Map.Entry<String, Object> entry : fields.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            if (value == null) {
                throw new IllegalArgumentException("O valor para o campo '" + key + "' não pode ser nulo.");
            }

            switch (key) {
                case "nota" -> {
                    if (!(value instanceof Integer)) {
                        throw new IllegalArgumentException("O campo 'nota' deve ser um número inteiro.");
                    }
                    avaliacao.setNota((Integer) value);
                }
                case "comentario" -> {
                    if (!(value instanceof String)) {
                        throw new IllegalArgumentException("O campo 'comentario' deve ser uma String.");
                    }
                    avaliacao.setComentario((String) value);
                }
                case "data" -> throw new IllegalArgumentException("O campo 'data' não pode ser atualizado manualmente.");
                default -> throw new IllegalArgumentException("Campo inválido: " + key);
            }
        }

        return avaliacaoRepository.save(avaliacao);
    }

    public void deletarAvaliacao(Long id) {
        if (!avaliacaoRepository.existsById(id)) {
            throw new NoSuchElementException("Avaliação não encontrada para exclusão.");
        }
        avaliacaoRepository.deleteById(id);
    }
}
