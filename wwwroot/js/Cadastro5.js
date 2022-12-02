const placa = document.getElementById("Placa");
placa.addEventListener("keypress", () => {
  let placaLength = placa.value.length;

  if (placaLength == 3) placa.value += "-";
});

async function pagina5() {
  var uso = document.getElementById("Uso").value;
  var placa = document.getElementById("Placa").value;
  const renavam = document.getElementById("Renavam").value;

  if (uso == "" || placa == "" || renavam == "") {
    alert("É necessário preencher todos os campos antes de continuar.");
    return false;
  }

  const regexPlaca = "[A-Z]{3}-[0-9][0-9A-Z][0-9]{2}$";
  if (!placa.match(regexPlaca)) {
    alert("Placa fora do padrão. Ex: ABC-1234");
    return false;
  }

  const regexRenavam = "[0-9]{11}$";
  if (!renavam.match(regexRenavam)) {
    alert("Renavam fora do padrão. Ex: 12345678901");
    return false;
  }

  localStorage.setItem("uso", uso);
  localStorage.setItem("placa", placa);
  localStorage.setItem("renavam", renavam);

  const cadastro = await cadastrarVeiculoAPI();
  if (cadastro) {
    alert(cadastro);
    return false;
  }

  alert(
    "Seu veículo foi cadastrado com sucesso!\nAgora vamos cadastrar sua apólice de seguros."
  );

  window.location.href = "CadastroVI";
}

async function cadastrarVeiculoAPI() {
  const vehicleData = {
    marca: localStorage.getItem("marca"),
    modelo: localStorage.getItem("modelo"),
    ano: localStorage.getItem("ano"),
    renavam: localStorage.getItem("renavam"),
    placa: localStorage.getItem("placa"),
    uso: localStorage.getItem("uso"),
    id_cliente: localStorage.getItem("id_cliente"),
  };

  const response = await fetch(
    "https://tsb-api-policy-engine.herokuapp.com/veiculo/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    }
  );

  const data = await response.json();

  if (data.message !== "Veículo criado com sucesso.") {
    return data.message;
  }

  localStorage.setItem("id_veiculo", data.vehicle.id_veiculo);
}
