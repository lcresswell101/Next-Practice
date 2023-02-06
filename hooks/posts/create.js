export default async function usePostCreate(create, title, content) {
  if (create) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })

    if (!response.ok) {
      const { message } = await response.json();

      throw new Error(message);
    }

    return response.json();
  }
}