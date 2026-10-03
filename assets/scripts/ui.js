

// INTERFACE DO SKILLMATCH


export function mostrarVagas(vagas, resultados = []) {

    const listaVagas = document.querySelector("#lista-vagas");

    if (!listaVagas) return;

    listaVagas.innerHTML = "";

    // Estado vazio
    if (vagas.length === 0) {

        listaVagas.innerHTML = `
            <p class="mensagem-vazia">
                Nenhuma vaga encontrada.
            </p>
        `;

        return;
    }

    vagas.forEach((vaga, index) => {

        const resultado = resultados[index];

        const percentual =
            resultado?.percentual ?? 0;

        const classificacao =
            resultado?.classificacao ?? "Ainda não analisada";

        const card = document.createElement("article");

        card.className = "vaga-card";

        card.innerHTML = `
            <h3>${vaga.titulo}</h3>

            <p><strong>Empresa:</strong> ${vaga.empresa}</p>

            <p><strong>Local:</strong> ${vaga.local}</p>

            <p><strong>Área:</strong> ${vaga.area}</p>

            <p>
                <strong>Tecnologias:</strong>
                ${vaga.tecnologias.join(", ")}
            </p>

            <div class="compatibilidade">
                <strong>Compatibilidade:</strong>
                ${percentual}%
            </div>

            <p class="classificacao">
                ${classificacao}
            </p>
        `;

        listaVagas.appendChild(card);
    });
}