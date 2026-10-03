
// MOTOR DO SKILLMATCH
// Adaptado do projeto original




// CLOSURE


function criarContadorAnalises() {

    let totalAnalises = 0;

    return function () {

        totalAnalises++;

        return totalAnalises;
    };
}


const contarAnalise =
    criarContadorAnalises();



// CLASSE PRINCIPAL


export class Vaga {

    constructor(
        empresa,
        cargo,
        requisitos,
        regimeTrabalho = ""
    ) {

        this.empresa = empresa;

        this.cargo = cargo;

        this.requisitos = requisitos;

        this.regimeTrabalho =
            regimeTrabalho;
    }


    // Uso do THIS

    exibirResumo() {

        return `Vaga para ${this.cargo} na empresa ${this.empresa}.`;
    }


   
    // CÁLCULO DE COMPATIBILIDADE
    

    calcularCompatibilidade(
        habilidades
    ) {

        const habilidadesFaltantes =
            this.requisitos.filter(
                requisito =>
                    !habilidades.includes(
                        requisito
                    )
            );


        const totalRequisitos =
            this.requisitos.length;


        const correspondidas =
            totalRequisitos -
            habilidadesFaltantes.length;


        if (totalRequisitos === 0) {

            return {
                percentual: 0,
                habilidadesFaltantes: []
            };
        }


        const percentual =
            Math.round(
                (
                    correspondidas /
                    totalRequisitos
                ) * 100
            );


        return {
            percentual,
            habilidadesFaltantes
        };
    }
}



// HERANÇA


export class VagaFrontEnd
    extends Vaga {

    constructor(
        empresa,
        cargo,
        requisitos,
        regimeTrabalho
    ) {

        super(
            empresa,
            cargo,
            requisitos,
            regimeTrabalho
        );
    }
}


// CALLBACK


export function processarRecomendacao(
    resultado,
    callback
) {

    return callback(resultado);
}


// CONTADOR DE ANÁLISES


export function obterNumeroAnalise() {

    return contarAnalise();
}


// ANALISAR VAGAS


export function analisarVagas(
    vagas,
    habilidades,
    area
) {

    const resultados = vagas

        // FILTER
        .filter(vaga => {

            return (
                !area ||
                vaga.area === area
            );
        })


        // MAP
        .map(vaga => {

            const resultado =
                vaga.calcularCompatibilidade(
                    habilidades
                );


            let classificacao;


            if (
                resultado.percentual >= 80
            ) {

                classificacao =
                    "Alta compatibilidade";

            } else if (
                resultado.percentual >= 50
            ) {

                classificacao =
                    "Média compatibilidade";

            } else {

                classificacao =
                    "Baixa compatibilidade";
            }


            return {

                vaga,

                percentual:
                    resultado.percentual,

                classificacao,

                habilidadesFaltantes:
                    resultado.habilidadesFaltantes
            };
        });


    // REDUCE
    const melhorVaga =
        resultados.reduce(
            (maior, atual) => {

                if (!maior) {

                    return atual;
                }


                return atual.percentual >
                    maior.percentual
                    ? atual
                    : maior;
            },

            null
        );


    // Incrementa o contador

    const numeroAnalise =
        contarAnalise();


    return {

        resultados,

        melhorVaga,

        numeroAnalise
    };
} 