console.log("Minha Jornada em TI - Site carregado com sucesso!");

// ===== Toast Notification =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.opacity = 1;
  setTimeout(()=>{ toast.style.opacity = 0; },2000);
}

// ===== Dark Mode Toggle =====
const toggleDark = document.getElementById('toggleDark');
toggleDark.addEventListener('click', () => {
  document.body.classList.toggle('darkMode');
  showToast("Modo alterado!");
});

// ===== Notas =====
const salvarBtn = document.getElementById('salvarNota');
const notaInput = document.getElementById('notaInput');
const minhasNotasDiv = document.getElementById('minhasNotas');
const apagarTodasBtn = document.getElementById('apagarTodas');

function carregarNotas() {
  minhasNotasDiv.innerHTML = '';
  const notas = JSON.parse(localStorage.getItem('minhasNotas')) || [];
  notas.forEach((notaObj,index)=>{
    const div = document.createElement('div');
    div.className='notaItem';
    div.draggable = true;
    div.dataset.index=index;

    const textoDiv=document.createElement('div');
    textoDiv.className='notaTexto';
    textoDiv.textContent=notaObj.texto;

    const dataSpan=document.createElement('span');
    dataSpan.className='notaData';
    dataSpan.textContent=notaObj.data;

    const apagarBtn=document.createElement('button');
    apagarBtn.className='apagarBtn';
    apagarBtn.textContent='Apagar';
    apagarBtn.addEventListener('click',()=>{ apagarNota(index); showToast("Nota apagada!"); });

    div.appendChild(textoDiv);
    div.appendChild(dataSpan);
    div.appendChild(apagarBtn);

    minhasNotasDiv.appendChild(div);

    div.addEventListener('dragstart',dragStart);
    div.addEventListener('dragover',dragOver);
    div.addEventListener('drop',drop);

    div.style.animationDelay=`${index*0.1}s`;
  });
}

// ===== Drag & Drop =====
let dragStartIndex;
function dragStart(e){ dragStartIndex = +this.dataset.index; }
function dragOver(e){ e.preventDefault(); }
function drop(e){
  const dragEndIndex = +this.dataset.index;
  let notas = JSON.parse(localStorage.getItem('minhasNotas')) || [];
  [notas[dragStartIndex], notas[dragEndIndex]] = [notas[dragEndIndex], notas[dragStartIndex]];
  localStorage.setItem('minhasNotas',JSON.stringify(notas));
  carregarNotas();
}

salvarBtn.addEventListener('click',()=>{
  const texto=notaInput.value.trim();
  if(texto==='') return;
  let notas=JSON.parse(localStorage.getItem('minhasNotas'))||[];
  const data=new Date().toLocaleString();
  notas.push({texto,data});
  localStorage.setItem('minhasNotas',JSON.stringify(notas));
  notaInput.value='';
  carregarNotas();
  showToast("Nota salva!");
});

apagarTodasBtn.addEventListener('click',()=>{
  if(confirm("Deseja realmente apagar todas as notas?")){
    localStorage.removeItem('minhasNotas');
    carregarNotas();
    showToast("Todas as notas apagadas



