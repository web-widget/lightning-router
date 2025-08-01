/* eslint no-extend-native: off */

import { test } from 'node:test'

// Something could extend the Array prototype
Array.prototype.test = null
test('for-in-loop', (t) => {
  t.assert.doesNotThrow(() => {
    import('../index.js')
  })
})
