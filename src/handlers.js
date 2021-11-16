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
