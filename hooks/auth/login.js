export default async function useLogin(login, email, password) {
  if (login) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
  {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      const { message } = await response.json();

      throw new Error(message);
    }

    return response.json();
  }
}