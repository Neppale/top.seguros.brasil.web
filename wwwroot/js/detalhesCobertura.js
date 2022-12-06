function createSpinner() {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner-border");
  spinner.style.width = "3rem";
  spinner.style.height = "3rem";
  spinner.setAttribute("role", "status");

  const span = document.createElement("span");
  span.classList.add("sr-only");
  spinner.appendChild(span);

  const body = document.querySelector("body");
  body.appendChild(spinner);

  const spinnerStyle = window.getComputedStyle(spinner);
  const spinnerWidth = parseInt(spinnerStyle.width);
  const spinnerHeight = parseInt(spinnerStyle.height);

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const spinnerLeft = (windowWidth - spinnerWidth) / 2;
  const spinnerTop = (windowHeight - spinnerHeight) / 2;

  spinner.style.position = "absolute";
  spinner.style.left = spinnerLeft + "px";
  spinner.style.top = spinnerTop + "px";
}

function deleteSpinner() {
  const spinner = document.querySelector(".spinner-border");
  spinner.style.display = "none";
}

async function loadDocument() {
  createSpinner();
  await getPolicyData();
  deleteSpinner();
}

async function getPolicyData() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const request = await fetch(
    `https://tsb-api-policy-engine.herokuapp.com/apolice/${localStorage.getItem(
      "id_apolice"
    )}`,
    options
  );

  const policyData = await request.json();

  const nomeVeiculo = document.getElementById("nomeVeiculo");
  const anoVeiculo = document.getElementById("anoVeiculo");
  const nomeCobertura = document.getElementById("nomeCobertura");
  const descricaoCobertura = document.getElementById("descricaoCobertura");
  const taxaIndenizacao = document.getElementById("taxaIndenizacao");
  const premio = document.getElementById("premio");
  const indenizacao = document.getElementById("indenizacao");

  nomeVeiculo.innerHTML = `${policyData.veiculo.marca} - ${policyData.veiculo.modelo}`;
  anoVeiculo.innerHTML = `- ${policyData.veiculo.ano}`;
  nomeCobertura.innerHTML = `${policyData.cobertura.nome}`;
  descricaoCobertura.innerHTML = `${policyData.cobertura.descricao}`;
  taxaIndenizacao.innerHTML = `Cobertura de ${policyData.cobertura.taxa_indenizacao}% do valor do veículo.`;
  premio.innerHTML = `R$ ${policyData.premio}`;
  indenizacao.innerHTML = `R$ ${policyData.indenizacao}`;

  const startPolicy = document.getElementById("startPolicy");
  startPolicy.addEventListener("click", () => {
    localStorage.setItem("id_apolice", policyData.id_apolice);
    // window.location.href = "/cobertura";
  });

  const downloadButton = document.getElementById("downloadButton");
  downloadButton.addEventListener("click", async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const downloadedPDF = await fetch(
      `https://tsb-api-policy-engine.herokuapp.com/apolice/documento/${localStorage.getItem(
        "id_apolice"
      )}`,
      options
    );

    const blob = await downloadedPDF.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "apolice.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  });
}
