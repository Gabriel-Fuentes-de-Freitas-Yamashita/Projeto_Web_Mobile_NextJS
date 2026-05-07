import Link from 'next/link';
import styles from './cardProduto.module.css';

const CardProduto = ({id, nome, preco, imagem}) => {

    return (
        <article className={styles.produto}>
            <Link href={`/produto/${id}`}>
                <img src={imagem}/>
            </Link>
            <section className={styles['info-produto']}>
                <p> {nome} </p>
                <p className={styles.preco}> R$ {preco.toFixed(2).replace('.', ',')} </p>
            </section>
            <button className={styles['adicionar-home']} 
                data-nome={nome}
                data-preco={preco} 
                data-imagem="${imagem}">+
            </button>
        </article>
    );
}

export default CardProduto;