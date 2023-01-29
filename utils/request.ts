export const request = {
  get: async <Response>(url: string): Promise<Response> => {
    const response = await fetch(url)
    console.log(response)
    return response.json()
  },

  post: async <Body, Response>(url: string, body: Body): Promise<Response> => {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return response.json()
  },

  put: async <Body, Response>(url: string, body: Body): Promise<Response> => {
    const response = await fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return response.json()
  },
}