import { test } from 'node:test'
import FindMyWay from '../index.js'

test("Falling back for node's parametric brother", (t) => {
  t.plan(3)
  const findMyWay = FindMyWay({
    defaultRoute: (req, res) => {
      t.assert.fail('Should not be defaultRoute')
    }
  })

  findMyWay.on('GET', '/:namespace/:type/:id', () => {})
  findMyWay.on('GET', '/:namespace/jobs/:name/run', () => {})

  t.assert.deepEqual(
    findMyWay.find('GET', '/test_namespace/test_type/test_id').params,
    { namespace: 'test_namespace', type: 'test_type', id: 'test_id' }
  )

  t.assert.deepEqual(
    findMyWay.find('GET', '/test_namespace/jobss/test_id').params,
    { namespace: 'test_namespace', type: 'jobss', id: 'test_id' }
  )

  t.assert.deepEqual(
    findMyWay.find('GET', '/test_namespace/jobs/test_id').params,
    { namespace: 'test_namespace', type: 'jobs', id: 'test_id' }
  )
})
