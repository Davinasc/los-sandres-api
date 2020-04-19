const Env = use('Env')

module.exports = function ({ pagination }, path) {
  const { page, perPage, lastPage } = pagination
  const url = `${Env.get('APP_URL')}${path}`

  const nextPage = page + 1
  const prevPage = page - 1
  const newPagination = { ...pagination, next: null, prev: null }

  if (page > lastPage) return newPagination

  if (nextPage < lastPage) newPagination.next = `${url}?page=${nextPage}&perPage=${perPage}`
  if (prevPage > 0) newPagination.prev = `${url}?page=${prevPage}&perPage=${perPage}`

  return newPagination
}
