import { get, memoize } from '../object'

const button = {
  val1: 'value-1',
  val2: 'value-2'
}

const theme = {
  components: {
    button
  }
}

test('function get should return the desired value from an object', () => {
  expect(get(theme, 'components.button.val')).toBeNull()
  expect(get(theme, 'components.button.val', 'fallback')).toStrictEqual('fallback')
  expect(get(theme, 'components.button.val1')).toStrictEqual('value-1')
  expect(get(theme, 'components.button.val2')).toStrictEqual('value-2')
  expect(get(theme, 'components.button')).toStrictEqual(button)
})

test('memoization should work properly', () => {
  const mockedGet = jest.fn(() => true)
  const memoizedMockedGet = memoize(mockedGet)
  expect(memoizedMockedGet(theme, 'path')).toStrictEqual(true)
  expect(memoizedMockedGet(theme, 'path')).toStrictEqual(true)
  expect(memoizedMockedGet(theme, 'path')).toStrictEqual(true)
  expect(mockedGet).toHaveBeenCalledTimes(1)
})
