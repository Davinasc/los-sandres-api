module.exports = function ({ pagination }) {
  const { page, perPage, total } = pagination
  const nextPage = page + 1
  const prevPage = page - 1
  const newPagination = { ...pagination, next: null, prev: null }

  if (page > total) return newPagination

  if (nextPage < total) newPagination.next = `?page=${nextPage}&perPage=${perPage}`
  if (prevPage > 0) newPagination.prev = `?page=${prevPage}&perPage=${perPage}`

  return newPagination
}
