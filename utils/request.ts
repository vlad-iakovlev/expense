import queryString from 'query-string'

export const request = {
  withQuery: <Query extends Record<string, unknown>>(
    base: string,
    queryParams: Query
  ) => {
    const query = queryString.stringify(queryParams)
    if (query) return `${base}?${query}`
    return base
  },

  get: async <Response>(url: string): Promise<Response> => {
    const response = await fetch(url)
    return await response.json()
  },

  post: async <Body, Response>(url: string, body: Body): Promise<Response> => {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return await response.json()
  },

  put: async <Body, Response>(url: string, body: Body): Promise<Response> => {
    const response = await fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return await response.json()
  },
}
