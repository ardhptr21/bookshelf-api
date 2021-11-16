const { nanoid } = require('nanoid')
const books = require('./books')

/**
 * Add new book handler function
 *
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
 */
module.exports.addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const id = nanoid()
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400)
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400)
  }

  books.push({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readPage === pageCount,
    reading,
    insertedAt,
    updatedAt
  })

  const isSuccess = !!books.find(book => book.id === id)

  if (!isSuccess) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon coba lagi'
    }).code(400)
  }

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id
    }
  }).code(201)
}

/**
 * Get all books handler function
 *
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
 */
module.exports.getBooksHandler = (request, h) => {
  const newBooks = books.map(book => ({ id: book.id, name: book.name, publisher: book.publisher }))

  return h.response({
    status: 'success',
    data: {
      books: newBooks
    }
  }).code(200)
}

/**
 * Get detail book handler function
 *
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
*/
module.exports.getBookHandler = (request, h) => {
  const { bookId } = request.params
  const book = books.find(book => book.id === bookId)

  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    }).code(404)
  }

  return h.response({
    status: 'success',
    data: {
      book
    }
  }).code(200)
}

/**
 * Edit and update book data handler function
 *
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
*/
module.exports.updateBookHandler = (request, h) => {
  const { bookId } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const index = books.findIndex(book => book.id === bookId)

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    }).code(404)
  }

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    }).code(400)
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400)
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readPage === pageCount,
    reading,
    updatedAt: new Date().toISOString()
  }

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  }).code(200)
}

/**
 * Edit and update book data handler function
 *
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
*/
module.exports.deleteBookHandler = (request, h) => {
  const { bookId } = request.params
  const index = books.findIndex(book => book.id === bookId)

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    }).code(404)
  }

  books.splice(index, 1)

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus'
  }).code(200)
}
