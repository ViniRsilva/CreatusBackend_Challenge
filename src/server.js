import Fastify from "fastify";
import getAllRoutes from "./routes/routes.js";

const fastify = Fastify({
  logger: true,
});

export default function bootstrap() {
  try {
    fastify.listen({ host: process.env.SERVER_HOST, port: process.env.SERVER_HOST_PORT }, () => {
      console.log(`🚀 ~ Servidor rodando em http://localhost:3000`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const router = getAllRoutes();

for (const { route, prefix } of router) {
  await fastify.register(route, { prefix: prefix ?? null });
}
