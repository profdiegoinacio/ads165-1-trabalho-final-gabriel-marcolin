package com.example.backend.service;

import com.example.backend.dto.ServicoDTO;
import com.example.backend.utils.GeradorDeId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class ServicoService {
    public List<ServicoDTO> filtrarServicos(List<ServicoDTO>servicos,String titulo, Double precoMinimo, List<String> categorias) {
        return servicos.stream()
                .filter(s -> titulo == null || s.getTitulo().toLowerCase().contains(titulo.toLowerCase()))
                .filter(s -> precoMinimo == null || s.getPreco() >= precoMinimo)
                .filter(s -> categorias == null || categorias.isEmpty() ||
                        categorias.stream()
                                .anyMatch(categoria -> categoria.equalsIgnoreCase(s.getCategoria())))
                .collect(Collectors.toList());
    }

    public List<ServicoDTO> ordenarServicos(List<ServicoDTO> servicos, String ordenarPor, String ordem) {
        return servicos.stream()
                .sorted((s1, s2) -> {
                    int comparison = switch (ordenarPor) {
                        case "id" -> Long.compare(s1.getId(), s2.getId());
                        case "titulo" -> s1.getTitulo().compareToIgnoreCase(s2.getTitulo());
                        default -> 0;
                    };
                    return "desc".equalsIgnoreCase(ordem) ? -comparison : comparison;
                })
                .collect(Collectors.toList());
    }

    public ServicoDTO getServicoById(List<ServicoDTO> servicos, Long id) {
        return servicos.stream()
                .filter(servico -> servico.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Serviço não encontrado com o ID: " + id));
    }

    public ServicoDTO criarServico(ServicoDTO servico) {
        ServicoDTO servicoCriado = new ServicoDTO(
                GeradorDeId.gerarId("Servicos"),
                servico.getTitulo(),
                servico.getDescricao(),
                servico.getCategoria(),
                servico.getPreco(),
                servico.getTelefone()
        );
        return servicoCriado;
    }

    public ServicoDTO atualizarServico(ServicoDTO servico) {
        ServicoDTO servicoAtualizado = new ServicoDTO();
        servicoAtualizado.setId(servico.getId());
        servicoAtualizado.setTitulo(servico.getTitulo());
        servicoAtualizado.setDescricao(servico.getDescricao());
        servicoAtualizado.setCategoria(servico.getCategoria());
        servicoAtualizado.setPreco(servico.getPreco());
        servicoAtualizado.setTelefone(servico.getTelefone());
        return servicoAtualizado;
    }


    public ServicoDTO atualizarParcialmente(List<ServicoDTO> servicos, Long id, Map<String, Object> fields) {
        ServicoDTO servico = servicos.stream()
                .filter(s -> s.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Serviço não encontrado com o ID: " + id));

        for (Map.Entry<String, Object> entry : fields.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            if (value == null) {
                throw new IllegalArgumentException("O valor para o campo '" + key + "' não pode ser nulo.");
            }

            switch (key) {
                case "titulo" -> {
                    if (!(value instanceof String)) {
                        throw new IllegalArgumentException("O campo 'titulo' deve ser uma String.");
                    }
                    servico.setTitulo((String) value);
                }
                case "descricao" -> {
                    if (!(value instanceof String)) {
                        throw new IllegalArgumentException("O campo 'descricao' deve ser uma String.");
                    }
                    servico.setDescricao((String) value);
                }
                case "categoria" -> {
                    if (!(value instanceof String)) {
                        throw new IllegalArgumentException("O campo 'categoria' deve ser uma String.");
                    }
                    servico.setCategoria((String) value);
                }
                case "preco" -> {
                    if (!(value instanceof Number)) {
                        throw new IllegalArgumentException("O campo 'preco' deve ser numérico.");
                    }
                    servico.setPreco(Double.valueOf(value.toString()));
                }
                case "telefone" -> {
                    if (!(value instanceof String)) {
                        throw new IllegalArgumentException("O campo 'telefone' deve ser uma String.");
                    }
                    servico.setTelefone((String) value);
                }
                default -> throw new IllegalArgumentException("Campo inválido: " + key);
            }
        }

        return servico;
    }
}


