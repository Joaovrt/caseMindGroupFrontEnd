import { fetchClient } from ".";

export async function getProducts() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
  const response = await fetchClient(url);
  if (response.status == 401) return 0;
  return response.json();
}