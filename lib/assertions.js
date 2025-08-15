/**
 * Platform-agnostic assertion utilities to replace node:assert
 */

export function assert (condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed')
  }
}

export function equal (actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, but got ${actual}`)
  }
}

export function strictEqual (actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, but got ${actual}`)
  }
}

export function deepEqual (actual, expected, message) {
  if (!isDeepEqual(actual, expected)) {
    throw new Error(
      message ||
                `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(
                    actual
                )}`
    )
  }
}

export function notEqual (actual, expected, message) {
  if (actual === expected) {
    throw new Error(
      message || `Expected not ${expected}, but got ${actual}`
    )
  }
}

export function ok (value, message) {
  if (!value) {
    throw new Error(message || `Expected truthy value, but got ${value}`)
  }
}

// Simple deep equality check
function isDeepEqual (a, b) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (typeof a !== typeof b) return false

  if (typeof a === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false

    if (Array.isArray(a)) {
      if (a.length !== b.length) return false
      for (let i = 0; i < a.length; i++) {
        if (!isDeepEqual(a[i], b[i])) return false
      }
      return true
    }

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false

    for (const key of keysA) {
      if (!keysB.includes(key)) return false
      if (!isDeepEqual(a[key], b[key])) return false
    }
    return true
  }

  return false
}
