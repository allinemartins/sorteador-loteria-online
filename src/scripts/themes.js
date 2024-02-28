const themePrivate = Symbol('themePrivate');

class Themes {

    constructor(theme) {
        this.setTheme(theme);
    }

    saudacao() {
        console.log(`Olá estamos neste Theme, ${this.nome}!`);
    }

    setTheme(theme) {
        this.nome = theme || 'default';
        this[themePrivate] = themes[theme] || themes['default'];        
    }

    getTheme() {
        this.saudacao();
        return this[themePrivate];
    }
}

// Definindo variáveis para os temas
const themes = {
    default: {
        '--bg-color': '#ffffff',
        '--text-color': '#000000',
        '--cor-destaque': ''
    },
    megasena: {
        '--bg-color': '#8fcbb3',
        '--text-color': '#08140f',
        '--cor-destaque': '#209869'
    },
    lotofacil: {
        '--bg-color': '#c87fc3',
        '--text-color': '#54044e',
        '--cor-destaque': '#930089'
    },
    quina: {
        '--bg-color': '#927fc1',
        '--text-color': '#2a048b',
        '--cor-destaque': '#260085'
    },
};



// Exportando o objeto para que possa ser importado em outros arquivos
export { Themes };
