fetch("/assets/dados.json")
  .then(res => res.json())
  .then(dados => {
    const select = document.getElementById("carro");
    dados.forEach(dados => {
      const opt = document.createElement("option");
      opt.value = dados.id;
      opt.textContent = dados.modelo;
      select.appendChild(opt);
    });
  })
  const form = document.querySelector("form");
  const cpfInput = document.getElementById("cpf");
  const cpfErro = document.getElementById("cpfErro");

  form.addEventListener("submit", function (e) {
    const cpf = cpfInput.value;
    if (!/^\d{11}$/.test(cpf)) {
      e.preventDefault();
      cpfErro.textContent = "O CPF deve conter exatamente 11 números sem pontos ou traços.";
      cpfErro.style.color = "red";
    } else {
      cpfErro.textContent = "";
    }
  });