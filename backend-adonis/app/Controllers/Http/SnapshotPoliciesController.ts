import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'
import path from 'path'
import Application from '@ioc:Adonis/Core/Application'

export default class SnapshotPoliciesController {
  private filePath() {
    return Application.makePath('data', 'snapshot_policy.json')
  }

  public async show({ params, response }: HttpContextContract) {
    const file = this.filePath()
    if (!fs.existsSync(file)) return response.status(500).json({ error: 'snapshot_policy.json missing' })
    const policy = JSON.parse(fs.readFileSync(file, 'utf-8'))
    if (policy.clusterId !== params.id) return response.status(404).json({ error: 'Cluster not found' })
    return policy
  }

  public async update({ params, request, response }: HttpContextContract) {
    const file = this.filePath()
    if (!fs.existsSync(file)) return response.status(500).json({ error: 'snapshot_policy.json missing' })
    const current = JSON.parse(fs.readFileSync(file, 'utf-8'))
    if (current.clusterId !== params.id) return response.status(404).json({ error: 'Cluster not found' })

    const body = request.only(['policyName','directory','timezone','time','days','deleteAfterDays','locked','enabled'])
    const updated = { ...current, ...body }
    // coerce types
    if (updated.deleteAfterDays === null || updated.deleteAfterDays === undefined) updated.deleteAfterDays = 0
    updated.deleteAfterDays = Number(updated.deleteAfterDays)
    if (!Array.isArray(updated.days)) updated.days = []
    updated.locked = Boolean(updated.locked)
    updated.enabled = Boolean(updated.enabled)

    fs.writeFileSync(file, JSON.stringify(updated, null, 2))
    return { ok: true, policy: updated }
  }
}