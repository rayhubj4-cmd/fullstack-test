import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'
import path from 'path'

export default class MetricsController {
  public async index({ params, response }: HttpContextContract) {
    const file = path.join(__dirname, '..', '..', '..', 'data', 'metrics.json')
    if (!fs.existsSync(file)) {
      return response.status(500).json({ error: 'metrics.json missing' })
    }
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    if (data.clusterId !== params.id) return response.status(404).json({ error: 'Cluster not found' })
    return data
  }
}