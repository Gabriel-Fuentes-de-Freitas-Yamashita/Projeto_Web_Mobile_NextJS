"use client";

// 1. Removi o import direto do produtos.js
import { mercados } from "../../../data/mercados";
import { categorias } from "../../../data/categorias";
import { useParams } from 'next/navigation';
// 2. Adicionei o useEffect
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import CardProduto from "../../components/cardProduto/CardProduto";

export default function PaginaMercado() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  
  // 3. Criei estados para guardar os produtos da API e o status de carregamento
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const params = useParams();
  const nomeMercado = params.nome;

  // 4. Usei o useEffect para chamar a sua API quando a página abre
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch('/api/produtos');
        const dados = await resposta.json();
        setProdutos(dados); // Salva os dados no estado
      } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
      } finally {
        setCarregando(false); // Avisa que terminou de carregar
      }
    }

    carregarProdutos();
  }, []);

  const mercado = mercados.find(
    m => m.nome.toLowerCase() === nomeMercado.toLowerCase()
  );

  // 5. Mostra um aviso enquanto a API não responde
  if (carregando) return <p>Carregando produtos...</p>;

  if (!mercado) return <p>Mercado não encontrado</p>;

  // A partir daqui, a sua lógica continua a mesma, mas agora usa a lista da API!
  const produtosNesteMercado = produtos
    .map(produto => {
      const oferta = produto.ofertas.find(
        o => o.loja === mercado.nome
      );

      if (!oferta) return null;

      return {
        ...produto,
        preco: oferta.preco
      };
    })
    .filter(Boolean);

  return (
    <main className="conteudo">
      <section className={styles['pagina-detalhes']}>

        <button className={styles.voltar}>
          <Link href={`/`} className={styles['link-home']}> Home </Link> &gt; {mercado.nome}
        </button>

        <section className={styles['pagina-mercado']}>

          <section className={styles['info-mercado']}>
            <div className={styles['imagem-mercado']}>
              <img className={styles['pagina-mercado-imagem']} src={mercado.imagem} alt={mercado.nome}  />
            </div>
            <h1>{mercado.nome}</h1>
            <p>{mercado.endereco}</p>
          </section>        

          <section className={styles['produtos-mercado']}>

            <article className={styles.titulo}>
              Produtos Mais Populares
            </article>
            <section className={styles['categorias-desktop']}>
              <ul id="categorias-filtros">
                { categorias.map(categoria => (
                  <li key={categoria} onClick={() => setCategoriaAtiva(categoria)} className={categoriaAtiva == categoria ? styles['filtro-ativo'] : ""}> {categoria} </li>
                ))}
              </ul>
            </section>
            <section className={styles['categorias-mobile']}>
              <select id="filtros-mobile" value={categoriaAtiva} onChange={(e) => setCategoriaAtiva(e.target.value)}>
                  { categorias.map(categoria => (
                    <option key={categoria} value={categoria}>{categoria}</option>
                  ))}
              </select>
          </section>
            <section className={styles.produtos}>

              {produtosNesteMercado.length === 0 ? (
                <p>Nenhum produto encontrado neste mercado</p>
              ) : (
                produtosNesteMercado.map(produto => (
                  <CardProduto id={produto.id} nome={produto.nome} preco={produto.preco} imagem={produto.imagem} key={produto.id}/>
                ))
              )}

            </section>

          </section>
        </section>
      </section>
    </main>
  );

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
  </>;
}
}