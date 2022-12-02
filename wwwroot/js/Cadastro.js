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

  if (nomeCompleto == "" || dataNascimento == "") {
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

  localStorage.setItem("nome", nomeCompleto);
  localStorage.setItem("dataNascimento", dataNascimento);

  window.location.href = "CadastroII";
}
