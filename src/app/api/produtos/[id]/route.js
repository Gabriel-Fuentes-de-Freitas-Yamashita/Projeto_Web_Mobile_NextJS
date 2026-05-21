import { produtos } from "@/data/produtos.js";

// GET por ID
export async function GET(request, context) {
  const { id } = await context.params;
  const numericId = Number(id);

  const produto = produtos.find((p) => p.id === numericId);

  if (!produto) {
    return new Response("Produto não encontrado", { status: 404 });
  }

  return Response.json(produto);
}