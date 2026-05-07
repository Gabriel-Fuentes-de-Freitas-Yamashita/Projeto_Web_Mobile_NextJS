"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { produtos } from "../../../data/produtos";
import styles from './page.module.css';

export default function Produto() {

    const params = useParams();
    const idProduto = params.id;

    const produto = produtos.find(p => p.id === Number(idProduto));

    return(
        <main className="conteudo">
            <section className={styles['pagina-detalhes']}>
                <button className={styles.voltar}>
                    <Link href={`/`} className={styles['link-home']}> Home </Link> &gt; {produto.nome}
                </button>
                { !produto ? (
                    <p> Produto Não Encontrado </p>
                ) : (
                    <>
                        <h1>{produto.nome}</h1>
                        <section className={styles['pagina-produto']}>
                            <div className={styles['imagem-produto']}>
                                <img src={produto.imagem}/>
                            </div>
                            <section className={styles['lista-mercados']}>
                                { (!produto.ofertas || produto.ofertas.length === 0) ? (
                                    <p>Nenhuma oferta encontrada.</p>
                                ) : (
                                    produto.ofertas.map(oferta => (
                                        <article className={styles['produto-mercado']} key={oferta.endereco}>
                                            <img src={oferta.mercado}/>
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