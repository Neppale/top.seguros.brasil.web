const dataNascimento = document.getElementById("dataNascimento");
dataNascimento.addEventListener("keypress", () => {
  let dataNascimentoLength = dataNascimento.value.length;

  if (dataNascimentoLength == 2 || dataNascimentoLength == 5) {
    dataNascimento.value += "/";
  }
});

async function cadastraCliente() {
  localStorage.clear();

  var nomeCompleto = document.getElementById("nomeCompleto").value;
  var dataNascimento = document.getElementById("dataNascimento").value;
  var telefone1 = document.getElementById("telefone1").value;
  var telefone2 = document.getElementById("telefone2").value;

  if (nomeCompleto == "" || dataNascimento == "" || telefone1 == "") {
    alert("É necessário preencher todos os campos antes de continuar.");
    return false;
  }

  const dataNascimentoRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!dataNascimentoRegex.test(dataNascimento)) {
    alert("Data de nascimento inválida.");
    return false;
  }

  if (dataNascimento.length != 10) {
    alert("A data de nascimento deve estar no formato dd/mm/aaaa.");
    return false;
  }

  if (dataNascimento.substring(0, 2) > 31) {
    alert("O dia deve ser menor que 31.");
    return false;
  }

  if (dataNascimento.substring(3, 5) > 12) {
    alert("O mês deve ser menor que 12.");
    return false;
  }

  if (telefone1.length != 15) {
    alert("O telefone deve estar no formato (xx) xxxxx-xxxx.");
    return false;
  }

  if (telefone2.length != 15 && telefone2.length != 0) {
    alert("O telefone 2 deve estar no formato (xx) xxxxx-xxxx.");
    return false;
  }

  localStorage.setItem("nome", nomeCompleto);
  localStorage.setItem("dataNascimento", dataNascimento);
  localStorage.setItem("telefone1", telefone1);
  localStorage.setItem("telefone2", telefone2 || "");

  window.location.href = "CadastroII";
}
