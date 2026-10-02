// ========================================
// MAIN.JS
// Arquivo principal do SkillMatch
// ========================================

import { carregarVagas } from "./dados.js";

import {
    VagaFrontEnd,
    analisarVagas,
    processarRecomendacao
} from "./motor.js";

import {
    mostrarVagas
} from "./ui.js";


// ========================================
// ELEMENTOS DO HTML
// ========================================

const formulario =
    document.querySelector("#formulario-candidato");

const mensagemStatus =
    document.querySelector("#mensagem-status");


// ========================================
// VARIÁVEIS
// ========================================

let vagas = [];


// ========================================
// CARREGAR VAGAS
// ========================================

async function iniciarSistema() {

    try {

        mensagemStatus.textContent =
            "Carregando vagas...";

        vagas = await carregarVagas();

        mensagemStatus.textContent =
            `${vagas.length} vagas carregadas.`;

        mostrarVagas(vagas);

    } catch (erro) {

        console.error(erro);

        mensagemStatus.textContent =
            "Erro ao carregar as vagas.";

    }
}


// ========================================
// FORMULÁRIO
// ========================================

formulario.addEventListener(
    "submit",
    (evento) => {

        evento.preventDefault();

        const nome =
            document.querySelector("#nome").value;

        const area =
            document.querySelector("#area").value;

        const habilidades =
            [...document.querySelectorAll(
                'input[name="habilidades"]:checked'
            )].map(
                input => input.value
            );


        // ========================================
        // SALVAR DADOS NO LOCALSTORAGE
        // ========================================

        const candidato = {

            nome,

            area,

            habilidades

        };


        localStorage.setItem(
            "candidatoSkillMatch",
            JSON.stringify(candidato)
        );


        // ========================================
        // TRANSFORMAR JSON EM OBJETOS VAGA
        // ========================================

        const vagasObjetos =
            vagas.map(
                vaga =>
                    new VagaFrontEnd(
                        vaga.empresa,
                        vaga.titulo,
                        vaga.tecnologias,
                        vaga.regimeTrabalho || "Não informado"
                    )
            );


        // ========================================
        // ANALISAR COMPATIBILIDADE
        // ========================================

        const analise =
            analisarVagas(
                vagasObjetos,
                habilidades,
                area
            );


        // ========================================
        // MOSTRAR RESULTADO
        // ========================================

        const vagasAnalisadas =
            analise.resultados;


        mostrarVagas(
            vagas,
            vagasAnalisadas
        );


        // ========================================
        // RECOMENDAÇÃO
        // ========================================

        if (analise.melhorVaga) {

            const recomendacao =
                processarRecomendacao(
                    analise.melhorVaga,
                    (dados) => {

                        if (
                            dados.habilidadesFaltantes
                                .length === 0
                        ) {

                            return "Parabéns! Você possui todos os requisitos dessa vaga.";

                        }

                        return `Estude prioritariamente: ${dados.habilidadesFaltantes[0]}.`;
                    }
                );


            mensagemStatus.textContent =
                `Análise #${analise.numeroAnalise}: ${recomendacao}`;

        } else {

            mensagemStatus.textContent =
                "Nenhuma vaga encontrada para essa área.";
        }

    }
);


// ========================================
// INICIAR SISTEMA
// ========================================

iniciarSistema();