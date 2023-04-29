export const request = {
  post: async <Body, Response>(url: string, body: Body): Promise<Response> => {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return (await response.json()) as Promise<Response>
  },
}
