import { fetchClient } from ".";

export async function getMovementsByUserId(id:number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/user/movements/${id}`;
  const response = await fetchClient(url);
  if (response.status !== 200) return 0;
  return response.json();
}