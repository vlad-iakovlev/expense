import { URL } from 'url'

export const request = {
  getFullUrl: (url: string) => {
    const fullUrl = new URL(url, process.env.NEXTAUTH_URL)
    return fullUrl.toString()
  },

  get: async <Response>(url: string): Promise<Response> => {
    const response = await fetch(request.getFullUrl(url))
    console.log(response)
    return response.json()
  },

  post: async <Body, Response>(url: string, body: Body): Promise<Response> => {
    const response = await fetch(request.getFullUrl(url), {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return response.json()
  },
}
