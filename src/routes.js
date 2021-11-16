const { addBookHandler, getBooksHandler, getBookHandler, updateBookHandler, deleteBookHandler } = require('./handlers')

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
    handler: updateBookHandler
  },
  {
    // menghapus data buku
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler
  }
]

module.exports = routes
