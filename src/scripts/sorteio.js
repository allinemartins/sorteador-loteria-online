class Sorteio {

    classDefault = 'numeroSorteado';

    constructor() {
        this.lista = document.getElementById('lista-sorteio-gerado');
    }

    gerarSorteios(jogo) {
        this.limparSorteios(false);
        this.lista.classList.add("jogo-sorteado");
        const sorteios = this.getSorteios(jogo);
        let contador = 1;
        sorteios.forEach(item => {
            this.gerarDivSorteio(contador, item);
            contador++;
        });
        const btnCopy = this.createBtnElement('Copie todos os Jogos');
        this.lista.append(btnCopy);
    }

    limparSorteios(limpaInput = false) {
        this.lista.classList.remove('jogo-sorteado');
        this.lista.innerHTML = '';
        this.removeClass(this.classDefault);
        if(limpaInput){
            document.getElementById('qtd-sorteios').value = 1;
        }
    }

    getSorteios(jogo) {
        const qtdSorteio = Number(document.getElementById('qtd-sorteios').value);
        const sequencias = [];
        for (let i = 0; i < qtdSorteio; i++) {
            const numerosGerados = [];
            while (numerosGerados.length < jogo.sortear) {
                let numeroAleatorio = Math.floor(Math.random() * jogo.nmMax) + 1;

                if (!numerosGerados.includes(numeroAleatorio)) {
                    numerosGerados.push(numeroAleatorio);
                }
            }
            sequencias.push(numerosGerados.sort((a, b) => a - b));
        }
        return sequencias;
    }

    copyToClipboard() {
        const numeros = this.parentNode.innerText;
        const textArea = document.createElement("textarea");
        textArea.value = numeros;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        console.log("Conteúdo copiado:", numeros);
    }

    gerarDivSorteio(contador, item) {
        //btn
        const btnCopy = this.createBtnElement('Copie o Jogo');

        //div jogo
        const divJogo = this.createDivElement(item);

        //span jogo
        const span = this.createSpanElement(contador, item);

        divJogo.append(span);
        divJogo.append(btnCopy);

        this.lista.append(divJogo);
    }

    formataJogo(jogo) {
        return jogo.join(', ');
    }

    setColorAposta(item, listItem) {
        this.removeClass(this.classDefault);
        listItem.classList.toggle(this.classDefault);
        item.forEach(it => {
            const li = document.getElementById(`number_${it}`);
            li.classList.add(this.classDefault);
        });
    }

    removeClass(nmClass){
        const sorteados = document.querySelectorAll(`.${nmClass}`);
        sorteados.forEach(li => {
            li.classList.remove(nmClass);
        });
    }

    createBtnElement(message){
        //btn
        const btnCopy = document.createElement('button');
        btnCopy.classList.add('btn-resultado');
        btnCopy.setAttribute('title', message);
        btnCopy.innerHTML = '<i class="fas fa-copy"></i>';
        btnCopy.addEventListener('click', this.copyToClipboard);
        return btnCopy;
    }

    createDivElement(item){
        const divJogo = document.createElement('div');
        divJogo.classList.add('jogo');
        divJogo.setAttribute('title', 'Dê clique simples para selecionar, e duplo clique para deselecionar!')
        divJogo.addEventListener('click', this.setColorAposta.bind(this, item, divJogo));
        divJogo.addEventListener('dblclick', this.removeClass.bind(this, this.classDefault));
        return divJogo;
    }

    createSpanElement(contador, item){
        const span = document.createElement('span');
        span.innerHTML = `<b>Jogo ${contador}</b> - ${this.formataJogo(item)}`;
        return span;
    }
}

// Exportando o objeto para que possa ser importado em outros arquivos
export { Sorteio };
