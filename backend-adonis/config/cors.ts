import { CorsConfig } from '@ioc:Adonis/Core/Cors'
const corsConfig: CorsConfig = {
  enabled: true,
  origin: true,
  methods: ['GET','HEAD','POST','PUT','PATCH','DELETE'],
  headers: true,
  exposeHeaders: ['Content-Disposition'],
  credentials: true,
  maxAge: 90,
}
export default corsConfig
