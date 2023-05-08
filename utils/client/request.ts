export const request = {
  post: async <Body, Response>(url: string, body: Body): Promise<Response> => {
    return (await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((res) => res.json())) as Promise<Response>
  },

  put: async <Body, Response>(url: string, body: Body): Promise<Response> => {
    return (await fetch(url, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((res) => res.json())) as Promise<Response>
  },
}
