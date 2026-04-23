const form = document.getElementById("formCadastro");
const fotoInput = document.getElementById("foto");
const preview = document.getElementById("preview");

const popup = document.getElementById("popup");
const nomeFinal = document.getElementById("nomeFinal");
const fotoFinal = document.getElementById("fotoFinal");


fotoInput.addEventListener("change", function() {
  const arquivo = fotoInput.files[0];

  if (arquivo) {
    const reader = new FileReader();

    reader.onload = function() {
      preview.src = reader.result;
      preview.style.display = "block";
    };

    reader.readAsDataURL(arquivo);
  }
});


form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;

  if (!fotoInput.files[0]) {
    alert("Escolha uma foto!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function() {
    nomeFinal.textContent = nome;
    fotoFinal.src = reader.result;

    popup.style.display = "flex";

    form.reset();
    preview.style.display = "none";
  };

  reader.readAsDataURL(fotoInput.files[0]);
});


function fecharPopup() {
  popup.style.display = "none";
}