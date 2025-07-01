const form = document.querySelector("form");
const salvarBtn = document.getElementById("salvar");
const voltarBtn = document.getElementById("voltar");

const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const cor = document.getElementById("cor");
const valor = document.getElementById("valor");
const infos = document.getElementById("infos");
const radios = document.querySelectorAll("input[name='condicao']");

function validarFormulario() {
  const condicaoSelecionada = [...radios].some(radio => radio.checked);

  if (
    marca.value &&
    modelo.value.trim() &&
    cor.value.trim() &&
    valor.value.trim() &&
    infos.value.trim() &&
    condicaoSelecionada
  ) {
    salvarBtn.disabled = false;
  } else {
    salvarBtn.disabled = true;
  }
}

form.addEventListener("input", validarFormulario);
form.addEventListener("change", validarFormulario);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const condicao = [...radios].find(r => r.checked).value;

  const celular = {
    marca: marca.value,
    modelo: modelo.value,
    cor: cor.value,
    valor: valor.value,
    condicao: condicao,
    infos: infos.value
  };

  const lista = JSON.parse(localStorage.getItem("celulares")) || [];
  lista.push(celular);
  localStorage.setItem("celulares", JSON.stringify(lista));

  alert("Dados salvos com sucesso");

  form.reset();
  salvarBtn.disabled = true;
});

voltarBtn.addEventListener("click", () => {
  form.style.display = "none";
  document.getElementById("listagem").style.display = "block";

  const lista = JSON.parse(localStorage.getItem("celulares")) || [];
  const tbody = document.getElementById("tabela-corpo");

  tbody.innerHTML = "";

  lista.forEach((celular) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${celular.marca}</td>
      <td>${celular.modelo}</td>
      <td>${celular.cor}</td>
      <td>R$ ${parseFloat(celular.valor).toFixed(2)}</td>
      <td>${celular.condicao}</td>
      <td>${celular.infos}</td>
    `;
    tbody.appendChild(tr);
  });
});

document.getElementById("listagem").addEventListener("click", () => {
  form.style.display = "block";
  document.getElementById("listagem").style.display = "none";
});

validarFormulario();
