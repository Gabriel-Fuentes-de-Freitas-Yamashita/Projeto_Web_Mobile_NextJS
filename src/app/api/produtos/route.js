import { produtos } from "@/data/produtos.js";

// GET
export async function GET() {
  return Response.json(produtos);
}
