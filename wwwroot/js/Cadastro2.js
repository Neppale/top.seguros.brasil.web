const cpfMascara = document.getElementById("cpf");
cpfMascara.addEventListener("keypress", () => {
  let cpfLength = cpfMascara.value.length;

  if (cpfLength == 3 || cpfLength == 7) {
    cpfMascara.value += ".";
  } else if (cpfLength == 11) {
    cpfMascara.value += "-";
  }
});

async function pagina2() {
  const cpf = document.getElementById("cpf").value;
  const cnh = document.getElementById("cnh").value;
  const cep = document.getElementById("cep").value;

  if (cpf == "" || cnh == "" || cep == "") {
    alert("É necessário preencher todos os campos antes de continuar.");
    return false;
  }

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  if (!cpfRegex.test(cpf)) {
    alert("CPF inválido.");
    return false;
  }

  if (cpf.length != 14) {
    alert("O CPF deve estar no formato 'xxx.xxx.xxx-xx'.");
    return false;
  }

  const cepRegex = /^\d{5}\-\d{3}$/;
  if (!cepRegex.test(cep)) {
    alert("CEP inválido.");
    return false;
  }

  if (cep.length != 9) {
    alert("O CEP deve estar no formato 'xxxxx-xxx'.");
    return false;
  }

  const cnhRegex = /^\d{11}$/;
  if (!cnhRegex.test(cnh)) {
    alert("CNH inválida.");
    return false;
  }

  if (cnh.length != 11) {
    alert("A CNH deve ter 11 dígitos.");
    return false;
  }

  localStorage.setItem("cpf", cpf);
  localStorage.setItem("cnh", cnh);
  localStorage.setItem("cep", cep);

  window.location.href = "CadastroIII";
}
