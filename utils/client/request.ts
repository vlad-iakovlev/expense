export const request = {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
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
}
