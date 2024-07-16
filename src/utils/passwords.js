import bcrypt from "bcrypt";

export async function gerarSenhaHash(senha) {
  try {
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    return senhaHash;
  } catch (e) {
    console.error(e);
    throw new Error("Erro ao gerar hash da senha");
  }
}

export async function verificarSenha(senha, senhaHash) {
  try {
    return await bcrypt.compare(senha, senhaHash);
  } catch (e) {
    console.error(e);
    throw new Error("Erro ao verificar a senha");
  }
}
