import { test, expect } from 'vitest'
import { parseShowQueryStringToNumber, parseRouteParamsToNumber } from '../../utils/helpers'

test('parseShowQueryStringToNumber', () => {
  expect(parseShowQueryStringToNumber('show_123')).toBe(123)
  expect(parseShowQueryStringToNumber('show_abc')).toBeNull()
  expect(parseShowQueryStringToNumber('abc')).toBeNull()
  expect(parseShowQueryStringToNumber('show_')).toBeNull()
  expect(parseShowQueryStringToNumber('show_123_456')).toBe(123)
  expect(parseShowQueryStringToNumber('1')).toBeNull()
  expect(parseShowQueryStringToNumber('[show_1]')).toBe(1)
  expect(parseShowQueryStringToNumber('1_show')).toBeNull()
})

test('parseRouteParamsToNumber', () => {
  expect(parseRouteParamsToNumber('123')).toBe(123)
  expect(parseRouteParamsToNumber(['123', '1'])).toBe(123)
  expect(parseRouteParamsToNumber([])).toBe(null)
  expect(parseRouteParamsToNumber(['a'])).toBe(null)
  expect(parseRouteParamsToNumber('')).toBe(null)
  expect(parseRouteParamsToNumber('0')).toBe(0)
  expect(parseRouteParamsToNumber(undefined)).toBeNull()
  expect(parseRouteParamsToNumber('null')).toBeNull()
  expect(parseRouteParamsToNumber('abc')).toBeNull()
})
