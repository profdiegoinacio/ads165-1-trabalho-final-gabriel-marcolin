package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name="servicos")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="O título do serviço não pode ser nulo")
    @Size(min = 3, max = 50, message = "O título deve ter entre 3 e 50 caracteres.")
    @Column(nullable = false, length = 50)
    private String titulo;

    @NotBlank(message="A descrição não pode ser nula")
    @Size(min=3, max = 300, message="A descrição deve ter entre 3 e 300 caracteres.")
    @Column(nullable = false, length = 300)
    private String descricao;

    @NotBlank(message="A categoria não pode ser nula")
    @Size(min=3, max = 50, message="A categoria deve ter entre 3 e 50 caracteres.")
    @Column(nullable = false, length = 50)
    private String categoria;

    @NotNull(message = "O preço não pode ser nulo.")
    @Min(value = 0, message = "O preço deve ser maior ou igual a zero.")
    @Column(nullable = false, length = 50)
    private Double preco;

    @NotBlank(message = "O telefone de contato não pode ser nulo.")
    @Size(max = 11, message = "O telefone inserido é muito grande")
    @Column(nullable = false, length = 11)
    private String telefone;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    public Servico(Long id, String titulo, String descricao, String categoria, Double preco, String telefone, Usuario Usuario) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.categoria = categoria;
        this.preco = preco;
        this.telefone = telefone;
        this.usuario = Usuario;
    }

    public Servico() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario Usuario) {
        this.usuario = Usuario;
    }

}
