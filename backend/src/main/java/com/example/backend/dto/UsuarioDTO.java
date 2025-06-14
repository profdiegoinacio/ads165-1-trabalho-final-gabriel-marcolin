package com.example.backend.dto;

import com.example.backend.domain.Servico;
import com.example.backend.domain.Usuario;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class UsuarioDTO {
    private Long id;
    private Set<String> roles = new HashSet<>();;
    private String username;
    private String password;
    private List<Servico> servicosCriados;
    private List<Long> servicosContratados;

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.username = usuario.getUsername();
    }

    public UsuarioDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Servico> getServicosCriados() {
        return servicosCriados;
    }

    public void setServicosCriados(List<Servico> servicosCriados) {
        this.servicosCriados = servicosCriados;
    }

    public List<Long> getServicosContratados() {
        return servicosContratados;
    }

    public void setServicosContratados(List<Long> servicosContratados) {
        this.servicosContratados = servicosContratados;
    }
}
