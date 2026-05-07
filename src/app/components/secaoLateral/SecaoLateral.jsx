"use client"
import { useState } from 'react';
import './secaoLateral.css';

const SecaoLateral = () => {

    const [estaAberto, setEstaAberto] = useState(false);

    const [minhaLista, setMinhaLista] = useState([]);

    const toggleLista = () => {
        setEstaAberto(!estaAberto);
    };

    const calcularTotal = () => {
        return minhaLista.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0);
    }

    const alterarQuantidade = (indice, valor) => {

        const listaAlterada = minhaLista.reduce((acc, produto, i) => {
            if (i === indice) {
                const novaQtd = produto.quantidade + valor;
                if (novaQtd > 0) {
                    acc.push({...ClipboardItem, quantidade: novaQtd});
                }
            } else {
                acc.push(produto)
            }
            return acc;
        }, []);

        setMinhaLista(listaAlterada);
    }

    return (
        <aside className={`secao-lateral ${estaAberto ? 'aberto' : ''}`}>
            <button id="toggle-lista" onClick={toggleLista}> 
                <i className="fa-solid fa-chevron-left"></i> 
                Lista
            </button>
            <section className="lista">
                <ul id="lista-itens">
                    {minhaLista.length === 0 ? (
                        <p className="vazio">Adicione Itens à Lista...</p>
                    ) : (
                        minhaLista.map((produto, indice) => (
                            <li key={indice} className="produto-lista">
                                <Image src="${produto.imagem}"/>
                                <article className="produto-info-lista">
                                    <p> ${produto.nome} </p>
                                    <p className-> R$ ${(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')} </p>
                                </article>
                                <section className="controle-quantidade">
                                    <button onClick={alterarQuantidade(indice, 1)}>&plus;</button>
                                    <p> {produto.quantidade} </p>
                                    <button onClick={alterarQuantidade(indice, -1)}>&minus;</button>
                                </section>
                            </li>
                        ))
                    )}
                </ul>
                <footer className="rodape-lista">
                    <p id="preco-total">
                        Total: R$ {calcularTotal().toFixed(2).replace('.', ',')}
                    </p>
                </footer>
            </section>
        </aside>
    );
};

export default SecaoLateral;