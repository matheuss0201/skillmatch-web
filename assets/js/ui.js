export function mostrarVagas(vagas, container) {
  container.innerHTML = "";

  vagas.forEach(vaga => {
    const card = document.createElement("div");

    card.classList.add("vaga");

    card.innerHTML = `
      <h2>${vaga.titulo}</h2>
      <p><strong>Empresa:</strong> ${vaga.empresa}</p>
      <p><strong>Local:</strong> ${vaga.local}</p>
      <p><strong>Tecnologias:</strong> ${vaga.tecnologias.join(", ")}</p>
    `;

    container.appendChild(card);
  });
}