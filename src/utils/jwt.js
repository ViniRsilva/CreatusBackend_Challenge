import jsonwebtoken from "jsonwebtoken";

export function verifyJwt(token) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    const decoded = jsonwebtoken.verify(token, JWT_SECRET);
    return { auth: true, idUser: decoded.id };
  } catch (e) {
    return { auth: false, idUser: "" };
  }
}
export function asingJwt(id) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!id) throw new Error("Id invalido");
    const token = jsonwebtoken.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
    return token;
  } catch (e) {
    console.error(e);
    throw new Error("Erro ao assinar jwt");
  }
}
