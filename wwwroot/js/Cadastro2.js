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
  var cpf = document.getElementById("cpf").value;
  var cnh = document.getElementById("cnh").value;

  if (cpf == "" || cnh == "") {
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

  if (cnh.length != 11) {
    alert("A CNH deve ter 11 dígitos.");
    return false;
  }

  localStorage.setItem("cpf", cpf);
  localStorage.setItem("cnh", cnh);

  window.location.href = "CadastroIII";
}
