import { fetchClient } from ".";

export async function getUserById(id:number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`;
  const response = await fetchClient(url);
  if (response.status == 401) return 0;
  return response.json();
}