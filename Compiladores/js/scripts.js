function gerarSentenca(producao) {

    let input = $("#sentenca_prov");
    let sentenca = producao.innerText.split("->");

    if (sentenca[1].trim() == "ε") {
        $(".table").addClass("table-success");
        $("#msg-finalizado").removeClass("d-none");
        var resultado = input.val().replace("C", "");
        input.val(resultado);

        setTimeout(() => {
            $("#sentenca").val(resultado);
            $("#exampleModal").modal('toggle');
            montaPilha();
        }, "1000");
        return false;
    }

    if (producao.parentElement.hasClass = "table-success") {

        $('.table-success td').each(function (index, item) {
            item.removeAttribute("onclick");
            item.classList.remove("cursor-pointer");
        });

        producao.parentElement.classList.remove("table-success");

        let letra = sentenca[1].trim().split("");

        letra.forEach(function (item) {

            if (item == "S") {
                $("#S").addClass("table-success")
                $("#S td").each(function (index, posicao_tabela) {
                    if (posicao_tabela.innerText.length > 2) {
                        posicao_tabela.setAttribute("onclick", "gerarSentenca(this)")
                        posicao_tabela.classList.add("cursor-pointer");
                    }
                })
            }
            if (item == "A") {
                $("#A").addClass("table-success")
                $("#A td").each(function (index, posicao_tabela) {
                    if (posicao_tabela.innerText.length > 2) {
                        posicao_tabela.setAttribute("onclick", "gerarSentenca(this)")
                        posicao_tabela.classList.add("cursor-pointer");
                    }
                })
            }

            if (item == "B") {
                $("#B").addClass("table-success")
                $("#B td").each(function (index, posicao_tabela) {
                    if (posicao_tabela.innerText.length > 2) {
                        posicao_tabela.setAttribute("onclick", "gerarSentenca(this)")
                        posicao_tabela.classList.add("cursor-pointer");
                    }
                })
            }
            if (item == "C") {
                $("#C").addClass("table-success")
                $("#C td").each(function (index, posicao_tabela) {
                    if (posicao_tabela.innerText.length > 2) {
                        posicao_tabela.setAttribute("onclick", "gerarSentenca(this)")
                        posicao_tabela.classList.add("cursor-pointer");
                    }
                })
            }
            if (item == "D") {
                $("#D").addClass("table-success")
                $("#D td").each(function (index, posicao_tabela) {
                    if (posicao_tabela.innerText.length > 2) {
                        posicao_tabela.setAttribute("onclick", "gerarSentenca(this)")
                        posicao_tabela.classList.add("cursor-pointer");
                    }
                })
            }
        })

    }

    if (input.val() != "") {

        const naoTerminal = ['A', 'B', 'C', 'D'];

        sentencaExplodida = input.val().trim().split("");

        sentencaExplodida.forEach(function (letras) {
            if (naoTerminal.includes(letras)) {
                let aux = sentencaExplodida.indexOf(letras);
                sentencaExplodida[aux] = sentenca[1].trim();
            }
        })
        let resultado = sentencaExplodida.join("");
        input.val(resultado.trim());

    } else {
        input.val(sentenca[1])
    }
}

function abrirModal() {

    $(".modal-body").html('');

    $(".modal-body").html('<div class="row d-none" id="msg-finalizado"><div class="col-md-12 text-center"><h4>Sentença Finalizada</h4></div></div><table class="table table-bordered"><thead class="text-center"><th>-</th><th>a</th><th>b</th><th>c</th><th>d</th><th>$</th></thead><tbody class="text-center"><tr class="table-success" id="S"><td>S</td><td>-</td><td onclick="gerarSentenca(this)" class="cursor-pointer">S -> bA</td><td>-</td><td>-</td><td>-</td></tr><tr id="A"><td>A</td><td>A -> aAd</td><td>-</td><td>A -> cC</td><td>A -> dC</td><td>-</td></tr><tr id="B"><td>B</td><td>-</td><td>B -> bBa</td><td>B -> cDc</td><td>B -> dA</td><td>-</td></tr><tr id="C"><td>C</td><td>C -> Ab</td><td>C -> bDa</td><td>C -> Ab</td><td>C -> Ab</td><td>C -> ε</td></tr><tr id="D"><td>D</td><td>-</td><td>D -> bC</td><td>-</td><td>D -> dS</td><td>-</td></tr></tbody></table><label for="">Sentença Atual</label><input readonly type="text" name="sentenca_prov" id="sentenca_prov" class="form-control disabled" value=""></input>');
}



function montaPilha() {

    let sentenca = $("#sentenca").val();
    let pilha = $("#pilha");
    pilha.html("");
    let html = "";

    if (sentenca != "") {
        let sentencaExplodida = sentenca.split("");
        sentencaExplodida.forEach(function (letra) {
            console.log(letra);
            html += `<li class="page-item"><a class="page-link">${letra}</a></li>`

        })

        html += '<li class="page-item"><a class="page-link">$</a></li>'

        pilha.html(html);
    }

}