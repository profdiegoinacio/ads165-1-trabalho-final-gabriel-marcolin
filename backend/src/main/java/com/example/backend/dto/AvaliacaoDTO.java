package com.example.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public class AvaliacaoDTO {
    private Long id;
    private Long servicoId;
    private Long usuarioId;

    @NotNull(message = "O preço não pode ser nulo.")
    @Min(value = 1, message = "A nota deve ser maior ou igual a 1.")
    @Max(value=5, message = "A nota deve ser menor ou igual a 5")
    private int nota;

    private String comentario;
    private Date data;

    public AvaliacaoDTO(Long id, Long servicoId, Long usuarioId, int nota) {
        this.id = id;
        this.servicoId = servicoId;
        this.usuarioId = usuarioId;
        this.nota = nota;
    }

    public AvaliacaoDTO(Long id, Long servicoId, Long usuarioId, int nota, String comentario, Date data) {
        this.id = id;
        this.servicoId = servicoId;
        this.usuarioId = usuarioId;
        this.nota = nota;
        this.comentario = comentario;
        this.data = data;
    }

    public AvaliacaoDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getServicoId() {
        return servicoId;
    }

    public void setServicoId(Long servicoId) {
        this.servicoId = servicoId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }
}
