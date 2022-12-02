async function getMarcas() {
  const retornoMarca = await fetch(
    "https://tsb-api-policy-engine.herokuapp.com/fipe/marcas/"
  ).then((retornoMarca) => {
    return retornoMarca.json();
  });
  for (var i = 0; i < retornoMarca.length; i++) {
    $("#inputGroupSelect01").append(
      `<option value='${retornoMarca[i].codigo}'>${retornoMarca[i].nome}</option>`
    );
  }
}

addEventListener("click", (e) => {
  if (e.target.id === "inputGroupSelect02") {
    getModelo();
  } else if (e.target.id === "inputGroupSelect03") {
    getAno();
  }
});

async function getModelo() {
  const inputGroupSelect02 = document.getElementById("inputGroupSelect02");
  inputGroupSelect02.innerHTML = "Modelo";

  const inputGroupSelect03 = document.getElementById("inputGroupSelect03");
  inputGroupSelect03.innerHTML = "Ano";

  const codigoMarca = $("#inputGroupSelect01").val();
  if (codigoMarca == "Marcas") return;

  const retornoModeloJSON = await fetch(
    `https://tsb-api-policy-engine.herokuapp.com/fipe/marcas/${codigoMarca}/modelos`
  );
  const retornoModelo = await retornoModeloJSON.json();

  for (var i = 0; i < retornoModelo.length; i++) {
    $("#inputGroupSelect02").append(
      `<option value='${retornoModelo[i].codigo}'>${retornoModelo[i].nome}</option>`
    );
  }
}
async function getAno() {
  const inputGroupSelect03 = document.getElementById("inputGroupSelect03");
  inputGroupSelect03.innerHTML = "Ano";

  const codigoMarca = $("#inputGroupSelect01").val();
  const codigoModelo = $("#inputGroupSelect02").val();

  if (codigoMarca == "Marcas" || codigoModelo == "Modelo") return;
  const retornoAnoJSON = await fetch(
    `https://tsb-api-policy-engine.herokuapp.com/fipe/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`
  );
  const retornoAno = await retornoAnoJSON.json();

  for (var i = 0; i < retornoAno.length; i++) {
    $("#inputGroupSelect03").append(
      `<option value='${retornoAno[i].codigo}'>${retornoAno[i].nome}</option>`
    );
  }
}
async function pagina4() {
  const nomeMarca = $("#inputGroupSelect01 option:selected").text();
  const nomeModelo = $("#inputGroupSelect02 option:selected").text();
  const anoVeiculo = $("#inputGroupSelect03 option:selected").text();

  if (nomeMarca == "Marcas" || nomeModelo == "Modelo" || anoVeiculo == "Ano") {
    alert("É necessário preencher todos os campos antes de continuar.");
    return false;
  }

  localStorage.setItem("marca", nomeMarca);
  localStorage.setItem("modelo", nomeModelo);
  localStorage.setItem("ano", anoVeiculo);

  window.location.href = "CadastroV";
}
