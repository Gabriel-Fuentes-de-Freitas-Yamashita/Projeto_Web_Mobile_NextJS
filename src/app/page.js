"use client";

import { useEffect, useState } from 'react';
// 1. Remova o import do produtos.js
// import { produtos } from "../data/produtos"; 
import { mercados } from "../data/mercados";
import { categorias } from "../data/categorias";
import Link from 'next/link';
import CardProduto from "./components/cardProduto/CardProduto";
import CardMercado from "./components/cardMercado/CardMercado";
import styles from './page.module.css';

export default function Home() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  
  // 2. Adicione os estados para os produtos e para o carregamento
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // 3. Atualize a função para lidar com erros e com o status de carregamento
  async function carregarProdutos() {
    try {
      const res = await fetch("/api/produtos");
      const data = await res.json();
      setProdutos(data);
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  // 4. Retorne uma mensagem enquanto a API não responde
  if (carregando) return <p>Carregando página inicial...</p>;

  // A partir daqui a lógica continua a mesma, mas agora "produtos" vem da API!
  // Verificar cada produto e preço de cada oferta para mostrar menor preço na página "Home"
  const produtosComPreco = produtos.map((p) => {
    // Adicionado uma verificação de segurança caso o produto não tenha ofertas
    if (!p.ofertas || p.ofertas.length === 0) return { ...p, preco: 0 };

    const melhorOferta = p.ofertas.reduce((menor, atual) => {
      return atual.preco < menor.preco ? atual : menor;
    }, p.ofertas[0]);
    
    return {
      ...p,
      preco: melhorOferta.preco
    };
  });

  const produtosFiltrados = categoriaAtiva === "Todos" 
    ? produtosComPreco 
    : produtosComPreco.filter(p => p.categoria === categoriaAtiva);

  return (
    <>
      <form id="Pesquisa-Mobile" className="pesquisa-mobile">
          <i className="fa fa-search icon"></i>
          <input type="text" placeholder="Pesquisar..."/>
      </form>
      <main className="conteudo">
        <article className={styles.titulo}>Produtos Mais Populares</article>
        <section className={styles['categorias-desktop']}>
            <ul id="categorias-filtros">
                { categorias.map(categoria => (
                  <li key={categoria} onClick={() => setCategoriaAtiva(categoria)} className={categoriaAtiva === categoria ? styles['filtro-ativo'] : ""}> {categoria} </li>
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
            { produtosFiltrados.length === 0 ? (
                <p>Nenhum produto encontrado nesta categoria.</p>
            ) : ( 
                produtosFiltrados.map(produto => ( 
                    <CardProduto id={produto.id} nome={produto.nome} preco={produto.preco} imagem={produto.imagem} key={produto.id}/>
                ))
            )}
        </section>
        <article className={styles.titulo}>Mercados</article>
        <section className={styles.mercados}>
            { mercados.length === 0 ? (
                <p>Nenhum mercado encontrado.</p>
            ) : ( 
                mercados.map(mercado => (
                <Link href={`/mercado/${mercado.nome}`} key={mercado.endereco}>
                  <CardMercado nome={mercado.nome} endereco={mercado.endereco} imagem={mercado.imagem}/>
                </Link>
              ))
            )}
        </section>
      </main>
    </>
  );
}