package com.example.backend.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
@Table(name="avaliacoes")
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "servico_id", nullable = false)
    private Servico servico;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @NotNull(message = "O preço não pode ser nulo.")
    @Min(value = 1, message = "A nota deve ser maior ou igual a 1.")
    @Max(value=5, message = "A nota deve ser menor ou igual a 5")
    @Column(nullable = false, length = 5)
    private int nota;

    @Column
    private String comentario;
    @Column
    private Date data;

    public Avaliacao(Long id, Servico servicoId, Usuario usuario, int nota) {
        this.id = id;
        this.servico = servicoId;
        this.usuario = usuario;
        this.nota = nota;
    }

    public Avaliacao(Long id, Servico servico, Usuario usuario, int nota, String comentario, Date data) {
        this.id = id;
        this.servico = servico;
        this.usuario = usuario;
        this.nota = nota;
        this.comentario = comentario;
        this.data = data;
    }

    public Avaliacao() {
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

    public void setUsuario(Usuario usuarioId) {
        this.usuario = usuarioId;
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
