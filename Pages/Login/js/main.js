function setToken(token) {
  document.cookie = "token=" + `Bearer ${token}`;
}

async function login() {
  var email = document.getElementById("emailInput").value;
  var password = document.getElementById("passwordInput").value;

  const options = {
    method: "POST",
    url: "https://localhost:7093/usuario/login",
    headers: { "Content-Type": "application/json" },
    data: { email: email, senha: password },
  };
  let response;
  try {
    let response = await axios(options);
    setToken(response.data.token);
  } catch (error) {
    console.log(error);
  }
}
