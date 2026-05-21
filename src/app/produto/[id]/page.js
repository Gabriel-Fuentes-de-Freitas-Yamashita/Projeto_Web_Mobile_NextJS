"use client";

// 1. Importamos o useEffect e useState, e removemos o import do arquivo estático
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

export default function Produto() {
  const params = useParams();
  const idProduto = params.id;

  // 2. Criamos os estados para o produto e para o carregamento
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // 3. Buscamos o produto na API usando o ID da URL
  useEffect(() => {
    if (!idProduto) return;

    async function carregarProduto() {
      try {
        // Faz a requisição exatamente na rota por ID que você criou ([id]/route.js)
        const res = await fetch(`/api/produtos/${idProduto}`);
        
        if (res.ok) {
          const data = await res.json();
          setProduto(data);
        } else {
          setProduto(null); // Caso retorne 404
        }
      } catch (erro) {
        console.error("Erro ao buscar o produto:", erro);
        setProduto(null);
      } finally {
        setCarregando(false);
      }
    }

    carregarProduto();
  }, [idProduto]);

  // 4. Enquanto estiver buscando os dados, mostra uma mensagem de loading
  if (carregando) {
    return (
      <main className="conteudo">
        <p>Carregando detalhes do produto...</p>
      </main>
    );
  }

  return (
    <main className="conteudo">
      <section className={styles['pagina-detalhes']}>
        
        {/* 5. Se o produto não for encontrado, exibe a interface de erro amigável */}
        {!produto ? (
          <>
            <button className={styles.voltar}>
              <Link href={`/`} className={styles['link-home']}> Home </Link> &gt; Produto não encontrado
            </button>
            <p> Produto Não Encontrado </p>
          </>
        ) : (
          /* 6. Se o produto existir, exibe os dados da API com segurança */
          <>
            <button className={styles.voltar}>
              <Link href={`/`} className={styles['link-home']}> Home </Link> &gt; {produto.nome}
            </button>
            
            <h1>{produto.nome}</h1>
            
            <section className={styles['pagina-produto']}>
              <div className={styles['imagem-produto']}>
                <img src={produto.imagem} alt={produto.nome} />
              </div>
              
              <section className={styles['lista-mercados']}>
                {(!produto.ofertas || produto.ofertas.length === 0) ? (
                  <p>Nenhuma oferta encontrada.</p>
                ) : (
                  produto.ofertas.map(oferta => (
                    <article className={styles['produto-mercado']} key={oferta.endereco}>
                      <img src={oferta.mercado} alt={oferta.loja} />
                      <div className={styles['produto-conteudo']}>
                        <p> Endereço: {oferta.endereco} </p>
                        <p className={styles['produto-preco']}> 
                          R$ {oferta.preco.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <button className={styles['adicionar-produto']}
                        data-nome={produto.nome} 
                        data-preco={oferta.preco} 
                        data-imagem={produto.imagem}>+
                      </button>
                    </article>
                  ))
                )}
              </section>
            </section>
          </>
        )}
      </section>
    </main>
  );
}