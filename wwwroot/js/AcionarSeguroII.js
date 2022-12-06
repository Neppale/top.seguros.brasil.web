const btnContinuarFile = document.getElementById("continuarFile");
let boletinElement = document.getElementById("boletinFile");

let estadoOco = document.getElementById("inputGroupSelect01");
let municipio = document.getElementById("inputGroupSelect02");
let localOcorrencia = document.getElementById("localOcorrencia");
let descOcorrencia = document.getElementById("descOcorrencia");
let dataOcorrencia = document.getElementById("dataOcorrencia");
let tipoOcorrencia = document.getElementById("tipoOcorrencia");

let file;
let tipoAceitos = ["image/png", "image/jpg", "image/jpeg"];

const dataOcorrenciaRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

boletinElement.addEventListener("change", () => {
  file = boletinElement.files[0];
});

async function AcionarSeguro3() {
  if (file == undefined) {
    alert("Escolha o arquivo do boletim");
    return false;
  } else if (tipoAceitos.includes(file.type)) {
    postArquivoOcorrencia(file);
  } else {
    alert("Formato inválido. Formatos aceitos: png, jpg, jpeg");
    return false;
  }
}

async function AcionarSeguro4() {
  if (
    estadoOco.value == undefined ||
    estadoOco.value == null ||
    estadoOco.value == "" ||
    municipio.value == undefined ||
    municipio.value == null ||
    municipio.value == ""
  ) {
    alert("Preencha todos os campos antes de continuar.");
    return false;
  } else {
    localStorage.setItem("estadoOco", estadoOco.value);
    localStorage.setItem("municipio", municipio.value);
    window.location.href = "AcionarSeguroIV";
  }
}

async function AcionarSeguro5() {
  if (
    localOcorrencia.value == undefined ||
    localOcorrencia.value == null ||
    localOcorrencia.value == "" ||
    descOcorrencia.value == undefined ||
    descOcorrencia.value == null ||
    descOcorrencia.value == "" ||
    dataOcorrencia.value == undefined ||
    dataOcorrencia.value == null ||
    dataOcorrencia.value == "" ||
    tipoOcorrencia.value == undefined ||
    tipoOcorrencia.value == null ||
    tipoOcorrencia.value == ""
  ) {
    alert("Preencha todos os campos");
    return false;
  } else if (!dataOcorrenciaRegex.test(dataOcorrencia.value)) {
    alert("A data de nascimento deve estar no formato dd/mm/aaaa.");
    return false;
  } else if (dataOcorrencia.value.length != 10) {
    alert("A data de nascimento deve estar no formato dd/mm/aaaa.");
    return false;
  } else if (dataOcorrencia.value.substring(0, 2) > 31) {
    alert("O dia deve ser menor que 31.");
    return false;
  } else if (dataOcorrencia.value.substring(3, 5) > 12) {
    alert("O mês deve ser menor que 12.");
    return false;
  } else {
    postAcionarDados();
  }
}

async function postAcionarDados() {
  const options = {
    method: "POST",
    body: JSON.stringify({
      descricao: descOcorrencia.value,
      municipio: localStorage.getItem("municipio"),
      uf: localStorage.getItem("estadoOco"),
      local: localOcorrencia.value,
      data: dataOcorrencia.value.split("/").reverse().join("-"),
      tipo: tipoOcorrencia.value,
      id_veiculo: localStorage.getItem("id_veiculo"),
      id_cliente: localStorage.getItem("id_cliente"),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const policyData = await fetch(
    "https://tsb-api-policy-engine.herokuapp.com/ocorrencia/",
    options
  );

  const policyDataJson = await policyData.json();
  localStorage.setItem("dadosRespOcorrencia", JSON.stringify(policyDataJson));
  window.location.href = "AcionarSeguroII";
}

async function postArquivoOcorrencia(file) {
  // use fileReader to read the file
  const reader = new FileReader();
  reader.readAsDataURL(file);

  // wait for the reader to finish reading
  reader.onload = async () => {
    // get the file content
    const fileContent = reader.result;
    // send the file content to the server
    const id_ocorrencia = JSON.parse(
      localStorage.getItem("dadosRespOcorrencia")
    )["incident"]["id_ocorrencia"];

    const formData = new FormData();

    formData.append(file.name, fileContent);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        //'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const sendFile = await fetch(
      "https://tsb-api-policy-engine.herokuapp.com/ocorrencia/documento/" +
        id_ocorrencia,
      options
    );
  };

  //   const teste = await sendFile.json();

  window.location.href = "AcionarSeguroV";
}
