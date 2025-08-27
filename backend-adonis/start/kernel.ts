// minimal kernel
import '../start/routes'
import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
])