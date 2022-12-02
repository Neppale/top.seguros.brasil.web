async function getCoverageData() {
  const options = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3BzZWd1cm9zLmJyIiwiYXVkIjoidG9wc2VndXJvcy5iciJ9.BlgdXdY_wv06AbGtlBPRpeXs-EyGryp-20iK3lN0HG8",
    },
  };
  const rawCoverages = await fetch(
    "https://tsb-api-policy-engine.herokuapp.com/cobertura/",
    options
  );

  const coveragesJSON = await rawCoverages.json();
  const coverages = coveragesJSON.data;

  coverages.forEach((coverage) => {
    const card = document.getElementsByClassName("container-cards")[0];
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add("mb-3");
    cardDiv.classList.add("card_cadastro");

    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("g-0");
    row.classList.add("r2");

    const col1 = document.createElement("div");
    col1.classList.add("col-md-4");
    col1.classList.add("icone");

    const img = document.createElement("img");
    img.src = "/img/Vector.png";
    img.classList.add("img-fluid");
    img.classList.add("rounded-start");
    img.alt = "icone de carro";
    col1.appendChild(img);

    const col2 = document.createElement("div");
    col2.classList.add("col-md-8");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = coverage.nome;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = coverage.descricao;

    const cardPrice = document.createElement("p");
    cardPrice.classList.add("preco");
    cardPrice.innerText = `R$${coverage.valor}`;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardPrice);

    col2.appendChild(cardBody);

    const col3 = document.createElement("div");
    col3.classList.add("select-radio");

    const radio = document.createElement("input");
    radio.classList.add("form-check-input");
    radio.classList.add("mt-0");
    radio.type = "radio";
    radio.value = coverage.id_cobertura;
    radio.name = "coverages";

    col3.appendChild(radio);

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);

    cardDiv.appendChild(row);

    card.appendChild(cardDiv);
  });
  const card = document.getElementsByClassName("container-cards")[0];
  const size = document.createElement("div");
  size.classList.add("size");

  const link = document.createElement("a");
  link.classList.add("cadastro-link");
  link.href = "/Home/CadastroCobertura";

  const button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("input-group");
  button.classList.add("input-group-lg");
  button.innerText = "CONTINUAR";
  button.onclick = selectCoverage;

  link.appendChild(button);
  size.appendChild(link);

  card.appendChild(size);
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

function selectCoverage() {
  const radio = document.querySelector("input[name=coverages]:checked");
  if (!radio) {
    alert("Selecione uma cobertura antes de continuar.");
    return false;
  }
  localStorage.setItem("cobertura", radio.value);
}

async function loadDocument(params) {
  createSpinner();
  await getCoverageData();
  deleteSpinner();
}
