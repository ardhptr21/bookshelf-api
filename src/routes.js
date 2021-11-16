const { addBookHandler, getBooksHandler, getBookHandler } = require('./handlers')

const routes = [
  {
    // menyimpan buku
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  {
    // menampilkan seluruh buku
    method: 'GET',
    path: '/books',
    handler: getBooksHandler
  },
  {
    // menampilkan detail buku
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookHandler
  },
  {
    // mengubah data buku
    method: 'PUT',
    path: '/books/{bookId}',
    handler: (request, h) => {}
  },
  {
    // menghapus data buku
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: (request, h) => {}
  }
]

module.exports = routes
