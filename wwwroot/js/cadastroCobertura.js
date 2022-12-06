async function getCoverageDados() {
  const options = {
    method: "POST",
    body: JSON.stringify({
      id_cliente: localStorage.getItem("id_cliente"),
      id_veiculo: localStorage.getItem("id_veiculo"),
      id_cobertura: localStorage.getItem("id_cobertura"),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3BzZWd1cm9zLmJyIiwiYXVkIjoidG9wc2VndXJvcy5iciJ9.BlgdXdY_wv06AbGtlBPRpeXs-EyGryp-20iK3lN0HG8",
    },
  };

  const policyData = await fetch(
    "https://tsb-api-policy-engine.herokuapp.com/apolice/gerar/",
    options
  );

  const policyDataJson = await policyData.json();

  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "fit-content";
  card.style.color = "##FAFAFA";

  const cardBodyTitle = document.createElement("div");
  cardBodyTitle.classList.add("card-body");
  cardBodyTitle.classList.add("titleCar");
  cardBodyTitle.style.borderTopLeftRadius = "25px";
  cardBodyTitle.style.borderTopRightRadius = "25px";

  const vehicleName = document.createElement("span");
  vehicleName.classList.add("cor");
  vehicleName.id = "nomeVeiculo";
  vehicleName.innerHTML = `${policyDataJson.enrichedPolicy.veiculo.marca} - ${policyDataJson.enrichedPolicy.veiculo.modelo}`;

  const vehicleYear = document.createElement("span");
  vehicleYear.classList.add("cor");
  vehicleYear.id = "anoVeiculo";
  vehicleYear.innerHTML = ` - ${policyDataJson.enrichedPolicy.veiculo.ano}`;

  const vehicleImage = document.createElement("img");
  vehicleImage.src = "/img/carrin.png";
  vehicleImage.style.height = "auto";
  vehicleImage.style.width = "auto";

  cardBodyTitle.appendChild(vehicleName);
  cardBodyTitle.appendChild(vehicleYear);
  cardBodyTitle.appendChild(vehicleImage);

  const hr1 = document.createElement("hr");
  hr1.style.marginTop = "0";
  hr1.style.marginBottom = "0";

  const cardBodyCoverage = document.createElement("div");
  cardBodyCoverage.classList.add("card-body");
  cardBodyCoverage.style.paddingTop = "8";
  cardBodyCoverage.style.paddingBottom = "0";
  cardBodyCoverage.style.marginBottom = "0";

  const coverageTitle = document.createElement("p");
  coverageTitle.innerHTML = "Cobertura escolhida";

  const coverageName = document.createElement("b");
  const coverageNameSpan = document.createElement("span");
  coverageNameSpan.id = "nomeCobertura";
  coverageNameSpan.innerHTML = policyDataJson.enrichedPolicy.cobertura.nome;
  coverageName.appendChild(coverageNameSpan);

  const coverageDescription = document.createElement("p");
  coverageDescription.id = "descricaoCobertura";
  coverageDescription.innerHTML =
    policyDataJson.enrichedPolicy.cobertura.descricao;

  const coverageTax = document.createElement("p");
  coverageTax.classList.add("colorBlue");
  coverageTax.id = "taxaIndenizacao";
  coverageTax.innerHTML = `Cobertura de ${policyDataJson.enrichedPolicy.cobertura.taxa_indenizacao}% do valor do veículo.`;

  cardBodyCoverage.appendChild(coverageTitle);
  cardBodyCoverage.appendChild(coverageName);
  cardBodyCoverage.appendChild(coverageDescription);
  cardBodyCoverage.appendChild(coverageTax);

  const hr2 = document.createElement("hr");
  hr2.style.marginTop = "0";
  hr2.style.marginBottom = "0";

  const cardBodyMonthlyValue = document.createElement("div");
  cardBodyMonthlyValue.classList.add("card-body");
  cardBodyMonthlyValue.classList.add("monthlyValue");

  const monthlyValueTitle = document.createElement("p");
  monthlyValueTitle.innerHTML = "Valor mensal";
  monthlyValueTitle.style.marginBottom = "8 !important";

  const monthlyValue = document.createElement("p");
  monthlyValue.classList.add("colorValue");
  monthlyValue.style.color = "#02559C";
  monthlyValue.style.fontWeight = "bold";
  monthlyValue.id = "premio";
  monthlyValue.innerHTML = `R$ ${policyDataJson.enrichedPolicy.premio}`;

  cardBodyMonthlyValue.appendChild(monthlyValueTitle);
  cardBodyMonthlyValue.appendChild(monthlyValue);

  const hr3 = document.createElement("hr");
  hr3.style.marginTop = "0";
  hr3.style.marginBottom = "0";

  const cardBodyReimbursement = document.createElement("div");
  cardBodyReimbursement.classList.add("card-body");
  cardBodyReimbursement.classList.add("reimbursement");

  const reimbursementTitle = document.createElement("p");
  reimbursementTitle.innerHTML = "Reembolso";
  reimbursementTitle.style.marginBottom = "8 !important";

  const reimbursementValue = document.createElement("p");
  reimbursementValue.classList.add("colorValue");
  reimbursementValue.style.color = "#02559C";
  reimbursementValue.style.fontWeight = "bold";
  reimbursementValue.id = "indenizacao";
  reimbursementValue.innerHTML = `R$ ${policyDataJson.enrichedPolicy.indenizacao} (${policyDataJson.enrichedPolicy.cobertura.taxa_indenizacao}% da Tabela FIPE)`;

  cardBodyReimbursement.appendChild(reimbursementTitle);
  cardBodyReimbursement.appendChild(reimbursementValue);

  card.appendChild(cardBodyTitle);
  card.appendChild(hr1);
  card.appendChild(cardBodyCoverage);
  card.appendChild(hr2);
  card.appendChild(cardBodyMonthlyValue);
  card.appendChild(hr3);
  card.appendChild(cardBodyReimbursement);

  const divSize = document.createElement("div");
  divSize.classList.add("size");

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn");
  button.classList.add("input-group");
  button.classList.add("input-group-lg");
  button.innerHTML = "CONFIRMAR E SOLICITAR SEGURO";
  button.id = "confirmationButton";

  divSize.appendChild(button);
  card.appendChild(divSize);

  const body = document.getElementsByTagName("body")[0];
  body.appendChild(card);

  const confirmationButton = document.getElementById("confirmationButton");
  confirmationButton.addEventListener("click", confirmPolicy);
}

async function loadScript() {
  createSpinner();
  await getCoverageDados();
  deleteSpinner();
}

async function confirmPolicy() {
  const options = {
    method: "POST",
    body: JSON.stringify({
      id_cliente: localStorage.getItem("id_cliente"),
      id_veiculo: localStorage.getItem("id_veiculo"),
      id_cobertura: localStorage.getItem("id_cobertura"),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3BzZWd1cm9zLmJyIiwiYXVkIjoidG9wc2VndXJvcy5iciJ9.BlgdXdY_wv06AbGtlBPRpeXs-EyGryp-20iK3lN0HG8",
    },
  };

  const policyData = await fetch(
    "https://tsb-api-policy-engine.herokuapp.com/apolice/gerar/",
    options
  );

  const policyDataJson = await policyData.json();

  const secondRequestOptions = {
    method: "POST",
    body: JSON.stringify(policyDataJson.policy),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3BzZWd1cm9zLmJyIiwiYXVkIjoidG9wc2VndXJvcy5iciJ9.BlgdXdY_wv06AbGtlBPRpeXs-EyGryp-20iK3lN0HG8",
    },
  };

  const insertPolicyResponse = await fetch(
    "https://tsb-api-policy-engine.herokuapp.com/apolice/",
    secondRequestOptions
  );

  const insertPolicyResponseJson = await insertPolicyResponse.json();

  if (insertPolicyResponseJson.message !== "Apólice criada com sucesso.") {
    alert("Erro ao criar apólice. Tente novamente.");
    return false;
  }
  alert(
    "Apólice criada com sucesso!\nRedirecionando para a página de login..."
  );
  localStorage.clear();
  window.location.href = "/";
}

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
