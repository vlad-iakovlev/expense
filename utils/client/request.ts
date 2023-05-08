export const request = {
  post: async <Body, Response>(url: string, body: Body): Promise<Response> => {
    const response = await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.status >= 400) {
      throw new Error(await response.text())
    }

    return (await response.json()) as Response
  },

  put: async <Body, Response>(url: string, body: Body): Promise<Response> => {
    const response = await fetch(url, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.status >= 400) {
      throw new Error(await response.text())
    }

    return (await response.json()) as Response
  },
}
