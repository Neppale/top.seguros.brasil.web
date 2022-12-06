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

  const body = document.querySelector("body");
  const h5 = document.createElement("h5");

  const container = document.querySelector(".container");
  h5.innerText = "Suas coberturas";
  container.appendChild(h5);

  data.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const container = document.querySelector(".container");
    container.appendChild(card);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.classList.add("cardBlue");
    // on click, set localStorage.setItem("id_apolice", element.id_apolice) and redirect to DetalhesCobertura
    cardBody.onclick = () => {
      localStorage.setItem("id_apolice", element.id_apolice);
      window.location.href = "DetalhesCobertura";
    };
    card.appendChild(cardBody);

    const possante = document.createElement("div");
    possante.classList.add("possante");
    cardBody.appendChild(possante);

    const img = document.createElement("div");
    img.src = "img/Vector (5).png";
    img.classList.add("img");
    possante.appendChild(img);

    const div = document.createElement("div");
    div.classList.add("div");
    possante.appendChild(div);

    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.classList.add("h5");
    h5.innerText = element.cobertura.nome;
    div.appendChild(h5);

    const p = document.createElement("p");
    p.classList.add("card-text");
    p.classList.add("p");
    p.innerText = element.cobertura.descricao;
    div.appendChild(p);

    const p2 = document.createElement("p");
    p2.classList.add("p");
    p2.innerText = `R$ ${element.premio}`;
    div.appendChild(p2);

    const img2 = document.createElement("div");
    img2.src = "img/seta.png";
    img2.classList.add("img");
    possante.appendChild(img2);

    const status = document.createElement("div");
    status.classList.add("status");
    cardBody.appendChild(status);

    const p3 = document.createElement("p");
    p3.classList.add("pstatus");
    p3.classList.add("class");
    p3.innerText = element.status;
    status.appendChild(p3);
  });

  const size = document.createElement("div");
  size.classList.add("size");
  container.appendChild(size);

  const cadastroButton = document.createElement("button");
  cadastroButton.classList.add("btn");
  cadastroButton.classList.add("input-group");
  cadastroButton.classList.add("input-group-lg");
  cadastroButton.innerText = "+ SOLICITAR SEGURO";
  cadastroButton.onclick = () => {
    window.location.href = "Cadastro";
  };
  size.appendChild(cadastroButton);

  const cadastroLink = document.createElement("a");
  cadastroLink.classList.add("cadastro-link");
  size.appendChild(cadastroLink);
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
