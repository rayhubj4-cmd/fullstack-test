import 'reflect-metadata'
import { Ignitor } from '@adonisjs/core/build/src/Ignitor'

new Ignitor(__dirname).httpServer().start().catch(console.error)