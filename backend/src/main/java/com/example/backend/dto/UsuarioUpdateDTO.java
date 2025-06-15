package com.example.backend.dto;

import java.util.List;

public class UsuarioUpdateDTO {
    private Long id;
    private String username;
    private String password;
    private List<Long> servicosContratados;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<Long> getServicosContratados() {
        return servicosContratados;
    }

    public void setServicosContratados(List<Long> servicosContratados) {
        this.servicosContratados = servicosContratados;
    }
}