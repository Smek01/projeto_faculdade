// Filtro de dicas por categoria
const botoesFiltro = document.querySelectorAll('.filtro');
const cardsDicas = document.querySelectorAll('#gradeDicas .card-extra');
const msgVazia = document.getElementById('msgVazia');

botoesFiltro.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const categoria = botao.dataset.filtro;

    // marca o botão clicado como ativo
    botoesFiltro.forEach(function (b) {
      b.classList.remove('ativo');
    });
    botao.classList.add('ativo');

    // mostra só os cards da categoria escolhida
    let visiveis = 0;
    cardsDicas.forEach(function (card) {
      const mostrar = categoria === 'todas' || card.dataset.cat === categoria;
      card.hidden = !mostrar;
      if (mostrar) {
        visiveis++;
      }
    });

    msgVazia.hidden = visiveis > 0;
  });
});
