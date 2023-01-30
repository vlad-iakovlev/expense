export const groupSelect = {
  id: true,
  name: true,
  users: {
    select: {
      id: true,
      image: true,
      name: true,
    },
  },
}
