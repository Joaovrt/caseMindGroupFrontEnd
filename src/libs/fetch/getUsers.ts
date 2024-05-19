import { fetchClient } from ".";

export async function getUsers() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;
  const response = await fetchClient(url);
  if (response.status !== 200) return 0;
  return response.json();
}