package com.example.backend.dto;

import com.example.backend.domain.Servico;
import com.example.backend.domain.Usuario;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
/// Não entendi muito bem como usar os DTOs. Criei eles mas verificarei com o professor na segunda sobre seu uso
public class AvaliacaoDTO {
    private Long id;
    private Servico servico;
    private Usuario usuario;

    @NotNull(message = "O preço não pode ser nulo.")
    @Min(value = 1, message = "A nota deve ser maior ou igual a 1.")
    @Max(value=5, message = "A nota deve ser menor ou igual a 5")
    private int nota;

    private String comentario;
    private Date data;

    public AvaliacaoDTO(Long id, Servico servicoId, Usuario usuarioId, int nota) {
        this.id = id;
        this.servico = servico;
        this.usuario = usuario;
        this.nota = nota;
    }

    public AvaliacaoDTO(Long id, Servico servico, Usuario usuario, int nota, String comentario, Date data) {
        this.id = id;
        this.servico = servico;
        this.usuario = usuario;
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

    public Servico getServico() {
        return servico;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {this.usuario = usuario;}

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
