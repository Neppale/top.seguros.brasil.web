async function getUserData() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const rawUserData = await fetch(
    "https://tsb-api-policy-engine.herokuapp.com/apolice/cliente/" +
      localStorage.getItem("id"),
    options
  );
  const userJson = await rawUserData.json();
  const data = userJson.data;

  // create following in body: //   <h2>Suas coberturas</h2>

  const body = document.querySelector("body");
  const h2 = document.createElement("h2");
  h2.innerText = "Suas coberturas";
  body.appendChild(h2);

  data.forEach((element) => {
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerText = element.cobertura.nome;

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.innerText = element.cobertura.descricao;

    const status = document.createElement("p");
    status.classList.add("card-text");
    status.innerText = element.status;

    const price = document.createElement("p");
    price.classList.add("card-text");
    price.innerText = `R$${element.cobertura.valor}`;

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(status);
    cardBody.appendChild(price);

    const card = document.getElementsByClassName("card")[0];
    card.appendChild(cardBody);
  });
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

async function loadDocument() {
  createSpinner();
  await getUserData();
  deleteSpinner();
}
