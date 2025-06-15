package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "usuarios")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles = new HashSet<>();;

    @NotBlank(message="O nome do usuário não pode ser nulo")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres.")
    @Column(nullable = false, length = 100)
    private String username;

    /*@NotBlank(message="O email do usuário não pode ser nulo")
    @Size(min = 3, max = 50, message = "O email deve ter entre 3 e 50 caracteres.")
    @Column(nullable = false, length = 50)
    private String email;*/

    @NotBlank(message="A senha do usuário não pode ser nula")
    @Column(nullable = false)
    private String password;

    /*@Size(max = 11, message = "O telefone inserido é muito grande")
    @Column
    private String telefone;*/

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Servico> servicosCriados;

    @ManyToMany
    @JoinTable(
            name = "usuarios_servicos_contratados",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "servico_id")
    )
    private List<Servico> servicosContratados;

    /*public Usuario(Long id, Set<String> roles, String username, String email, String password, String telefone) {
        this.id = id;
        this.roles = roles;
        this.username = username;
        this.email = email;
        this.password = password;
        this.telefone = telefone;
    }

    //Construtor sem o telefone
    public Usuario(Long id, Set<String> roles, String username, String email, String password) {
        this.id = id;
        this.roles = roles;
        this.username = username;
        this.email = email;
        this.password = password;
    }*/

    public Usuario(String username, String password, Set<String> roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    public Usuario() {
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

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String nome) {
        this.username = nome;
    }

    /*public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }*/

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String senha) {
        this.password = senha;
    }

    /*public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }*/

    public List<Servico> getServicosCriados() {
        return servicosCriados;
    }

    public void setServicosCriados(List<Servico> servicosContratados) {
        this.servicosCriados = servicosContratados;
    }

    public List<Servico> getServicosContratados() {
        return servicosContratados;
    }

    public void setServicosContratados(List<Servico> servicosContratados) {
        this.servicosContratados = servicosContratados;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
