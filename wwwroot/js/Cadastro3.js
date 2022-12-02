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

  const cadastro = await cadastrarClienteAPI();
  if (cadastro) {
    alert(cadastro);
    return false;
  }

  alert(
    "Seu usuário foi cadastrado com sucesso!\nAgora vamos cadastrar seu veículo."
  );
  window.location.href = "CadastroIV";
}

async function cadastrarClienteAPI() {
  const userData = {
    email: localStorage.getItem("email"),
    nome_completo: localStorage.getItem("nome"),
    senha: localStorage.getItem("senha"),
    cpf: localStorage.getItem("cpf"),
    cnh: localStorage.getItem("cnh"),
    cep: localStorage.getItem("cep") || "01310-100",
    data_nascimento: localStorage
      .getItem("dataNascimento")
      .split("/")
      .reverse()
      .join("-"),
    telefone1: localStorage.getItem("telefone") || "(00) 00000-0000",
    telefone2: localStorage.getItem("telefone2") || "(00) 00000-0000",
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  const response = await fetch(
    "https://tsb-api-policy-engine.herokuapp.com/cliente",
    options
  );
  const data = await response.json();

  if (data.message !== "Cliente criado com sucesso.") {
    return data.message;
  }

  localStorage.setItem("id_cliente", data.client.id_cliente);
}
