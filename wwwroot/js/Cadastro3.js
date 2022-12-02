async function pagina3() {
  var email = document.getElementById("Email").value;
  var senha = document.getElementById("Senha").value;

  localStorage.setItem("email", email);
  localStorage.setItem("senha", senha);
}
