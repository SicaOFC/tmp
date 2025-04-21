const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("../generated/prisma/client");
const prisma = new PrismaClient();

module.exports = {
  GerarToken: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const usuario = await prisma.login.findUnique({
        where: {
          email: email,
        },
      });

      if (!usuario) {
        return res.status(400).json({ erro: "Usuário não encontrado" });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(400).json({ erro: "Senha incorreta" });
      }

      const token = jwt.sign(
        { userId: usuario.id, email: usuario.email },
        "seu_segredo",
        { expiresIn: "1h" }
      );
      res.json({ token });
    } catch (error) {
      res
        .status(400)
        .json({ erro: "Erro ao gerar token", detalhe: error.message });
    }
  },

  CriarUsuario: async (req, res) => {
    const { rm, nome, curso, email, senha, telefone } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    try {
      const novoUsuario = await prisma.login.create({
        data: {
          rm,
          nome,
          curso,
          email,
          senha: senhaHash,
          telefone,
        },
      });
      res.json(novoUsuario);
    } catch (error) {
      res
        .status(400)
        .json({ erro: "Erro ao criar usuário", detalhe: error.message });
    }
  },

  LogarUsuario: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    jwt.verify(token, "seu_segredo", (err, decoded) => {
      if (err) {
        return res.status(401).json({ erro: "Token inválido" });
      }

      res.json({
        mensagem: "Bem-vindo ao conteúdo protegido!",
        usuario: decoded,
      });
    });
  },

  DeletarUsuario: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    jwt.verify(token, "seu_segredo", async (err, decoded) => {
      if (err) {
        return res.status(401).json({ erro: "Token inválido" });
      }

      try {
        const usuario = await prisma.login.delete({
          where: {
            id: decoded.userId,
          },
        });

        if (!usuario) {
          return res.status(400).json({ erro: "Usuário não encontrado" });
        }

        res.json({
          mensagem: "Usuário Deletado!",
          usuario: decoded.userId,
        });
      } catch (error) {
        res
          .status(400)
          .json({ erro: "Erro ao deletar usuário", detalhe: error.message });
      }
    });
  },

  EditarUsuario: async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    let data;

    if (!token) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    jwt.verify(token, "seu_segredo", async (err, decoded) => {
      if (err) {
        return res.status(401).json({ erro: "Token inválido" });
      }
      data = decoded;
    });

    if (data) {
      const { rm, nome, curso, email, senha, telefone } = req.body;

      let senhaHash;
      if (senha) {
        senhaHash = await bcrypt.hash(senha, 10);
      }

      try {
        const usuario = await prisma.login.update({
          where: {
            id: data.userId,
          },
          data: {
            rm: rm ?? undefined,
            nome: nome ?? undefined,
            curso: curso ?? undefined,
            email: email ?? undefined,
            senha: senhaHash ?? undefined,
            telefone: telefone ?? undefined,
          },
        });

        res.json({
          mensagem: "Usuário Editado!",
          usuario,
        });
      } catch (error) {
        res
          .status(400)
          .json({ erro: "Erro ao editar usuário", detalhe: error.message });
      }
    }
  },
};
