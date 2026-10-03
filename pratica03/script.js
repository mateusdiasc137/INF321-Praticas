// Resolve a lógica de busca de produtos
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const cards = document.querySelectorAll('.produto-card');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const termoPesquisa = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {
        const h3Element = card.querySelector('h3');

        const nomeItem = h3Element ? h3Element.textContent.toLowerCase() : '';

        card.classList.toggle('oculto', !nomeItem.includes(termoPesquisa));
    });
});

// função para exibir mensagem de produto adicionado no carrinho
function mostrarMensagem(texto) {
    const container = document.getElementById('notificacao-carrinho');

    const divMensagem = document.createElement('div');
    divMensagem.classList.add('alerta-carrinho');

    const textoMsg = document.createElement('span');
    textoMsg.textContent = texto;

    const botaoFechar = document.createElement('button');
    botaoFechar.classList.add('botao-fechar');
    botaoFechar.textContent = '×';
    botaoFechar.type = 'button';
    botaoFechar.setAttribute('aria-label', 'Fechar aviso');

    botaoFechar.addEventListener('click', () => {
        divMensagem.remove();

        if (container.children.length === 0) {
            container.classList.remove('carrinho-visivel');
        }
    });

    divMensagem.appendChild(textoMsg);
    divMensagem.appendChild(botaoFechar);

    container.appendChild(divMensagem);

    container.classList.add('carrinho-visivel');
}

// mapeando todos os botoes de compra para acionar a mensagem de carrinho de compras
const botoes = document.querySelectorAll('.buy-button');

botoes.forEach(botao => {
    botao.addEventListener('click', function () {
        const mensagem = 'Produto adicionado ao carrinho!';

        mostrarMensagem(mensagem);
    });
});

// validação dos campos do formulário
const formulario = document.getElementById('contato-form');
const nome = document.getElementById('name-box');
const email = document.getElementById('email-box');
const mensagem = document.getElementById('msg-box');
const nomeErro = document.getElementById('nome-erro');
const emailErro = document.getElementById('email-erro');
const mensagemErro = document.getElementById('mensagem-erro');

const contatoSucesso = document.getElementById('contato-sucesso');

function validarCampo(campo, erro) {
    let textoErro = '';

    if (campo.value.trim() === '') {
        textoErro = 'Este campo é obrigatório';
    } else if (campo === email && campo.validity.typeMismatch) {
        textoErro = 'Digite um e-mail válido';
    }

    erro.textContent = textoErro;
    campo.setAttribute('aria-invalid', textoErro !== '' ? 'true' : 'false');

    if (textoErro !== '') {
        campo.classList.add('campo-invalido');
        return false;
    }

    campo.classList.remove('campo-invalido');
    return true;
}

formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    contatoSucesso.classList.add('oculto');

    const nomeValido = validarCampo(nome, nomeErro);
    const emailValido = validarCampo(email, emailErro);
    const mensagemValida = validarCampo(mensagem, mensagemErro);

    if (!nomeValido || !emailValido || !mensagemValida) {
        formulario.querySelector('.campo-invalido').focus();
        return;
    }

    // A atividade não utiliza back-end, então o envio é apenas simulado.
    contatoSucesso.textContent = 'Mensagem validada! Este envio é apenas uma simulação.';
    contatoSucesso.classList.remove('oculto');
    formulario.reset();
});

// Atualiza os erros já exibidos enquanto o usuário corrige os campos.
[nome, email, mensagem].forEach(campo => {
    campo.addEventListener('input', () => {
        contatoSucesso.classList.add('oculto');

        if (campo.classList.contains('campo-invalido')) {
            const erro = document.getElementById(campo.getAttribute('aria-describedby'));
            validarCampo(campo, erro);
        }
    });
});
