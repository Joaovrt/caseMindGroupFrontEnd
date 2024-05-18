import { cookies } from "next/headers";

export const fetchClient = async (
  input: string | URL | Request,
  init?: RequestInit | undefined
): Promise<Response> => {
  const access_token = cookies().get("access_token");

  const response = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      ...(access_token && { Authorization: `Bearer ${access_token.value}` }),
    },
  });
  return response;
};