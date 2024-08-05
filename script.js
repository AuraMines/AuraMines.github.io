function max() {
    gerarBomb();
    apost = saldo;
    document.getElementById('inp').value = apost.toFixed(2);
}

function mid() {
    apost = (saldo / 2);
    document.getElementById('inp').value = apost.toFixed(2);
}

function mudarBotao(valor, resp) {
    fetch('./botoes.json')
        .then(response => response.json())
        .then(dados => {
            if (resp == 0) {
                // LOST
                apostando = 0;
                document.querySelector('#alerta').style.color = 'red';
                document.getElementById('alerta').innerText = 'You lost - $' + apost;
                document.getElementById('btApost').innerText = 'Bet Again';

                resetArray();
                for (let i = 1; i <= 25; i++) {
                    if (i === cliques[i - 1]) {
                        document.getElementById('btJg' + i).innerHTML = dados[1].svg;
                        document.getElementById('btJg' + i).style.backgroundColor = dados[1].cor_fundo;
                        document.getElementById('btJg' + i).style.boxShadow = dados[1].sombra;
                        document.getElementById('btJg' + i).style.borderColor = dados[1].contorno;
                    }
                }
                for (let i = 0; i < 4; i++) {
                    document.getElementById('btJg' + bombas[i]).innerHTML = dados[2].svg;
                    document.getElementById('btJg' + bombas[i]).style.backgroundColor = dados[2].cor_fundo;
                    document.getElementById('btJg' + bombas[i]).style.boxShadow = dados[2].sombra;
                    document.getElementById('btJg' + bombas[i]).style.borderColor = dados[2].contorno;
                }
                document.getElementById('btJg' + valor).innerHTML = dados[4].svg;
                document.getElementById('btJg' + valor).style.backgroundColor = dados[4].cor_fundo;
                document.getElementById('btJg' + valor).style.boxShadow = dados[4].sombra;
                document.getElementById('btJg' + valor).style.borderColor = dados[4].contorno;
            } else if (resp == 1) {
                // WON
                document.getElementById('btJg' + valor).innerHTML = dados[3].svg;
                document.getElementById('btJg' + valor).style.backgroundColor = dados[3].cor_fundo;
                document.getElementById('btJg' + valor).style.boxShadow = dados[3].sombra;
                document.getElementById('btJg' + valor).style.borderColor = dados[3].contorno;

                for (let i = 0; i < 25; i++) {
                    if (valor === cliques[i]) {
                        acertos++;
                        encontrado.push(valor);
                        ganho = apost * multiplc[acertos];
                        document.getElementById('lucro').innerText = '$' + ganho.toFixed(2);
                        document.getElementById('hits').innerText = acertos;
                    }
                }

                let index = cliques.indexOf(valor);
                if (index > -1) {
                    cliques[index] = 0;
                }
            }
        });
}

function gerarBomb() {
    let rand1 = Math.floor(Math.random() * 25) + 1;
    bombas[0] = rand1;
    for (let i = 1; i < 4; i++) {
        let rand = Math.floor(Math.random() * 25) + 1;
        while (bombas.includes(rand)) {
            rand = Math.floor(Math.random() * 25) + 1;
        }
        bombas[i] = rand;
    }
    bombas.sort((a, b) => a - b);
    console.log(bombas);
}

function blurs(value) {
    if (value === 1) {
        document.querySelectorAll('.tbrow').forEach(el => el.style.filter = 'none');
    } else {
        document.querySelectorAll('.tbrow').forEach(el => el.style.filter = 'blur(4px)');
    }
}

function reset() {
    document.getElementById('alerta').innerText = 'Waiting for bet...';
    document.getElementById('alerta').style.color = 'white';
    document.getElementById('btApost').innerText = 'Bet';
    document.getElementById('lucro').innerText = '$';
    document.getElementById('hits').innerText = 0;
    blurs(0);

    for (let i = 1; i <= 25; i++) {
        fetch('./botoes.json')
            .then(response => response.json())
            .then(dados => {
                document.getElementById('btJg' + i).innerHTML = dados[0].svg;
                document.getElementById('btJg' + i).style.backgroundColor = dados[0].cor_fundo;
                document.getElementById('btJg' + i).style.boxShadow = dados[0].sombra;
                document.getElementById('btJg' + i).style.borderColor = dados[0].contorno;
            });
    }

    apost = 0;
    ganho = 0;
    acertos = 0;
}

function resetArray() {
    cliques = Array.from({ length: 25 }, (_, i) => i + 1);
    encontrado = [];
}
