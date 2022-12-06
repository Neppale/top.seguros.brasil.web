async function login() {
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let data = {
    email,
    senha,
  };
  let convertData = JSON.stringify(data);
  var retorno = await fetch(
    "https://tsb-api-policy-engine.herokuapp.com/cliente/login",
    {
      method: "POST",
      body: convertData,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  var resposta = await retorno.json();

  if (email == resposta.client.email) {
    localStorage.setItem("token", resposta.token);
    alert("Login realizado com sucesso!");
    window.location.href = "UserPage";

    localStorage.setItem("id", resposta.client.id_cliente);

    /*var userRespose = await fetch('https://tsb-api-policy-engine.herokuapp.com/cliente'),*/
  } else {
    alert("Dados incorretos");
  }
}
