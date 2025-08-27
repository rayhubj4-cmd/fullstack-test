import Route from '@ioc:Adonis/Core/Route'

console.log('✅ routes.ts loaded')

Route.get('/api/health', async () => ({ status: 'ok' }))

Route.get('/api/clusters/:id/metrics', 'MetricsController.index')
Route.get('/api/clusters/:id/snapshot-policy', 'SnapshotPoliciesController.show')
Route.put('/api/clusters/:id/snapshot-policy', 'SnapshotPoliciesController.update')
Route.post('/test-body', async ({ request }) => {
  return {
    raw: request.raw(),
    body: request.body(),
    all: request.all()
  }
})