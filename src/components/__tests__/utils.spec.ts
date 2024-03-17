import { test, expect } from 'vitest'
import { parseShowQueryStringToNumber, parseRouteParamsToNumber } from '../../utils/helpers'

test.skip('parseShowQueryStringToNumber', () => {
  expect(parseShowQueryStringToNumber('show_123')).toBe(123)
  expect(parseShowQueryStringToNumber('show_abc')).toBeNull()
  expect(parseShowQueryStringToNumber('abc')).toBeNull()
  expect(parseShowQueryStringToNumber('show_')).toBeNull()
  expect(parseShowQueryStringToNumber('show_123_456')).toBe(123)
  expect(parseShowQueryStringToNumber('1')).toBeNull()
  expect(parseShowQueryStringToNumber('[show_1]')).toBe(1)
  expect(parseShowQueryStringToNumber('1_show')).toBeNull()
})

test.skip('parseRouteParamsToNumber', () => {
  expect(parseRouteParamsToNumber('123')).toBe(123)
  expect(parseRouteParamsToNumber(['123'])).toBe(123)
  expect(parseRouteParamsToNumber(undefined)).toBeNull()
  expect(parseRouteParamsToNumber('null')).toBeNull()
  expect(parseRouteParamsToNumber('abc')).toBeNull()
})
