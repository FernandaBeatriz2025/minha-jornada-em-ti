// Mensagem inicial
console.log("Minha Jornada em TI - Site carregado com sucesso!");

// ===== Notas de Estudos =====
const salvarBtn = document.getElementById('salvarNota');
const notaInput = document.getElementById('notaInput');
const minhasNotasDiv = document.getElementById('minhasNotas');

// Carregar notas salvas
function carregarNotas() {
    minhasNotasDiv.innerHTML = '';
    const notas = JSON.parse(localStorage.getItem('minhasNotas')) || [];
    notas.forEach((notaObj, index) => {
        const div = document.createElement('div');
        div.className = 'notaItem';

        const textoDiv = document.createElement('div');
        textoDiv.className = 'notaTexto';
        textoDiv.textContent = notaObj.texto;

        const dataSpan = document.createElement('span');
        dataSpan.className = 'notaData';
        dataSpan.textContent = notaObj.data;

        const apagarBtn = document.createElement('button');
        apagarBtn.className = 'apagarBtn';
        apagarBtn.textContent = 'Apagar';
        apagarBtn.addEventListener('click', () => apagarNota(index));

        div.appendChild(textoDiv);
        div.appendChild(dataSpan);
        div.appendChild(apagarBtn);

        minhasNotasDiv.appendChild(div);
    });
}

// Salvar nova nota
salvarBtn.addEventListener('click', () => {
    const texto = notaInput.value.trim();
    if(texto === '') return;

    const notas = JSON.parse(localStorage.getItem('minhasNotas')) || [];
    const data = new Date().toLocaleString();
    notas.push({ texto, data });
    localStorage.setItem('minhasNotas', JSON.stringify(notas));
    notaInput.value = '';
    carregarNotas();
});

// Apagar nota
function apagarNota(index) {
    const notas = JSON.parse(localStorage.getItem('minhasNotas')) || [];
    notas.splice(index, 1);
    localStorage.setItem('minhasNotas', JSON.stringify(notas));
    carregarNotas();
}

// Inicializar
carregarNotas();

