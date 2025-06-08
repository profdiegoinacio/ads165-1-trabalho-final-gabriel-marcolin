package com.example.backend.config;


import com.example.backend.domain.Usuario;
import com.example.backend.repository.AvaliacaoRepository;
import com.example.backend.repository.ServicoRepository;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;

@Configuration
public class DBInitialization {

    private final ServicoRepository servicoRepository;
    private final AvaliacaoRepository avaliacaoRepository;
    private final UsuarioRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DBInitialization(ServicoRepository servicoRepository, AvaliacaoRepository avaliacaoRepository,
                            UsuarioRepository userRepository, PasswordEncoder passwordEncoder) {
        this.servicoRepository = servicoRepository;
        this.avaliacaoRepository = avaliacaoRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public CommandLineRunner inicializarDados() {
        return args -> {
            if (userRepository.count() == 0) {
                Usuario admin = new Usuario(
                        "admin",
                        passwordEncoder.encode("admin123"),
                        Set.of("ROLE_ADMIN", "ROLE_USER")
                );
                Usuario user = new Usuario(
                        "user",
                        passwordEncoder.encode("user123"),
                        Set.of("ROLE_USER")
                );
                userRepository.saveAll(List.of(admin, user));
            }
        };
    }
}