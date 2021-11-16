const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  })

  server.route(routes)

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()
