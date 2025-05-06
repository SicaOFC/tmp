create database sica;
drop database sica;
use sica;

create table Aluno 
(
RM		int(6) primary key not null,
Nome	varchar(30) not null,
Curso	varchar(20),
Email	varchar(30) not null unique,
Senha	varchar(20) not null,
Tell 	varchar(20) not null
);

ALTER TABLE Aluno
ADD CONSTRAINT min_Senha CHECK (LENGTH(Senha) >= 8),
ADD CONSTRAINT min_Nome CHECK (LENGTH(Nome) >= 10);

create table Prof 
(
RM		int(6) primary key not null,
Nome	varchar(30) not null,
Email	varchar(30) not null unique,
Senha	varchar(20) not null,
Tell 	varchar(20) not null
);

ALTER TABLE Prof
ADD CONSTRAINT min_Senha CHECK (LENGTH(Senha) >= 8),
ADD CONSTRAINT min_Nome CHECK (LENGTH(Nome) >= 10);

create table Agendamento
(
id int(10) Primary key auto_increment,
RM int(6) not null,
constraint FK_AgenProf foreign key (RM) references Prof(RM),
data_hora datetime not null,
descri varchar(200) not null, -- descrição é o que vai ser feito, ex: partida de volei entre o 3DS e o 3MH
estado varchar(100) default 'Pendente' -- estado = pendente, concluido, cancelado etc
);



create table Volei
(
id		int(6) primary key not null auto_increment,
RM		int(6) not null,
constraint FK_VoleiAlu foreign key (RM) references Aluno(RM)
);

create table Basquete
(
id		int(6) primary key not null auto_increment,
RM		int(6) not null,
constraint FK_BasqueteAlu foreign key (RM) references Aluno(RM)
);

create table Futebol
(
id		int(6) primary key not null auto_increment,
RM		int(6) not null,
constraint FK_FutebolAlu foreign key (RM) references Aluno(RM)
);

create table Xadrez
(
id		int(6) primary key not null auto_increment,
RM		int(6) not null,
constraint FK_XadrezAlu foreign key (RM) references Aluno(RM)
);

SELECT * FROM Cadastro;
