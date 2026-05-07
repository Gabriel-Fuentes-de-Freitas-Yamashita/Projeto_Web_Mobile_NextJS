import { produtos } from "./produtos";

export const categorias = produtos.reduce((acc, produto) => {
    if (!acc.includes(produto.categoria)) {
        acc.push(produto.categoria);
    }
    return acc;
}, ["Todos"]);