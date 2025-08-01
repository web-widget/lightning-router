import { test } from 'node:test'
import FindMyWay from '../index.js'

test('Match static url without encoding option', (t) => {
  t.plan(2)

  const findMyWay = FindMyWay()

  const handler = () => {}

  findMyWay.on('GET', '/🍌', handler)

  t.assert.deepEqual(findMyWay.find('GET', '/🍌').handler, handler)
  t.assert.deepEqual(findMyWay.find('GET', '/%F0%9F%8D%8C').handler, handler)
})

test('Match parametric url with encoding option', (t) => {
  t.plan(2)

  const findMyWay = FindMyWay()

  findMyWay.on('GET', '/🍌/:param', () => {})

  t.assert.deepEqual(findMyWay.find('GET', '/🍌/@').params, { param: '@' })
  t.assert.deepEqual(findMyWay.find('GET', '/%F0%9F%8D%8C/@').params, {
    param: '@'
  })
})

test('Match encoded parametric url with encoding option', (t) => {
  t.plan(2)

  const findMyWay = FindMyWay()

  findMyWay.on('GET', '/🍌/:param', () => {})

  t.assert.deepEqual(findMyWay.find('GET', '/🍌/%23').params, { param: '#' })
  t.assert.deepEqual(findMyWay.find('GET', '/%F0%9F%8D%8C/%23').params, {
    param: '#'
  })
})

test('Decode url components', (t) => {
  t.plan(3)

  const findMyWay = FindMyWay()

  findMyWay.on('GET', '/:param1/:param2', () => {})

  t.assert.deepEqual(findMyWay.find('GET', '/foo%23bar/foo%23bar').params, {
    param1: 'foo#bar',
    param2: 'foo#bar'
  })
  t.assert.deepEqual(
    findMyWay.find('GET', '/%F0%9F%8D%8C/%F0%9F%8D%8C').params,
    { param1: '🍌', param2: '🍌' }
  )
  t.assert.deepEqual(
    findMyWay.find('GET', '/%F0%9F%8D%8C/foo%23bar').params,
    { param1: '🍌', param2: 'foo#bar' }
  )
})

test('Decode url components', (t) => {
  t.plan(5)

  const findMyWay = FindMyWay()

  findMyWay.on('GET', '/foo🍌bar/:param1/:param2', () => {})
  findMyWay.on('GET', '/user/:id', () => {})

  t.assert.deepEqual(
    findMyWay.find('GET', '/foo%F0%9F%8D%8Cbar/foo%23bar/foo%23bar').params,
    { param1: 'foo#bar', param2: 'foo#bar' }
  )
  t.assert.deepEqual(findMyWay.find('GET', '/user/maintainer+tomas').params, {
    id: 'maintainer+tomas'
  })
  t.assert.deepEqual(
    findMyWay.find('GET', '/user/maintainer%2Btomas').params,
    { id: 'maintainer+tomas' }
  )
  t.assert.deepEqual(
    findMyWay.find('GET', '/user/maintainer%20tomas').params,
    { id: 'maintainer tomas' }
  )
  t.assert.deepEqual(
    findMyWay.find('GET', '/user/maintainer%252Btomas').params,
    { id: 'maintainer%2Btomas' }
  )
})

test('Decode url components', (t) => {
  t.plan(18)

  const findMyWay = FindMyWay()

  findMyWay.on('GET', '/:param1', () => {})
  t.assert.deepEqual(findMyWay.find('GET', '/foo%23bar').params, {
    param1: 'foo#bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%24bar').params, {
    param1: 'foo$bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%26bar').params, {
    param1: 'foo&bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%2bbar').params, {
    param1: 'foo+bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%2Bbar').params, {
    param1: 'foo+bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%2cbar').params, {
    param1: 'foo,bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%2Cbar').params, {
    param1: 'foo,bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%2fbar').params, {
    param1: 'foo/bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%2Fbar').params, {
    param1: 'foo/bar'
  })

  t.assert.deepEqual(findMyWay.find('GET', '/foo%3abar').params, {
    param1: 'foo:bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%3Abar').params, {
    param1: 'foo:bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%3bbar').params, {
    param1: 'foo;bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%3Bbar').params, {
    param1: 'foo;bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%3dbar').params, {
    param1: 'foo=bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%3Dbar').params, {
    param1: 'foo=bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%3fbar').params, {
    param1: 'foo?bar'
  })
  t.assert.deepEqual(findMyWay.find('GET', '/foo%3Fbar').params, {
    param1: 'foo?bar'
  })

  t.assert.deepEqual(findMyWay.find('GET', '/foo%40bar').params, {
    param1: 'foo@bar'
  })
})
