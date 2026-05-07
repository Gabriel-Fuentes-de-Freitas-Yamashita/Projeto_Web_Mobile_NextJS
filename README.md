# Projeto_Web_Mobile

## Integrantes:

Gabriel Fuentes - 10408876  
Guilherme Florio - 10409698  
Pedro Toma - 10390171  

## Processo de Ideação
Consideramos a ideia de rastreabilidade de preços, ficamos em dúvida entre 2 nichos: produtos de mercado e produtos eletrônicos.
A ideia é que o usuário consiga comparar preços e saber o melhor local físico ou virtual onde ele possa comprar.
Essa decisão foi baseada em se tratar de um nicho mais inclusivo, que atende a um público amplo e diverso, independentemente do nível de familiaridade com tecnologia. Além disso, produtos de mercado fazem parte da rotina frequente dos consumidores, o que aumenta a recorrência de uso da solução. Por fim, foi identificada uma necessidade mais evidente nesse contexto, especialmente diante da variação constante de preços em supermercados e do impacto direto no orçamento das famílias.
Dessa forma, a escolha por esse nicho se mostra mais alinhada com a proposta de gerar valor prático e acessível para um maior número de usuários.

## Caráter Extensionista
A proposta é poder facilitar a consulta de produtos, para que as pessoas possam economizar nas suas compras e tomar uma decisão mais eficiente com relação ao local, podendo escolher um lugar mais próximo a sua casa, sem perder um desconto ou valor.

## Imagens dos Wireframes

### Desktop
#### Página Incial (Seção de "Ofertas Imperdíveis" e seção de "Mercados")
<img width="1098" height="623" alt="image" src="https://github.com/user-attachments/assets/5f123cf2-e60b-40ad-a919-387dde8aa114" />

#### Página de Produto (Lista de mercados onde o produto está disponível)
<img width="1092" height="620" alt="image" src="https://github.com/user-attachments/assets/15a38bd7-596a-4111-aff0-ff046c8c2066" />

#### Página de Mercado (Lista de produtos disponíveis no mercado)
<img width="1091" height="620" alt="image" src="https://github.com/user-attachments/assets/0b4da784-1753-496b-b046-6f9f727b0bd7" />

#### Seção Lateral (Lista de produtos adicionados pelo usuário)
<img width="1091" height="618" alt="image" src="https://github.com/user-attachments/assets/76560e5b-ab87-4fd0-834a-efe0c51db010" />

### Mobile

#### Página Incial
<img width="268" height="567" alt="image" src="https://github.com/user-attachments/assets/65e3a2eb-69c1-4f31-b208-881a134a21ab" />

#### Página de Produto
<img width="292" height="624" alt="image" src="https://github.com/user-attachments/assets/7bde1bb1-c5db-4f8b-8b2f-51d632e11cf1" />

#### Página de Mercado
<img width="289" height="624" alt="image" src="https://github.com/user-attachments/assets/11f9b883-72c1-4ad5-ad60-19eb93b4321e" />

#### Modal (Posição da lista modificada para versão mobile)
<img width="294" height="625" alt="image" src="https://github.com/user-attachments/assets/9ba285e7-0fb7-42fc-af24-a66e4952db5b" />

## Vantagem da migração para ReactJS
As vantagens da utilização de componentes ReactJS incluem a facilidade de troca de rotas para mudança de páginas, principalmente com relação a necessidade de fazer a troca de dados na mesma tela, além da facilidade de organização e manipulação dos dados.

## Migração para NextJS

As configuração de CSS foram colocados no arquivo global.css para facilitar o início da migração.

### Estrutura das pastas e arquivos
<img width="295" height="440" alt="image" src="https://github.com/user-attachments/assets/76560dd6-80ba-49bc-b641-ff595b01d839" />  

Foi criado a pasta de componentes para armazenar o header e seção lateral que estão presentes em todas as abas, inseridos no arquivo layout.js.

~~~js
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header/>
        {children}
        <SecaoLateral/>
      </body>
    </html>
  );
}
~~~

A página home está na raiz do projeto "page.js" e as páginas de produto e de mercado estão criadas como novas abas que recebem como parâmetro as informações necessárias para carregar o conteúdo desejado (mercado -> nome, produto -> id)

### Página Home
<img width="1911" height="900" alt="image" src="https://github.com/user-attachments/assets/2225915b-f439-4a1d-a32e-47f9b9db66f8" />

~~~js
export default function Home()
~~~

Usar features do browser no lado do cliente e importar useState e Link
~~~js
"use client"
import { useState } from 'react';
import Link from 'next/link';
~~~

Alterar o filtro resulta na renderização das estruturas necessárias da página (lista de produtos mais populares)
~~~js
const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
~~~

Função de gerarCategorias altera a variável do useState (categoriaAtiva) através de setCategoriaAtiva
~~~js
// Gerar categorias dos produtos
  function gerarCategorias() {
      return <>
          <section className="categorias-desktop">
              <ul id="categorias-filtros">
                  <li onClick={() => setCategoriaAtiva("Todos")} className={categoriaAtiva === "Todos" ? "filtro-ativo" : ""}> Todos </li>
                  <li onClick={() => setCategoriaAtiva("Higiene e Perfumaria")} className={categoriaAtiva === "Higiene e Perfumaria" ? "filtro-ativo" : ""}> Higiene e Perfumaria </li>
                  <li onClick={() => setCategoriaAtiva("Salgadinhos e Snacks")} className={categoriaAtiva === "Salgadinhos e Snacks" ? "filtro-ativo" : ""}> Salgadinhos e Snacks </li>
                  <li onClick={() => setCategoriaAtiva("Padaria e Matinais")} className={categoriaAtiva === "Padaria e Matinais" ? "filtro-ativo" : ""}> Padaria e Matinais </li>
                  <li onClick={() => setCategoriaAtiva("Bebidas")} className={categoriaAtiva === "Bebidas" ? "filtro-ativo" : ""}> Bebidas </li>
                  <li onClick={() => setCategoriaAtiva("Energéticos e Isotônicos")} className={categoriaAtiva === "Energéticos e Isotônicos" ? "filtro-ativo" : ""}> Energéticos e Isotônicos </li>
                  <li onClick={() => setCategoriaAtiva("Doces")} className={categoriaAtiva === "Doces" ? "filtro-ativo" : ""}> Doces </li>
              </ul>
          </section>
          <section className="categorias-mobile">
              <select id="filtros-mobile" value={categoriaAtiva} onChange={(e) => setCategoriaAtiva(e.target.value)}>
                  <option value="Todos">Todos</option>
                  <option value="Higiene e Perfumaria">Higiene e Perfumaria</option>
                  <option value="Salgadinhos e Snacks">Salgadinhos e Snacks</option>
                  <option value="Padaria e Matinais">Padaria e Matinais</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Energéticos e Isotônicos">Energéticos e Isotônicos</option>
                  <option value="Doces">Doces</option>
              </select>
          </section>
      </>
    ;
  }
~~~

As outras funções foram apenas migradas e ajustadas para nomeclatura correta, "className" e fechamento de tags como "img"

Retorno da página Home
~~~js
return (
    <>
      <form id="Pesquisa-Mobile" className="pesquisa-mobile">
          <i className="fa fa-search icon"></i>
          <input type="text" placeholder="Pesquisar..."/>
      </form>
      <main className="conteudo">
        <article className="titulo">Produtos Mais Populares</article>
        {gerarCategorias()} 
        <section className="produtos">
            {gerarCardsProdutos("Todos", produtosFiltrados)} 
        </section>
        <article className="titulo">Mercados</article>
        <section className="mercados">
            {gerarCardsMercados()}
        </section>
      </main>
    </>
  );
~~~

### Página de Produto
<img width="1912" height="902" alt="image" src="https://github.com/user-attachments/assets/ad24a448-4961-4dbe-9a2e-0788200d1d1e" />

~~~js
export default function Produto()
~~~

Usar features do browser "use client" e importar Link, parâmetros via URL e dados de produtos e mercados
~~~js
"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { produtos } from "../../../data/produtos";
import { mercados } from "../../../data/mercados";
~~~

Verifica id da URL e procura por produto com mesmo id
~~~js
const params = useParams();
const idProduto = params.id;

const produto = produtos.find(p => p.id === Number(idProduto));
console.log(produto)
if (!produto) {
  alert("Produto Não Encontrado");
  return;
}
~~~

Retorno da página de produto
~~~js
return(
        <section className="pagina-detalhes">
            <button className="voltar">
                <Link href={`/`} className="link-home"> Home </Link> &gt; {produto.nome}
            </button>
            <h1>{produto.nome}</h1>
            <section className="pagina-produto">
                <div className="imagem-produto">
                    <img src={produto.imagem}/>
                </div>
                <section className="lista-mercados">
                    {gerarMercadosDoProduto(produto.nome)}
                </section>
            </section>
        </section>
    );
~~~

### Página de Mercado
<img width="1918" height="899" alt="image" src="https://github.com/user-attachments/assets/73791a60-e468-47d6-8e7c-91f56e492405" />

~~~js
export default function PaginaMercado()
~~~

Imports semelhantes a página de produto e "use client"
~~~js
"use client";
import { mercados } from "../../../data/mercados";
import { produtos } from "../../../data/produtos";
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
~~~

Criar variável categoriaAtiva para recarregar partes necessárias da página se houver alteração e procura de mercado com mesmo nome recebido via URL
~~~js
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const params = useParams();
  const nomeMercado = params.nome;

  const mercado = mercados.find(
    m => m.nome.toLowerCase() === nomeMercado.toLowerCase()
  );

~~~

Retorno da página de mercado
~~~js
return (
    <section className="pagina-detalhes">

      <button className="voltar">
        <Link href={`/`} className="link-home"> Home </Link> &gt; {mercado.nome}
      </button>

      <section className="pagina-mercado">

        <section className="info-mercado">
          <div className="imagem-mercado">
            <img className="pagina-mercado-imagem" src={mercado.imagem} alt={mercado.nome}  />
          </div>
          <h1>{mercado.nome}</h1>
          <p>{mercado.endereco}</p>
        </section>        

        <section className="produtos-mercado">

          <article className="titulo">
            Produtos Mais Populares
          </article>

          {gerarCategorias?.()}

          <section className="produtos">

            {produtosNesteMercado.length === 0 ? (
              <p>Nenhum produto encontrado neste mercado</p>
            ) : (
              produtosNesteMercado.map(produto => (
                <article key={produto.id} className="produto">

                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                  />

                  <section className="info-produto">
                    <p>{produto.nome}</p>
                    <p className="preco">
                      R$ {produto.precoLocal.toFixed(2).replace(".", ",")}
                    </p>
                  </section>

                  <button className="adicionar-home">
                    +
                  </button>

                </article>
              ))
            )}

          </section>

        </section>
      </section>
    </section>
  );
~~~

Divisão da aplicação em arquivos separados usando componentização (CardProduto e CardMercado) junto com a separação do CSS em arquivos diferentes utilizando "styles"

<img width="373" height="188" alt="image" src="https://github.com/user-attachments/assets/b54e88c9-a958-463d-8cba-18a3a9024f54" />

CardMercado.jsx
~~~js
const gerarCardsMercados = (mercados) => {
  return (
    <>
      {mercados.map((mercado) => (
        <article
          key={mercado.nome}
          className="mercado"
          onClick={() => renderizarPaginaMercado(mercado.nome)}
        >
          <img src={mercado.imagem} alt={mercado.nome} />
          <p>{mercado.nome}</p>
          <p>{mercado.endereco}</p>
        </article>
      ))}
    </>
  );
};

export default gerarCardsMercados;
~~~

CardProduto.jsx 
~~~js
function gerarCardsProdutos(categoriaFiltro = "Todos", listaBase = null) {

    let listaParaFiltrar = (listaBase !== null) ? listaBase : produtos;
    let listaFiltrada = listaParaFiltrar;

    if (categoriaFiltro !== "Todos") {
        listaFiltrada = listaParaFiltrar.filter(p => p.categoria === categoriaFiltro);
    }

    if (listaFiltrada.length === 0) return "<p>Nenhum produto encontrado nesta categoria.</p>";

    return listaFiltrada.map(produto => `
        <article class="produto">
            <img src="${produto.imagem}" onclick="renderizarPaginaProduto(${produto.id})">
            <section class="info-produto">
                <p> ${produto.nome} </p>
                <p class="preco"> R$ ${produto.preco.toFixed(2).replace('.', ',')} </p>
            </section>
            <button class="adicionar-home" 
                data-nome="${produto.nome}" 
                data-preco="${produto.preco}" 
                data-imagem="${produto.imagem}">&plus;
            </button>
        </article>
    `).join('');
};
~~~
