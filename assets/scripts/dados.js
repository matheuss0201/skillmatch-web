// ========================================
// DADOS DAS VAGAS
// ========================================

// Busca as vagas no arquivo JSON

export async function carregarVagas() {

    const resposta = await fetch(
        "./assets/data/vagas.json"
    );

    if (!resposta.ok) {
        throw new Error("Erro ao carregar as vagas.");
    }

    const vagas = await resposta.json();

    return vagas;
}