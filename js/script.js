let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];  // Recupera o carrinho armazenado ou cria um carrinho vazio
let totalCarrinho = parseFloat(localStorage.getItem('totalCarrinho')) || 0;  // Recupera o total ou define como 0

// Função para salvar o carrinho e o total no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('totalCarrinho', totalCarrinho.toFixed(2));  // Salva o total como string com duas casas decimais
}

// Função para expandir a sacola
function expandirSacola() {
    const sacola = document.getElementById('sacola');
    const qtdCarrinho = document.getElementById('qtd-carrinho');
    
    // Mostrar a sacola e ajustar o total de itens no botão
    sacola.style.display = 'block';
    qtdCarrinho.textContent = calcularTotalItens();  // Atualiza o número total de itens no carrinho
    exibirItensCarrinho(); // Exibe os itens do carrinho na sacola
}

// Função para minimizar a sacola
function minimizarSacola() {
    const sacola = document.getElementById('sacola');
    sacola.style.display = 'none'; // Esconde a sacola
}

// Função para adicionar item no carrinho
function adicionar(nomeItem, preco) {
    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find(item => item.nome === nomeItem);
    if (itemExistente) {
        itemExistente.quantidade += 1; // Incrementa a quantidade do item existente
    } else {
        // Adiciona o item ao carrinho
        carrinho.push({ nome: nomeItem, preco: preco, quantidade: 1 });
    }
    totalCarrinho += preco; // Atualiza o total do carrinho

    // Exibe o alerta com o nome do produto e o preço
    alert(`Produto Adicionado: ${nomeItem}\nPreço: R$ ${preco.toFixed(2)}`);

    // Atualiza a quantidade total de itens no botão de carrinho
    const qtdCarrinho = document.getElementById('qtd-carrinho');
    qtdCarrinho.textContent = calcularTotalItens();

    // Salva as mudanças no carrinho e no total
    salvarCarrinho();

    // Atualiza a exibição dos itens no carrinho
    exibirItensCarrinho();

    // Redireciona para a sacola
    expandirSacola(); // Adicionada esta linha para redirecionar para a sacola
}

// Função para calcular o total de itens no carrinho
function calcularTotalItens() {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
}

// Função para exibir os itens do carrinho
function exibirItensCarrinho() {
    const itensCarrinhoDiv = document.getElementById('itens-carrinho');
    itensCarrinhoDiv.innerHTML = '';  // Limpa a lista de itens da sacola

    if (carrinho.length === 0) {
        itensCarrinhoDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        // Cria a tabela
        const tabela = document.createElement('table');
        tabela.innerHTML = `
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Qtd.P</th>
                    <th>Valor</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        const tbody = tabela.querySelector('tbody');

        // Adiciona os itens do carrinho na tabela
        carrinho.forEach((item, index) => {
            const linha = document.createElement('tr');
            const valorTotalItem = item.preco * item.quantidade;
            linha.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>${valorTotalItem.toFixed(2)}</td>
                <td><button onclick="removerItem(${index})"><i class="fas fa-trash"></i></button></td>
            `;
            tbody.appendChild(linha);
        });

        itensCarrinhoDiv.appendChild(tabela);
    }

    // Atualiza o total
    const totalCarrinhoDiv = document.getElementById('total-carrinho');
    totalCarrinhoDiv.innerHTML = `<p>Total: R$ ${totalCarrinho.toFixed(2)}</p>`;
}

// Função para remover item do carrinho
function removerItem(index) {
    // Remove o item do carrinho
    const itemRemovido = carrinho.splice(index, 1)[0]; 
    totalCarrinho -= itemRemovido.preco * itemRemovido.quantidade;  // Atualiza o total

    // Garante que o total não seja negativo
    if (totalCarrinho < 0) {
        totalCarrinho = 0;
    }

    // Atualiza a quantidade total de itens no botão de carrinho
    const qtdCarrinho = document.getElementById('qtd-carrinho');
    qtdCarrinho.textContent = calcularTotalItens();

    // Salva as mudanças no carrinho e no total
    salvarCarrinho();

    // Atualiza a exibição dos itens do carrinho
    exibirItensCarrinho();
}

// Função para finalizar a compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('O carrinho está vazio. Adicione itens para finalizar a compra.');
        return;
    }

    // Aqui você pode redirecionar o usuário para um formulário ou página de pagamento.
    alert('Compra Finalizada! Redirecionando para o formulário de pagamento...');
    
    // Exemplo de redirecionamento para um formulário de pagamento
    window.location.href = 'formulario-pagamento.html';  // Modifique para o seu link de pagamento real
}

// Função para atualizar a quantidade de itens no carrinho
function atualizarQtdCarrinho() {
    const qtdCarrinho = document.getElementById('qtd-carrinho');
    qtdCarrinho.textContent = calcularTotalItens();  // Atualiza a quantidade de itens no carrinho
}

// Função para definir a página atual como ativa na navegação
function definirPaginaAtiva() {
    const linksNav = document.querySelectorAll('.link-nav');
    const paginaAtual = window.location.pathname.split('/').pop();

    linksNav.forEach(link => {
        if (link.getAttribute('href') === paginaAtual) {
            link.classList.add('active');
        }
    });
}

// Quando a página for carregada, exibir os itens do carrinho
window.onload = function() {
    exibirItensCarrinho();
    atualizarQtdCarrinho();  // Atualiza a quantidade de itens no carrinho logo ao carregar a página
    definirPaginaAtiva();  // Define a página atual como ativa na navegação
};