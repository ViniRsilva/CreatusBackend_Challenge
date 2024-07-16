import { asingJwt } from "../utils/jwt.js";
import { gerarSenhaHash, verificarSenha } from "../utils/passwords.js";
import checkAuthentication from "../hooks/checkAuthentication.js";
import usersSchema from "./schemas/usuarios.js";
import * as users from "../db/services/usersServices.js";

import { parse } from "json2csv";

export default function USUARIOS_ROTAS(fastify, options, done) {
  fastify.post("/login", { schema: { body: usersSchema["/login"] } }, async (req, reply) => {
    try {
      const { email, password } = req.body;

      const user = await users.getByEmail(email);

      if (!user) {
        reply.status(401).send({ error: true, message: "Credenciais invalidas" });
      }

      const correctPassword = await verificarSenha(password, user.password);

      if (!correctPassword) {
        reply.status(401).send({ error: true, message: "Credenciais invalidas" });
      }

      const token = asingJwt(String(user._id));

      return {
        error: false,
        message: "login realizado com sucesso",
        data: { token },
      };
    } catch (e) {
      console.error(e);
      return reply.status(500).send({
        error: true,
        message: "Ocorreu um erro, tente novamente",
        errorObj: { ...e },
        data: null,
      });
    }
  });

  fastify.post("/users", { schema: { body: usersSchema["/users"] } }, async (req, reply) => {
    try {
      const { nome, email, password, nivel } = req.body;

      const existuser = await users.getByEmail(email);

      if (existuser) {
        return reply.status(400).send({ error: true, message: "Email ja existe" });
      }

      const hashPassword = await gerarSenhaHash(password);
      const addUser = await users.insert({
        nome,
        email,
        password: hashPassword,
        nivel,
      });

      reply.status(201).send({
        error: false,
        message: `User com id ${addUser.insertedId} adicionado`,
        data: null,
      });
    } catch (e) {
      console.error(e);
      return reply.status(500).send({
        error: true,
        message: "Ocorreu um erro, tente novamente",
        errorObj: { ...e },
        data: null,
      });
    }
  });

  fastify.get("/users", async (req, reply) => {
    try {
      const listUsers = await users.getAll();
      return {
        error: false,
        message: "Sucesso ao buscar usuarios",
        length: listUsers.length,
        data: {
          usuarios: listUsers,
        },
      };
    } catch (e) {
      console.error(e);
      return reply.status(500).send({
        error: true,
        message: "Ocorreu um erro, tente novamente",
        errorObj: { ...e },
        data: null,
      });
    }
  });

  fastify.get("/users/:id", { schema: usersSchema["/users/:id"] }, async (req, reply) => {
    try {
      const userId = req.params.id;

      const user = await users.getById(userId);
      if (!user) return reply.status(404).send({ error: true, message: "Usuario nao encontrado" });

      return {
        error: false,
        message: "Usuario encontrado com sucesso",
        data: {
          usuario: user,
        },
      };
    } catch (e) {
      console.error(e);
      return reply.status(500).send({
        error: true,
        message: "Ocorreu um erro, tente novamente",
        errorObj: { ...e },
        data: null,
      });
    }
  });

  fastify.put("/users/:id", { schema: usersSchema["/users/:id/put"] }, async (req, reply) => {
    try {
      const userId = req.params.id;
      const user = await users.getById(userId);

      if (!user) return reply.status(404).send({ error: true, message: "Usuario nao encontrado" });

      const { nome, email, password, nivel } = req.body;

      const existEmail = await users.getByEmail(email);

      if (existEmail) return reply.status(400).send({ error: true, message: "Email ja existe" });

      const hashPassword = await gerarSenhaHash(password);
      await users.update(userId, { nome, email, password: hashPassword, nivel });
      reply.status(204).send({
        error: false,
        message: "Usuario atualizado com sucesso",
        data: null,
      });
    } catch (e) {
      console.error(e);
      return reply.status(500).send({
        error: true,
        message: "Ocorreu um erro, tente novamente",
        errorObj: { ...e },
        data: null,
      });
    }
  });

  fastify.delete("/users/:id", { schema: usersSchema["/users/:id"] }, async (req, reply) => {
    try {
      const userId = req.params.id;
      const user = await users.getById(userId);

      if (!user) {
        return reply.status(404).send({ error: false, message: "Usuario nao encontrado" });
      }

      await users.remove(userId);

      return {
        error: false,
        message: "Usuario deletado com sucesso",
        data: null,
      };
    } catch (e) {
      console.error(e);
      return reply.status(500).send({
        error: true,
        message: "Ocorreu um erro, tente novamente",
        errorObj: { ...e },
        data: null,
      });
    }
  });

  fastify.get("/users/report", { preHandler: checkAuthentication }, async (req, reply) => {
    try {
      const { userId } = req;
      const user = await users.getById(userId);

      if (user.nivel < 4) {
        return reply.status(401).send({ error: true, message: "Voce nao tem permissao para acessar esse recurso" });
      }

      const usersData = await users.getAll();
      const csv = parse(usersData, { fields: ["_id", "nome", "email", "nivel"] });

      reply.header("Content-Type", "text/csv");
      reply.header("Content-Disposition", 'attachment; filename="users.csv"');

      return reply.status(200).send(csv);
    } catch (e) {
      console.log(e);
      return reply.status(500).send({
        error: true,
        message: "Ocorreu um erro, tente novamente",
        errorObj: { ...e },
        data: null,
      });
    }
  });
  done();
}
