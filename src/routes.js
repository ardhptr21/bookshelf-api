const { addBookHandler } = require('./handlers')

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
    handler: (request, h) => {}
  },
  {
    // menampilkan detail buku
    method: 'GET',
    path: '/books/{bookId}',
    handler: (request, h) => {}
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
