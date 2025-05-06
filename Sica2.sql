CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    rm INTEGER NOT NULL,
    nome VARCHAR(30) NOT NULL,
    curso VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verificado BOOLEAN DEFAULT FALSE,
    codigoVerificacao INTEGER,
    dataCriacaoCodigo TIMESTAMP
);

ALTER TABLE login
ADD CONSTRAINT min_senha CHECK (LENGTH(senha) >= 8),
ADD CONSTRAINT min_nome CHECK (LENGTH(nome) >= 10);