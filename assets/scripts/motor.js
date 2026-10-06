
// MOTOR DO SKILLMATCH
// Adaptado do projeto original




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
        regimeTrabalho = "",
        area = "",
        salario = "",
        id = null
    ) {

        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.regimeTrabalho = regimeTrabalho;
        this.area = area;
        this.salario = salario;
        this.id = id;
    }


    exibirResumo() {

        return `Vaga para ${this.cargo} na empresa ${this.empresa}.`;
    }


    calcularCompatibilidade(habilidades) {

        const habilidadesEncontradas =
            this.requisitos.filter(
                requisito =>
                    habilidades.includes(requisito)
            );


        const habilidadesFaltantes =
            this.requisitos.filter(
                requisito =>
                    !habilidades.includes(requisito)
            );


        const totalRequisitos =
            this.requisitos.length;


        if (totalRequisitos === 0) {

            return {
                percentual: 0,
                habilidadesEncontradas: [],
                habilidadesFaltantes: []
            };
        }


        const percentual =
            Math.round(
                (
                    habilidadesEncontradas.length /
                    totalRequisitos
                ) * 100
            );


        return {

            percentual,

            habilidadesEncontradas,

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
        regimeTrabalho,
        area,
        salario,
        id
    ) {

        super(
            empresa,
            cargo,
            requisitos,
            regimeTrabalho,
            area,
            salario,
            id
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


// CONTADOR

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

        .filter(vaga => {

            return (
                !area ||
                vaga.area === area
            );
        })

        .map(vaga => {

            const resultado =
                vaga.calcularCompatibilidade(
                    habilidades
                );


            let classificacao;


            if (resultado.percentual >= 80) {

                classificacao =
                    "Alta compatibilidade";

            } else if (resultado.percentual >= 50) {

                classificacao =
                    "Média compatibilidade";

            } else {

                classificacao =
                    "Baixa compatibilidade";
            }


            return {

                id: vaga.id,

                vaga,

                percentual:
                    resultado.percentual,

                classificacao,

                habilidadesEncontradas:
                    resultado.habilidadesEncontradas,

                habilidadesFaltantes:
                    resultado.habilidadesFaltantes
            };
        });


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


    const numeroAnalise =
        contarAnalise();


    return {

        resultados,

        melhorVaga,

        numeroAnalise
    };
}


