package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;
/// Não entendi muito bem como usar os DTOs. Criei eles mas verificarei com o professor na segunda sobre seu uso
public class UsuarioDTO {
    private Long id;
    private char tipoUsuario;

    @NotBlank(message="O nome do usuário não pode ser nulo")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres.")
    private String nome;

    @NotBlank(message="O email do usuário não pode ser nulo")
    @Size(min = 3, max = 50, message = "O email deve ter entre 3 e 50 caracteres.")
    private String email;

    @NotBlank(message="A senha do usuário não pode ser nula")
    @Size(min = 3, max = 50, message = "A senha deve ter entre 3 e 50 caracteres.")
    private String senha;

    @Size(max = 11, message = "O telefone inserido é muito grande")
    private String telefone;

    private List<Long> servicosContratados;

    public UsuarioDTO(Long id, char tipoUsuario, String nome, String email, String senha, String telefone) {
        this.id = id;
        this.tipoUsuario = tipoUsuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
    }

    //Construtor sem o telefone
    public UsuarioDTO(Long id, char tipoUsuario, String nome, String email, String senha) {
        this.id = id;
        this.tipoUsuario = tipoUsuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public UsuarioDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public char getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(char tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public List<Long> getServicosContratados() {
        return servicosContratados;
    }

    public void setServicosContratados(List<Long> servicosContratados) {
        this.servicosContratados = servicosContratados;
    }
}
