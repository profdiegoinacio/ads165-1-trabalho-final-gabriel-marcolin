package com.example.backend.dto;

import com.example.backend.domain.Servico;

public class ServicoResponseDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private String categoria;
    private Double preco;
    private String telefone;
    private UsuarioDTO usuario; // objeto com id, username, etc

    public ServicoResponseDTO(Servico servico) {
        this.id = servico.getId();
        this.titulo = servico.getTitulo();
        this.descricao = servico.getDescricao();
        this.categoria = servico.getCategoria();
        this.preco = servico.getPreco();
        this.telefone = servico.getTelefone();
        this.usuario = new UsuarioDTO(servico.getUsuario());
    }

    public ServicoResponseDTO(Long id, String titulo, String descricao, String categoria, Double preco, String telefone, UsuarioDTO usuario) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.categoria = categoria;
        this.preco = preco;
        this.telefone = telefone;
        this.usuario = usuario;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public Double getPreco() {
        return preco;
    }

    public String getTelefone() {
        return telefone;
    }

    public UsuarioDTO getUsuario() {
        return usuario;
    }
}