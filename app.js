let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const salvarCarrinho = () => {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

const adicionarCarrinho = (produto) => {
  carrinho.push(produto);
  salvarCarrinho();
  alert('Produto adicionado ao carrinho');
};

fetch('produtos.json')
  .then(res => res.json())
  .then(produtos => {
    const container = document.querySelector('.produtos');
    if (!container) return;

    container.innerHTML = '';
    produtos.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('produto');
      div.innerHTML = `
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco}</p>
        <button>Adicionar</button>
      `;
      div.querySelector('button').addEventListener('click', () => adicionarCarrinho(p));
      container.appendChild(div);
    });
  })
  .catch(() => console.error('Erro ao carregar produtos'));

const lista = document.getElementById('lista-carrinho');
if (lista) {
  lista.innerHTML = carrinho.map(p => `<li>${p.nome} - R$ ${p.preco}</li>`).join('');
  const total = carrinho.reduce((s, p) => s + p.preco, 0);
  document.getElementById('total').textContent = 'Total: R$ ' + total.toFixed(2);
}