import { mostrarVagas } from "./ui.js";

async function carregarVagas() {
  try {
    const resposta = await fetch("./assets/data/vagas.json");

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar as vagas.");
    }

    const vagas = await resposta.json();

    const container = document.getElementById("vagas");

    mostrarVagas(vagas, container);

  } catch (erro) {
    console.error("Erro:", erro);
  }
}

carregarVagas();