import { fetchClient } from ".";

export async function getProductById(id:number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`;
  const response = await fetchClient(url);
  if (response.status == 401) return 0;
  return response.json();
}