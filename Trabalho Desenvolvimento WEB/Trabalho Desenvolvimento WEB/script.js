const url = "https://script.google.com/macros/s/AKfycbyQ83OTlR03d2X-ofOkWItYahHbIPMiXQHj3gLRF6VE5QbRer6F6LNNWpjrIOcXho5New/exec";

function mostrarAba(id) {

    document.getElementById("agenda").style.display = "none";
    document.getElementById("historico").style.display = "none";

    document.getElementById(id).style.display = "block";

    if (id === "historico") {
        mostrarHistorico();
    }

}

function salvarReuniao() {

    let data = document.getElementById("data").value;
    let hora = document.getElementById("hora").value;
    let assunto = document.getElementById("assunto").value;
    let participantes = document.getElementById("participantes").value;

    if (!data || !hora || !assunto || !participantes) {
        alert("Preencha todos os campos.");
        return;
    }

    let dados = new URLSearchParams();

    dados.append("acao", "salvar");
    dados.append("data", data);
    dados.append("hora", hora);
    dados.append("assunto", assunto);
    dados.append("participantes", participantes);

  fetch(url, {
    method: "POST",
    body: dados
})
.then(() => {

    alert("Reunião salva com sucesso!");

    
    document.getElementById("data").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("assunto").value = "";
    document.getElementById("participantes").value = "";

})
.catch(erro => console.log(erro));
}

function mostrarHistorico() {

    fetch(url)
    .then(response => response.json())
    .then(lista => {

        let div = document.getElementById("lista");

        div.innerHTML = "";

        lista.forEach(r => {

            let card = document.createElement("div");

            card.classList.add("card");

            card.innerHTML = `
                <strong>Data:</strong> ${r.data}<br>
                <strong>Hora:</strong> ${r.hora}<br>
                <strong>Assunto:</strong> ${r.assunto}<br>
                <strong>Participantes:</strong> ${r.participantes}<br><br>

                <button onclick="excluirReuniao('${r.id}')">
                    Excluir
                </button>
            `;

            div.appendChild(card);

        });

    })
    .catch(erro => console.log(erro));

}

function excluirReuniao(id) {

    let dados = new URLSearchParams();

    dados.append("acao", "excluir");
    dados.append("id", id);

    fetch(url, {
        method: "POST",
        body: dados
    })
    .then(() => {

        mostrarHistorico();

    });

}
