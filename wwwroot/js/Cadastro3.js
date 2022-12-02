async function pagina3() {
  const email = document.getElementById("Email").value;
  const senha = document.getElementById("Senha").value;
  const confirmarSenha = document.getElementById("confirmeSenha").value;

  if (email == "" || senha == "") {
    alert("É necessário preencher todos os campos antes de continuar.");
    return false;
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    alert("Email inválido.");
    return false;
  }

  // TODO: Implementar validação de senha NA TELA.
  const senhaRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;
  if (!senhaRegex.test(senha)) {
    alert("Esta senha não corresponde aos requisitos mínimos de segurança.");
    return false;
  }

  if (senha != confirmarSenha) {
    alert("As senhas não correspondem.");
    return false;
  }

  localStorage.setItem("email", email);
  localStorage.setItem("senha", senha);

  window.location.href = "CadastroIV";
}
