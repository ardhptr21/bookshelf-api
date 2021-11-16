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
      status: 'failed',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400)
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'failed',
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
      status: 'failed',
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
  return h.response({
    status: 'success',
    data: {
      books
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
      status: 'failed',
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

  console.log(name)

  if (index === -1) {
    return h.response({
      status: 'failed',
      message: 'Buku tidak ditemukan'
    }).code(404)
  }

  if (!name) {
    return h.response({
      status: 'failed',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400)
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'failed',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
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
