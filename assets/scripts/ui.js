
// ========================================
// INTERFACE DO SKILLMATCH


export function mostrarVagas(
    vagas,
    resultados = []
) {

    const listaVagas =
        document.querySelector("#lista-vagas");

    if (!listaVagas) return;

    listaVagas.innerHTML = "";


    // ESTADO VAZIO

    if (!vagas || vagas.length === 0) {

        listaVagas.innerHTML = `
            <p class="mensagem-vazia">
                Nenhuma vaga encontrada.
            </p>
        `;

        return;
    }


    console.log("VAGAS:", vagas);
    console.log("RESULTADOS:", resultados);


    // MAIOR COMPATIBILIDADE

    const melhorPercentual =
        resultados.length > 0
            ? Math.max(
                ...resultados.map(
                    resultado => resultado.percentual
                )
            )
            : 0;


    // CRIAR CARDS

    vagas.forEach(vaga => {


        // ENCONTRAR RESULTADO DA VAGA

        const resultado =
            resultados.find(
                item => item.id === vaga.id
            );


        const percentual =
            resultado?.percentual ?? 0;


        const classificacao =
            resultado?.classificacao ??
            "Ainda não analisada";


        const tecnologias =
            vaga.tecnologias?.join(", ") ||
            "Não informado";


        // HABILIDADES

        const habilidadesEncontradas =
            resultado?.habilidadesEncontradas || [];


        const habilidadesFaltantes =
            resultado?.habilidadesFaltantes || [];


        // MELHOR MATCH

        const melhorMatch =
            resultado &&
            percentual === melhorPercentual;


        // CARD

        const card =
            document.createElement("article");


        card.className =
            melhorMatch
                ? "vaga-card melhor-match"
                : "vaga-card";


        // TEXTO DAS HABILIDADES

        const encontradasHTML =
            habilidadesEncontradas.length > 0

                ? habilidadesEncontradas
                    .map(
                        habilidade =>
                            `<span class="habilidade encontrada">
                                ✓ ${habilidade}
                            </span>`
                    )
                    .join("")

                : `<span class="nenhuma-habilidade">
                        Nenhuma
                   </span>`;


        const faltantesHTML =
            habilidadesFaltantes.length > 0

                ? habilidadesFaltantes
                    .map(
                        habilidade =>
                            `<span class="habilidade faltante">
                                ✕ ${habilidade}
                            </span>`
                    )
                    .join("")

                : `<span class="todas-habilidades">
                        Você possui todos os requisitos!
                   </span>`;


        // CONTEÚDO DO CARD

        card.innerHTML = `

            ${melhorMatch ? `
                <div class="melhor-match-badge">
                    ⭐ MELHOR MATCH
                </div>
            ` : ""}


            <h3>
                ${vaga.titulo}
            </h3>


            <p>
                <strong>Empresa:</strong>
                ${vaga.empresa}
            </p>


            <p>
                <strong>Local:</strong>
                ${vaga.local}
            </p>


            <p>
                <strong>Área:</strong>
                ${vaga.area}
            </p>


            <p>
                <strong>Salário:</strong>
                ${vaga.salario || "Não informado"}
            </p>


            <p>
                <strong>Modalidade:</strong>
                ${vaga.modalidade || "Não informado"}
            </p>


            <p>
                <strong>Tecnologias:</strong>
                ${tecnologias}
            </p>


            <div class="compatibilidade">

                <strong>
                    Compatibilidade:
                </strong>

                ${percentual}%

            </div>


            <p class="classificacao">

                ${classificacao}

            </p>


            <!-- HABILIDADES ENCONTRADAS -->

            <div class="habilidades-resultado">

                <strong>
                    Habilidades encontradas:
                </strong>

                <div class="lista-habilidades">
                    ${encontradasHTML}
                </div>

            </div>


            <!-- HABILIDADES FALTANTES -->

            <div class="habilidades-resultado">

                <strong>
                    Habilidades faltantes:
                </strong>

                <div class="lista-habilidades">
                    ${faltantesHTML}
                </div>

            </div>

        `;


        listaVagas.appendChild(card);

    });
}