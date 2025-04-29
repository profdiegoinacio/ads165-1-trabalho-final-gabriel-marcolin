package com.example.backend.dto;

import jakarta.validation.constraints.*;

public class ServicoDTO {

    private Long id;

    @NotBlank(message="O título do serviço não pode ser nulo")
    @Size(min = 3, max = 50, message = "O título deve ter entre 3 e 50 caracteres.")
    private String titulo;

    @NotBlank(message="A descrição não pode ser nula")
    @Size(min=3, max = 300, message="A descrição deve ter entre 3 e 300 caracteres.")
    private String descricao;

    @NotBlank(message="A categoria não pode ser nula")
    @Size(min=3, max = 50, message="A categoria deve ter entre 3 e 50 caracteres.")
    private String categoria;

    @NotNull(message = "O preço não pode ser nulo.")
    @Min(value = 0, message = "O preço deve ser maior ou igual a zero.")
    private Double preco;

    @NotBlank(message = "O telefone de contato não pode ser nulo.")
    @Size(max = 11, message = "O telefone inserido é muito grande")
    private String telefone;

    private Long idUsuario;

    public ServicoDTO(Long id, String titulo, String descricao, String categoria, Double preco, String telefone, Long idUsuario) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.categoria = categoria;
        this.preco = preco;
        this.telefone = telefone;
        this.idUsuario = idUsuario;
    }

    public ServicoDTO() {
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

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

}
