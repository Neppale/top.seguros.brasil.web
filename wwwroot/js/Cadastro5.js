async function pagina5() {
  var uso = document.getElementById("Uso").value;
  var placa = document.getElementById("Placa").value;

  localStorage.setItem("Uso", uso);
  localStorage.setItem("Placa", placa);
}
