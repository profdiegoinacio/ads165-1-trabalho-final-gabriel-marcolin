package com.example.backend.repository;

import com.example.backend.domain.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    boolean existsByUsuarioIdAndServicoId(Long usuarioId, Long servicoId);

    @Query("SELECT AVG(a.nota) FROM Avaliacao a WHERE a.servico.id = :servicoId")
    Double calcularMediaPorServico(@Param("servicoId") Long servicoId);

    boolean existsByServicoId(Long servicoId);
}
