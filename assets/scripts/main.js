

// Arquivo principal do SkillMatch


import { carregarVagas } from "./dados.js";

import {
    VagaFrontEnd,
    analisarVagas,
    processarRecomendacao
} from "./motor.js";

import {
    mostrarVagas
} from "./ui.js";



// ELEMENTOS DO HTML


const formulario =
    document.querySelector("#formulario-candidato");

const mensagemStatus =
    document.querySelector("#mensagem-status");


// VARIÁVEIS


let vagas = [];


// CARREGAR VAGAS


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


// FORMULÁRIO


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
            const vagaDiferencial =
    document.querySelector("#vaga-diferencial").value.trim();


        // SALVAR DADOS NO LOCALSTORAGE
     

        const candidato = {

            nome,

            area,

            habilidades,

            vagaDiferencial



        };


        localStorage.setItem(
            "candidatoSkillMatch",
            JSON.stringify(candidato)
        );


     
        // TRANSFORMAR JSON EM OBJETOS VAGA
        

     const vagasObjetos =
    vagas.map(
        vaga =>
            new VagaFrontEnd(
                vaga.empresa,
                vaga.titulo,
                vaga.tecnologias,
                vaga.modalidade || "Não informado",
                vaga.area,
                vaga.salario || "Não informado",
                vaga.id
            )
    );
    let vagasParaExibir = [...vagas];

   // VAGA DIFERENCIAL

if (vagaDiferencial) {

    const tecnologiasConhecidas = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Git",
        "Node.js",
        "TypeScript",
        "Vue",
        "Angular",
        "Tailwind",
        "Next.js",
        "Bootstrap",
        "Figma"
    ];

    const tecnologiasDiferencial =
        tecnologiasConhecidas.filter(tecnologia =>
            vagaDiferencial
                .toLowerCase()
                .includes(tecnologia.toLowerCase())
        );

    if (tecnologiasDiferencial.length > 0) {

        const vagaPersonalizada = {
            id: "vaga-diferencial",
            titulo: vagaDiferencial,
            empresa: "Vaga personalizada",
            local: "Personalizada",
            area: area,
            tecnologias: tecnologiasDiferencial,
            salario: "Não informado",
            modalidade: "Personalizada"
        };

       vagasParaExibir.push(vagaPersonalizada);

        vagasObjetos.push(
            new VagaFrontEnd(
                vagaPersonalizada.empresa,
                vagaPersonalizada.titulo,
                vagaPersonalizada.tecnologias,
                vagaPersonalizada.modalidade,
                vagaPersonalizada.area,
                vagaPersonalizada.salario,
                vagaPersonalizada.id
            )
        );
    }
}

        // ANALISAR COMPATIBILIDADE
      

        const analise =
            analisarVagas(
                vagasObjetos,
                habilidades,
                area
            );


        // MOSTRAR RESULTADO
       

        const vagasAnalisadas =
            analise.resultados;


       mostrarVagas(
    vagasParaExibir,
    vagasAnalisadas
);


        
        // RECOMENDAÇÃO
      

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


// INICIAR SISTEMA


iniciarSistema();
// Alternar tema claro e escuro

const botaoTema = document.querySelector("#botao-tema");

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-claro");

    if (document.body.classList.contains("tema-claro")) {
        botaoTema.textContent = "🌙 Tema";
        botaoTema.setAttribute("aria-label", "Ativar tema escuro");
    } else {
        botaoTema.textContent = "☀️ Tema";
        botaoTema.setAttribute("aria-label", "Ativar tema claro");
    }
});