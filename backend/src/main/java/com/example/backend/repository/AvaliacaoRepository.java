package com.example.backend.repository;

import com.example.backend.domain.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    //List<Avaliacao> findByNotaGreaterThanEqual(int notaMinima);
}
