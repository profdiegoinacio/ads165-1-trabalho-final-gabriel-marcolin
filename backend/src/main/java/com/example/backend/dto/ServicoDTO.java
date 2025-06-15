package com.example.backend.dto;

import com.example.backend.domain.Usuario;
import jakarta.validation.constraints.*;
public class ServicoDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private String categoria;
    private Double preco;
    private String telefone;
    private Long usuarioId;

    public ServicoDTO(Long id, String titulo, String descricao, String categoria, Double preco, String telefone, Long usuarioId) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.categoria = categoria;
        this.preco = preco;
        this.telefone = telefone;
        this.usuarioId = usuarioId;
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

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

}
