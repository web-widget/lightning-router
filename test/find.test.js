import { test } from 'node:test'
import FindMyWay from '../index.js'

test('find calls can pass no constraints', (t) => {
  t.plan(3)
  const findMyWay = FindMyWay()

  findMyWay.on('GET', '/a', () => {})
  findMyWay.on('GET', '/a/b', () => {})

  t.assert.ok(findMyWay.find('GET', '/a'))
  t.assert.ok(findMyWay.find('GET', '/a/b'))
  t.assert.ok(!findMyWay.find('GET', '/a/b/c'))
})
