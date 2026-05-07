import styles from './cardMercado.module.css';

const CardMercado = ({nome, endereco, imagem}) => {
    return (
        <article className={styles.mercado}>
          <img src={imagem} alt={nome} />
          <p>{nome}</p>
          <p>{endereco}</p>
        </article>
    );
}

export default CardMercado;