/**
 * Platform-agnostic query string parsing utilities
 */

/**
 * Parse a query string into an object
 * @param {string} query The query string to parse (without the leading '?')
 * @returns {Object} Parsed query object
 */
export function parse (query) {
  if (!query || query.length === 0) {
    return {}
  }

  const result = {}
  const pairs = query.split('&')

  for (const pair of pairs) {
    const [key, value] = pair.split('=', 2)
    if (key) {
      const decodedKey = decodeURIComponent(key)
      const decodedValue = value ? decodeURIComponent(value) : ''

      if (result[decodedKey] === undefined) {
        result[decodedKey] = decodedValue
      } else if (Array.isArray(result[decodedKey])) {
        result[decodedKey].push(decodedValue)
      } else {
        result[decodedKey] = [result[decodedKey], decodedValue]
      }
    }
  }

  return result
}

/**
 * Stringify an object into a query string
 * @param {Object} obj The object to stringify
 * @returns {string} Query string (without the leading '?')
 */
export function stringify (obj) {
  const pairs = []

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) {
      continue
    }

    const encodedKey = encodeURIComponent(key)

    if (Array.isArray(value)) {
      for (const item of value) {
        pairs.push(`${encodedKey}=${encodeURIComponent(String(item))}`)
      }
    } else {
      pairs.push(`${encodedKey}=${encodeURIComponent(String(value))}`)
    }
  }

  return pairs.join('&')
}

/**
 * Parse a URL query string
 * @param {string} url The URL to parse
 * @returns {Object} Object with pathname and query properties
 */
export function parseUrl (url) {
  const queryIndex = url.indexOf('?')
  if (queryIndex === -1) {
    return { pathname: url, query: {} }
  }

  const pathname = url.substring(0, queryIndex)
  const query = url.substring(queryIndex + 1)

  return {
    pathname,
    query: parse(query)
  }
}
