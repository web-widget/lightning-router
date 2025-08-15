import { test } from 'node:test'
import { parse } from 'fast-querystring'
import FindMyWay from '../index.js'

test('Custom querystring parser', (t) => {
  t.plan(2)

  const findMyWay = FindMyWay({
    querystringParser: function (str) {
      t.assert.equal(str, 'foo=bar&baz=faz')
      return parse(str)
    }
  })
  findMyWay.on('GET', '/', () => {})

  t.assert.deepEqual(
    findMyWay.find('GET', '/?foo=bar&baz=faz').searchParams,
    { foo: 'bar', baz: 'faz' }
  )
})

test('Custom querystring parser should be called also if there is nothing to parse', (t) => {
  t.plan(2)

  const findMyWay = FindMyWay({
    querystringParser: function (str) {
      t.assert.equal(str, '')
      return parse(str)
    }
  })
  findMyWay.on('GET', '/', () => {})

  t.assert.deepEqual(findMyWay.find('GET', '/').searchParams, {})
})

test('Querystring without value', (t) => {
  t.plan(2)

  const findMyWay = FindMyWay({
    querystringParser: function (str) {
      t.assert.equal(str, 'foo')
      return parse(str)
    }
  })
  findMyWay.on('GET', '/', () => {})
  t.assert.deepEqual(findMyWay.find('GET', '/?foo').searchParams, {
    foo: ''
  })
})
