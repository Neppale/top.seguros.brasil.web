async function getCoverageDados() {
  const options = {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3BzZWd1cm9zLmJyIiwiYXVkIjoidG9wc2VndXJvcy5iciJ9.BlgdXdY_wv06AbGtlBPRpeXs-EyGryp-20iK3lN0HG8",
    },
    body: JSON.stringify({id_cliente: localStorage.getItem("id_cliente"), 
    id_veiculo: localStorage.getItem("id_veiculo"), 
    id_cobertura: localStorage.getItem("id_cobertura")})
  };
  const policyData = await fetch(
    "https://tsb-api-policy-engine.herokuapp.com/apolice/gerar/",
    options
  );

  const policyDataJson = await policyData.json();
  console.log(policyDataJson);
  
  policyDataJson.enrichedPolicy.cobertura.descricao = descricao;
  policyDataJson.enrichedPolicy.premio = premio
  policyDataJson.enrichedPolicy.indenizacao = indenizacao;

  descricao = document.getElementById("descricao").value;
  premio = document.getElementById("valorMensal").value;
  indenizacao = document.getElementById("reembolso").value;

  descricao = $("#descricao").append(
    `<p>${retornoMarca[i].nome}</p>` 
  );

}

async function loadScript() {
  await getCoverageDados();
}