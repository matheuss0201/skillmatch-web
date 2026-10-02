export function calcularCompatibilidade(candidato, vaga) {
  const habilidadesDaVaga = vaga.tecnologias;

  const habilidadesDoCandidato = candidato.skills;

  const habilidadesEncontradas = habilidadesDaVaga.filter(
    habilidade => habilidadesDoCandidato.includes(habilidade)
  );

  const porcentagem =
    (habilidadesEncontradas.length / habilidadesDaVaga.length) * 100;

  return Math.round(porcentagem);
}