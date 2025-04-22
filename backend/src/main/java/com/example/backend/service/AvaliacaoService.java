package com.example.backend.service;

import com.example.backend.dto.AvaliacaoDTO;
import com.example.backend.utils.GeradorDeId;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class AvaliacaoService {

    public List<AvaliacaoDTO> filtrarAvaliacoes(List<AvaliacaoDTO> avaliacoes, Long servicoId, Long usuarioId, Integer notaMinima) {
        return avaliacoes.stream()
                .filter(a -> servicoId == null || a.getServicoId().equals(servicoId))
                .filter(a -> usuarioId == null || a.getUsuarioId().equals(usuarioId))
                .filter(a -> notaMinima == null || a.getNota() >= notaMinima)
                .collect(Collectors.toList());
    }

    public List<AvaliacaoDTO> ordenarAvaliacoes(List<AvaliacaoDTO> avaliacoes, String ordenarPor, String ordem) {
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
                .collect(Collectors.toList());
    }

    public AvaliacaoDTO getAvaliacaoById(List<AvaliacaoDTO> avaliacoes, Long id) {
        return avaliacoes.stream()
                .filter(avaliacao -> avaliacao.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Avaliação não encontrada com o ID: " + id));
    }

    public AvaliacaoDTO criarAvaliacao(AvaliacaoDTO avaliacao) {
        return new AvaliacaoDTO(
                GeradorDeId.gerarId("Avaliacoes"),
                avaliacao.getServicoId(),
                avaliacao.getUsuarioId(),
                avaliacao.getNota(),
                avaliacao.getComentario(),
                new Date()
        );
    }

    public AvaliacaoDTO atualizarAvaliacao(AvaliacaoDTO avaliacao) {
        AvaliacaoDTO atualizada = new AvaliacaoDTO();
        atualizada.setId(avaliacao.getId());
        atualizada.setServicoId(avaliacao.getServicoId());
        atualizada.setUsuarioId(avaliacao.getUsuarioId());
        atualizada.setNota(avaliacao.getNota());
        atualizada.setComentario(avaliacao.getComentario());
        atualizada.setData(avaliacao.getData());
        return atualizada;
    }

    public AvaliacaoDTO atualizarParcialmente(List<AvaliacaoDTO> avaliacoes, Long id, Map<String, Object> fields) {
        AvaliacaoDTO avaliacao = avaliacoes.stream()
                .filter(a -> a.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Avaliação não encontrada com o ID: " + id));

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

        return avaliacao;
    }
}
