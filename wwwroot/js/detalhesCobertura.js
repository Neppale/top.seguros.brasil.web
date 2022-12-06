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

  // <div class="card" style="width: fit-content;">
  //       <div class="card-body titleCar" style="border-top-left-radius: 25px; border-top-right-radius: 25px;">
  //         <span class="cor" id="nomeVeiculo"></span>
  //         <span class="cor" id="anoVeiculo"></span>
  //         <img src="/img/carrin.png" style="height: auto; width: auto;">
  //       </div>
  //       <hr style="margin-top: 0px; margin-bottom: 0px;">
  //       <div class="card-body" style="padding-bottom: 0px; margin-bottom: 0px;">
  //         <p>Cobertura escolhida</p>
  //         <b>
  //           <span id="nomeCobertura"></span>
  //         </b>
  //         <p id="descricaoCobertura"></p>
  //         <p class="colorBlue" id="taxaIndenizacao"></p>
  //       </div>
  //       <hr style="margin-top: 0px; margin-bottom: 0px;">
  //       <div class="card-body monthlyValue">
  //         <p>Valor mensal</p>
  //         <p class="colorValue" style="color: rgb(2, 85, 156); font-weight: bold;" id="premio"></p>
  //       </div>
  //       <hr style="margin-top: 0px; margin-bottom: 0px;">
  //       <div class="card-body reimbursement">
  //         <p>Reembolso</p>
  //         <p class="colorValue" style="color: rgb(2, 85, 156); font-weight: bold;" id="indenizacao"></p>
  //       </div>
  //       <div class="size">
  //         <button type="button" class="btn input-group input-group-lg" id="startPolicy">ACIONAR SEGURO</button>
  //       </div>
  //       <br>
  //        <div class="cad">
  //           <button type="button" class="btn input-group input-group-lg gss" id="downloadButton">BAIXAR APÓLICE</button></a>
  //       </div>
  //   </div>

  // const nomeVeiculo = document.getElementById("nomeVeiculo");
  // const anoVeiculo = document.getElementById("anoVeiculo");
  // const nomeCobertura = document.getElementById("nomeCobertura");
  // const descricaoCobertura = document.getElementById("descricaoCobertura");
  // const taxaIndenizacao = document.getElementById("taxaIndenizacao");
  // const premio = document.getElementById("premio");
  // const indenizacao = document.getElementById("indenizacao");

  const container = document.getElementsByClassName("container")[0];
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "fit-content";
  container.appendChild(card);

  const cardBodyTitle = document.createElement("div");
  cardBodyTitle.classList.add("card-body");
  cardBodyTitle.classList.add("titleCar");
  cardBodyTitle.style.borderTopLeftRadius = "25px";
  cardBodyTitle.style.borderTopRightRadius = "25px";
  card.appendChild(cardBodyTitle);

  const nomeVeiculo = document.createElement("span");
  nomeVeiculo.classList.add("cor");
  cardBodyTitle.appendChild(nomeVeiculo);

  const anoVeiculo = document.createElement("span");
  anoVeiculo.classList.add("cor");
  cardBodyTitle.appendChild(anoVeiculo);

  const img = document.createElement("img");
  img.src = "/img/carrin.png";
  img.style.height = "auto";
  img.style.width = "auto";
  cardBodyTitle.appendChild(img);

  const hr = document.createElement("hr");
  hr.style.marginTop = "0px";
  hr.style.marginBottom = "0px";
  card.appendChild(hr);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.style.paddingBottom = "0px";
  cardBody.style.marginBottom = "0px";
  card.appendChild(cardBody);

  const p1 = document.createElement("p");
  p1.innerHTML = "Cobertura escolhida";
  cardBody.appendChild(p1);

  const b = document.createElement("b");
  cardBody.appendChild(b);

  const nomeCobertura = document.createElement("span");
  b.appendChild(nomeCobertura);

  const p2 = document.createElement("p");
  cardBody.appendChild(p2);

  const descricaoCobertura = document.createElement("span");
  p2.appendChild(descricaoCobertura);

  const p3 = document.createElement("p");
  p3.classList.add("colorBlue");
  cardBody.appendChild(p3);

  const taxaIndenizacao = document.createElement("span");
  p3.appendChild(taxaIndenizacao);

  const hr2 = document.createElement("hr");
  hr2.style.marginTop = "0px";
  hr2.style.marginBottom = "0px";
  card.appendChild(hr2);

  const cardBody2 = document.createElement("div");
  cardBody2.classList.add("card-body");
  cardBody2.classList.add("monthlyValue");
  card.appendChild(cardBody2);

  const p4 = document.createElement("p");
  p4.innerHTML = "Valor mensal";
  cardBody2.appendChild(p4);

  const p5 = document.createElement("p");
  p5.classList.add("colorValue");
  p5.style.color = "rgb(2, 85, 156)";
  p5.style.fontWeight = "bold";
  cardBody2.appendChild(p5);

  const premio = document.createElement("span");
  p5.appendChild(premio);

  const hr3 = document.createElement("hr");
  hr3.style.marginTop = "0px";
  hr3.style.marginBottom = "0px";
  card.appendChild(hr3);

  const cardBody3 = document.createElement("div");
  cardBody3.classList.add("card-body");
  cardBody3.classList.add("reimbursement");
  card.appendChild(cardBody3);

  const p6 = document.createElement("p");
  p6.innerHTML = "Valor de indenização";
  cardBody3.appendChild(p6);

  const p7 = document.createElement("p");
  p7.classList.add("colorValue");
  p7.style.color = "rgb(2, 85, 156)";
  p7.style.fontWeight = "bold";
  cardBody3.appendChild(p7);

  const indenizacao = document.createElement("span");
  p7.appendChild(indenizacao);

  const hr4 = document.createElement("hr");
  hr4.style.marginTop = "0px";
  hr4.style.marginBottom = "0px";
  card.appendChild(hr4);

  // <div class="size">
  // //         <button type="button" class="btn input-group input-group-lg" id="startPolicy">ACIONAR SEGURO</button>
  // //       </div>
  //       <br>
  //        <div class="cad">
  //           <button type="button" class="btn input-group input-group-lg gss" id="downloadButton">BAIXAR APÓLICE</button></a>
  //       </div>

  const div = document.createElement("div");
  div.classList.add("size");
  card.appendChild(div);

  const button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("input-group");
  button.classList.add("input-group-lg");
  button.id = "startPolicy";
  button.innerHTML = "ACIONAR SEGURO";
  div.appendChild(button);

  const br = document.createElement("br");
  card.appendChild(br);

  const div2 = document.createElement("div");
  div2.classList.add("cad");
  card.appendChild(div2);

  const button2 = document.createElement("button");
  button2.classList.add("btn");
  button2.classList.add("input-group");
  button2.classList.add("input-group-lg");
  button2.classList.add("gss");
  button2.id = "downloadButton";
  button2.innerHTML = "BAIXAR APÓLICE";
  div2.appendChild(button2);

  nomeVeiculo.innerHTML = `${policyData.veiculo.marca} - ${policyData.veiculo.modelo}`;
  anoVeiculo.innerHTML = `- ${policyData.veiculo.ano}`;
  nomeCobertura.innerHTML = `${policyData.cobertura.nome}`;
  descricaoCobertura.innerHTML = `${policyData.cobertura.descricao}`;
  taxaIndenizacao.innerHTML = `Cobertura de ${policyData.cobertura.taxa_indenizacao}% do valor do veículo.`;
  premio.innerHTML = `R$ ${policyData.premio}`;
  indenizacao.innerHTML = `R$ ${policyData.indenizacao}`;

  const startPolicy = document.getElementById("startPolicy");
  startPolicy.addEventListener("click", () => {
    localStorage.setItem("id_veiculo", policyData.veiculo.id_veiculo);
    localStorage.setItem("id_cliente", policyData.cliente.id_cliente);
    window.location.href = "AcionarSeguroI";
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
