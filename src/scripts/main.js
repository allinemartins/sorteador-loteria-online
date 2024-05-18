// main.js
import { Themes } from './themes.js';
import { Jogos } from './jogos.js';
import { Sorteio } from './sorteio.js';
import { Estatisticas } from './estatisticas.js';

//instanciar jogo
const jogos = new Jogos();

// Aplicando o tema padrão ao carregar a página
applyElementJogos();
changeTheme('lotoFacil');
applyEvents();

function applyElementJogos() {
    const divJogos = document.getElementById("jogos");
    Object.entries(jogos.getAllJogos()).forEach(([jogo, value]) => {
        const divElement = document.createElement('div');
        divElement.classList.add('loteria-container')
        const element = document.createElement('h3');
        element.classList.add(jogo);
        element.classList.add('nome-loteria');
        element.innerText = value.title;
        element.addEventListener('click', () => changeTheme(jogo));
        divElement.append(element);
        divJogos.append(divElement);
    });
}

// Função para aplicar o tema
function applyTheme(theme) {
    const instanciaTheme = new Themes(theme);
    Object.entries(instanciaTheme.getTheme()).forEach(([property, value]) => {
        document.body.style.setProperty(property, value);
    });
}

function applyActive(jogo) {
    //remove
    document.querySelectorAll('.active').forEach((value) => {
        value.classList.remove('active')
    });
    //aplied
    const element = document.querySelector(`.${jogo}`);
    element.parentElement.classList.add('active');
}

// Função para mudar o tema
function changeTheme(theme) {
    jogos.setJogo(theme);
    applyTheme(theme);
    applyActive(theme)
    criarListaNumeros(theme);
    const sorteioObjeto = new Sorteio();
    sorteioObjeto.limparSorteios(true);
}

function criarListaNumeros(theme) {
    const numeros = jogos.getJogo();
    //aqui precisa buscar os dados estatisticos
    const dadosEstatisticos = new Estatisticas(jogos.getJogo(), theme);

    dadosEstatisticos.setEstatisticas().then(() => {
        const listaNumeros = document.getElementById('lista-numeros');
        listaNumeros.innerHTML = '';
        for (let i = numeros.nmMin; i <= numeros.nmMax; i++) {
            const listItem = document.createElement('li');
            listItem.setAttribute('id', `number_${i}`);            
            listItem.innerHTML = createInfoElement(i, dadosEstatisticos);            
            listaNumeros.appendChild(listItem);
        }
    });
}

function applyEvents() {
    const btnGerar = document.getElementById('gerar-sorteios');
    const btnLimpar = document.getElementById('limpar-sorteios');
    const sorteioObjeto = new Sorteio();
    btnGerar.addEventListener('click', (_event) => {
        const jogo = jogos.getJogo();
        // Use bind para alterar o contexto (this) e mantenha a passagem de parâmetros
        sorteioObjeto.gerarSorteios.bind(sorteioObjeto, jogo)();
    });
    btnLimpar.addEventListener('click', sorteioObjeto.limparSorteios.bind(sorteioObjeto, true));
}

function createInfoElement(numero, dadosEstatisticos) {
    let element = `<span class="info">
    <b>${numero}</b></span>`;
    if(dadosEstatisticos.getHaveDados()){
        const estatisticas = dadosEstatisticos.getEstatisticasNumero(numero);
        element += `<span class="info-detalhes">
        <b>Vezes sorteadas:</b><span class="info-detalhes-numero"> ${estatisticas.draw}</span><br/>
        <b>Atrasos em sorteios:</b><span class="info-detalhes-numero"> ${estatisticas.delayed}</span><br/>
        <b>Maior Intervalo:</b> <span class="info-detalhes-numero">${estatisticas.largestGap}</span><br/>
        <b>Maior Frequência:</b> <span class="info-detalhes-numero">${estatisticas.largestFrequency}</span><br/>
        <b>Último Sorteio:</b> <span class="info-detalhes-numero">${estatisticas.lastDraw}</span><br/>
        <b>Última Frequência:</b><span class="info-detalhes-numero"> ${estatisticas.lastFrequency}</span><br/>
        </span>`
    }
    return element;
}
