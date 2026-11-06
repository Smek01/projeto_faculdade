// ===== Meridia Viagens - JavaScript =====
// Usa funções, estruturas condicionais (if/else) e de repetição (for).

document.documentElement.classList.add('js');

// Lista de pacotes (usada no simulador)
const pacotes = [
  { nome: 'Lisboa e Porto', preco: 6490, noites: 7 },
  { nome: 'Paris', preco: 9900, noites: 7 },
  { nome: 'Nova York', preco: 11400, noites: 7 },
  { nome: 'Marrocos', preco: 7350, noites: 8 },
  { nome: 'Kyoto', preco: 15200, noites: 10 },
  { nome: 'Patagônia', preco: 9800, noites: 9 }
];

function formatarReal(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// 1. Botão "voltar ao topo"
const btnTopo = document.getElementById('btnTopo');
window.addEventListener('scroll', function () {
  if (btnTopo) {
    if (window.scrollY > 300) {
      btnTopo.classList.add('mostrar');
    } else {
      btnTopo.classList.remove('mostrar');
    }
  }
});
if (btnTopo) {
  btnTopo.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const topoBtn = document.getElementById('topoBtn');
const topoMenu = document.getElementById('topoMenu');
if (topoBtn) {
  topoBtn.addEventListener('click', function () {
    topoMenu.classList.toggle('aberto');
  });
}

const observador = new IntersectionObserver(function (itens) {
  for (let i = 0; i < itens.length; i++) {
    if (itens[i].isIntersecting) {
      itens[i].target.classList.add('visivel');
      observador.unobserve(itens[i].target);
    }
  }
}, { threshold: 0.15 });
const aparecer = document.querySelectorAll('.aparecer');
for (let i = 0; i < aparecer.length; i++) {
  observador.observe(aparecer[i]);
}

function contar(elemento) {
  const alvo = Number(elemento.dataset.alvo);
  const passo = Math.ceil(alvo / 60);
  let atual = 0;
  const timer = setInterval(function () {
    atual = atual + passo;
    if (atual >= alvo) {
      atual = alvo;
      clearInterval(timer);
    }
    elemento.textContent = atual.toLocaleString('pt-BR');
  }, 25);
}
const contadores = document.querySelectorAll('.contador');
const observadorNumeros = new IntersectionObserver(function (itens) {
  for (let i = 0; i < itens.length; i++) {
    if (itens[i].isIntersecting) {
      contar(itens[i].target);
      observadorNumeros.unobserve(itens[i].target);
    }
  }
}, { threshold: 0.6 });
for (let i = 0; i < contadores.length; i++) {
  observadorNumeros.observe(contadores[i]);
}

const selDestino = document.getElementById('selDestino');
if (selDestino) {
  for (let i = 0; i < pacotes.length; i++) {
    selDestino.innerHTML += '<option value="' + i + '">' + pacotes[i].nome + '</option>';
  }
  document.getElementById('formSimulador').addEventListener('submit', function (e) {
    e.preventDefault();
    const pacote = pacotes[selDestino.value];
    const pessoas = Number(document.getElementById('numPessoas').value);
    const nivel = Number(document.getElementById('selNivel').value);
    const resultado = document.getElementById('resultado');

    if (pessoas < 1 || pessoas > 10 || isNaN(pessoas)) {
      resultado.innerHTML = '<div class="alert alert-warning">Digite de 1 a 10 pessoas.</div>';
      return;
    }
    let total = pacote.preco * pessoas * nivel;
    let aviso = '';
    if (pessoas >= 4) {
      total = total * 0.9;
      aviso = '<br>Desconto de 10% aplicado para grupo.';
    }
    resultado.innerHTML = '<div class="alert alert-success">' +
      '<strong>' + pacote.nome + '</strong> · ' + pacote.noites + ' noites · ' + pessoas + ' pessoa(s)<br>' +
      'Valor total: <strong>' + formatarReal(total) + '</strong>' + aviso + '</div>';
  });
}

if (window.location.hash && typeof bootstrap !== 'undefined') {
  const botaoAba = document.querySelector('[data-bs-target="#r-' + window.location.hash.slice(1) + '"]');
  if (botaoAba) {
    new bootstrap.Tab(botaoAba).show();
  }
}

const formContato = document.getElementById('formContato');
if (formContato) {
  formContato.addEventListener('submit', function (e) {
    e.preventDefault();
    const campos = formContato.querySelectorAll('[required]');
    let valido = true;
    for (let i = 0; i < campos.length; i++) {
      if (campos[i].checkValidity()) {
        campos[i].classList.remove('is-invalid');
        campos[i].classList.add('is-valid');
      } else {
        campos[i].classList.remove('is-valid');
        campos[i].classList.add('is-invalid');
        valido = false;
      }
    }
    const retorno = document.getElementById('retornoForm');
    if (valido) {
      const nome = document.getElementById('nome').value;
      retorno.innerHTML = '<div class="alert alert-success">Obrigado, ' + nome + '! Recebemos sua mensagem.</div>';
      formContato.reset();
      for (let i = 0; i < campos.length; i++) {
        campos[i].classList.remove('is-valid');
      }
    } else {
      retorno.innerHTML = '<div class="alert alert-danger">Confira os campos em vermelho.</div>';
    }
  });
}

const fotos = document.querySelectorAll('.foto');
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  let atual = 0;
  function mostrarFoto(indice) {
    if (indice < 0) { indice = fotos.length - 1; }
    if (indice >= fotos.length) { indice = 0; }
    atual = indice;
    const imagem = fotos[atual].querySelector('.ph, img').cloneNode(true);
    document.getElementById('lbImg').replaceChildren(imagem);
    document.getElementById('lbLegenda').textContent = fotos[atual].dataset.legenda;
  }
  for (let i = 0; i < fotos.length; i++) {
    fotos[i].addEventListener('click', function () {
      mostrarFoto(i);
      lightbox.hidden = false;
    });
  }
  document.getElementById('lbFechar').addEventListener('click', function () { lightbox.hidden = true; });
  document.getElementById('lbAnt').addEventListener('click', function () { mostrarFoto(atual - 1); });
  document.getElementById('lbProx').addEventListener('click', function () { mostrarFoto(atual + 1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) { lightbox.hidden = true; } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { lightbox.hidden = true; } });
}
