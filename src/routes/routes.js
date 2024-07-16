import USUARIOS_ROTAS from "./usuarios.js";

const router = [
  {
    route: USUARIOS_ROTAS,
    prefix: "/v1/users",
  },
];

export default function getAllRoutes() {
  return router;
}
