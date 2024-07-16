import { verifyJwt } from "../utils/jwt.js";

export default function checkAuthentication(req, res, done) {
  const token = req.headers["athorization"]?.split(" ")[1];

  const { auth, idUser } = verifyJwt(token);

  if (!auth) return res.status(401).send({ error: true, message: "Token inválido" });

  req.userId = idUser;
  done();
}
