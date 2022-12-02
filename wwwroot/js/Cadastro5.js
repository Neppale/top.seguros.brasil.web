async function pagina5() {
  var uso = document.getElementById("Uso").value;
  var placa = document.getElementById("Placa").value;

  if (uso == "" || placa == "") {
    alert("É necessário preencher todos os campos antes de continuar.");
    return false;
  }

  const regexPlaca = "[A-Z]{3}-[0-9][0-9A-Z][0-9]{2}$";
  if (!placa.match(regexPlaca)) {
    alert("Placa fora do padrão. Ex: ABC-1234");
    return false;
  }

  localStorage.setItem("uso", uso);
  localStorage.setItem("placa", placa);

  window.location.href = "CadastroVI";
}

const placa = document.getElementById("Placa");
placa.addEventListener("keypress", () => {
  let placaLength = placa.value.length;

  if (placaLength == 3) placa.value += "-";
});
