function gerarSentenca(producao) {

    let input = $("#sentenca_prov");
    let sentenca = producao.innerText.split("->");

    if (sentenca[1].trim() == "ε") {
        $("#tabela-gera-sentenca").addClass("table-success");
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

        const naoTerminal = ['S', 'A', 'B', 'C', 'D'];

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

    $(".modal-body").html('<div class="row d-none" id="msg-finalizado"><div class="col-md-12 text-center"><h4>Sentença Finalizada</h4></div></div><table class="table table-bordered" id="tabela-gera-sentenca"><thead class="text-center"><th>-</th><th>a</th><th>b</th><th>c</th><th>d</th><th>$</th></thead><tbody class="text-center"><tr class="table-success" id="S"><td>S</td><td>-</td><td onclick="gerarSentenca(this)" class="cursor-pointer">S -> bA</td><td>-</td><td>-</td><td>-</td></tr><tr id="A"><td>A</td><td>A -> aAd</td><td>-</td><td>A -> cC</td><td>A -> dC</td><td>-</td></tr><tr id="B"><td>B</td><td>-</td><td>B -> bBa</td><td>B -> cDc</td><td>B -> dA</td><td>-</td></tr><tr id="C"><td>C</td><td>C -> Ab</td><td>C -> bDa</td><td>C -> Ab</td><td>C -> Ab</td><td>C -> ε</td></tr><tr id="D"><td>D</td><td>-</td><td>D -> bC</td><td>-</td><td>D -> dS</td><td>-</td></tr></tbody></table><label for="">Sentença Atual</label><input readonly type="text" name="sentenca_prov" id="sentenca_prov" class="form-control disabled" value=""></input>');
}

function montaPilha() {

    let sentenca = $("#sentenca").val();
    let pilha = $("#pilha");
    $("#div-pilha").removeClass("d-none");
    pilha.html("");
    let html = "";

    if (sentenca != "") {
        let sentencaExplodida = sentenca.split("");
        sentencaExplodida.forEach(function (letra) {
            html += `<li class="page-item"><a class="page-link">${letra}</a></li>`
        })
        html += '<li class="page-item"><a class="page-link">$</a></li>'
        pilha.html(html);
    }

}


function reconhecimento() {

    const terminal = ['a', 'b', 'c', 'd', 'ε'];
    const naoTerminal = ['A', 'B', 'C', 'D', 'S'];
    const finalPilha = ['$'];

    const parsingTable = {
        S: {
            a: null,
            b: "bA",
            c: null,
            d: null,
            $: null
        },
        A: {
            a: "aAd",
            b: null,
            c: "cC",
            d: "dC",
            $: null
        },
        B: {
            a: null,
            b: "bBa",
            c: "cDc",
            d: "dA",
            $: null
        },
        C: {
            a: "Ab",
            b: "bDa",
            c: "Ab",
            d: "Ab",
            $: "ε"
        },
        D: {
            a: null,
            b: null,
            c: null,
            d: "dS",
            $: null
        },
        a: {
            a: "ler"
        },
        b: {
            b: "ler"
        },
        c: {
            c: "ler"
        },
        d: {
            d: "ler"
        },
        $: {
            $: "terminar"
        }
    };


    let entrada = "";

    $("#tabela-pilha").removeClass("d-none");
    $('ul li:first').addClass('active');
    $("#pilha li").each(function (index, item) {
        entrada += item.innerText;
    });
    $("#tabela-pilha tbody tr:last td").eq(1).text(entrada);

    let entradaAtual = entrada[0];
    let pilhaAtual = $('#tabela-pilha tbody tr:last td:first').text().split('').reverse().join('');
    let acaoAtual = $('#tabela-pilha tbody tr:last td:last');


    if (parsingTable[pilhaAtual[0]][entradaAtual] != null && parsingTable[pilhaAtual[0]][entradaAtual] != 'ler' && parsingTable[pilhaAtual[0]][entradaAtual] != 'terminar') {
        let producao = parsingTable[pilhaAtual[0]][entradaAtual]
        acaoAtual.text([pilhaAtual[0]] + "->" + producao);
        $('#tabela-pilha tbody').append("<tr></tr>")

        let pilhaExplodida = pilhaAtual.split('');

        pilhaExplodida.forEach(function (letras) {

            if (naoTerminal.includes(letras)) {
                let aux = pilhaExplodida.indexOf(letras);
                pilhaExplodida[aux] = producao.trim();
            }
        })

        pilhaExplodida = pilhaExplodida.join('').split("");
        const primeiroElemento = pilhaExplodida[0];
        const ultimoElemento = pilhaExplodida[pilhaExplodida.length - 1];
        pilhaExplodida[0] = ultimoElemento;
        pilhaExplodida[pilhaExplodida.length - 1] = primeiroElemento;
        let resultado = pilhaExplodida.join("");


        $('#tabela-pilha tbody tr:last').append(`<td>${resultado}</td>`)
        $('#tabela-pilha tbody tr:last').append(`<td>${entrada}</td>`)

    } else if (entradaAtual == pilhaAtual[0]) {

        if (entradaAtual == "$" || pilhaAtual == "$") {
            console.log("DEU BOA KRL");
        }


        $('#tabela-pilha tbody tr:last').append(`<td>Ler -> ${entradaAtual}</td>`)

        entrada = entrada.trim().slice(1);
        resultado = pilhaAtual.slice(1);

        let pilhaExplodida = resultado.split('');
        const primeiroElemento = pilhaExplodida[0];
        const ultimoElemento = pilhaExplodida[pilhaExplodida.length - 1];
        pilhaExplodida[0] = ultimoElemento;
        pilhaExplodida[pilhaExplodida.length - 1] = primeiroElemento;
        resultado = pilhaExplodida.join("");        

        $('#tabela-pilha tbody').append("<tr></tr>")
        $('#tabela-pilha tbody tr:last').append(`<td>${resultado}</td>`)
        $('#tabela-pilha tbody tr:last').append(`<td>${entrada}</td>`)

    } else {
        console.log("erro de parsing")
    }


}