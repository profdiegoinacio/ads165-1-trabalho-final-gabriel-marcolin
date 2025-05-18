INSERT INTO servicos (titulo, descricao, categoria, preco, telefone) VALUES
    ('Limpeza de Jardim',
     'Limpo o jardim da sua casa por um preço acessível, trabalho de segunda à sábado e atendo a região de passo fundo',
     'Limpeza',
     100.0,
     '54999787472');

INSERT INTO servicos (titulo, descricao, categoria, preco, telefone) VALUES
    ('Aulas de Matemática',
     'Ofereço reforço escolar em matemática para ensino fundamental e médio. Aulas presenciais ou online com material incluso.',
     'Educação',
     80.0,
     '54999881234');

INSERT INTO servicos (titulo, descricao, categoria, preco, telefone) VALUES
    ('Conserto de Computadores',
     'Serviço de manutenção e formatação de computadores e notebooks. Atendimento rápido e com garantia.',
     'Tecnologia',
     120.0,
     '54999674321');


INSERT INTO usuarios (tipo_usuario, nome, email, senha, telefone)
VALUES ('C', 'João da Silva', 'joao@email.com', 'senha123', '54999881234');

INSERT INTO usuarios (tipo_usuario, nome, email, senha, telefone)
VALUES ('P', 'Maria Souza', 'maria@email.com', 'senha456', '54999773344');

INSERT INTO usuarios (tipo_usuario, nome, email, senha, telefone)
VALUES ('C', 'Carlos Lima', 'carlos@email.com', 'senha789', '54999665522');


INSERT INTO avaliacoes (--servico_id, usuario_id
                        nota, comentario, data) VALUES (--1, 3,
                                                        5, 'Ótimo serviço!', CURRENT_DATE);
INSERT INTO avaliacoes (--servico_id, usuario_id,
                        nota, comentario, data) VALUES (--2, 3,
                                                        4, 'Muito bom!', CURRENT_DATE);
INSERT INTO avaliacoes (--servico_id, usuario_id,
                        nota, comentario, data) VALUES (--1, 1,
                                                        2, 'Foi razoável.', CURRENT_DATE);