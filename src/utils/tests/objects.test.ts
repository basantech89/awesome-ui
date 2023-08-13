import { deepMerge, get, memoize } from '../object'
import { expectType } from 'ts-expect'
import { DeepRequired } from '../index'

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
  expect(get(theme, 'components.button.val', 'fallback')).toStrictEqual(
    'fallback'
  )
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

describe('deepMerge', function () {
  const obj1 = {
    theme: {
      components: {
        button: {
          default: {
            color: 'primary',
            size: 'sm',
            className: 'theme-1'
          }
        }
      }
    }
  }

  const obj2 = {
    theme: {
      components: {
        button: {
          default: {
            color: 'secondary',
            size: 2,
            shape: 'round'
          }
        },
        spinner: {
          default: {
            color: 'primary',
            speed: 3
          }
        }
      }
    }
  }

  const obj3 = {
    theme: {
      components: {
        button: {
          default: {
            color: null,
            size: undefined,
            speed: 1
          }
        }
      }
    }
  }

  const emptyObj = {}

  type Obj4 = {
    theme?: {
      components?: {
        button?: {
          default?: {
            color?: string
            size?: number
            shape?: string
          }
        }
        spinner?: {
          default?: {
            color?: string
            speed?: number
          }
        }
      }
    }
  }

  const obj4: DeepRequired<Obj4> = {
    theme: {
      components: {
        button: {
          default: {
            color: 'secondary',
            size: 2,
            shape: 'round'
          }
        },
        spinner: {
          default: {
            color: 'primary',
            speed: 3
          }
        }
      }
    }
  }

  const obj5: Obj4 = {
    theme: {
      components: {
        button: {
          default: {}
        },
        spinner: {
          default: {
            color: 'secondary',
            speed: 5
          }
        }
      }
    }
  }

  it('should deep merge 2 objects properly', function () {
    const merged = deepMerge(obj1, obj2)
    expect(merged).toMatchObject({
      theme: {
        components: {
          button: {
            default: {
              color: 'secondary',
              size: 2,
              className: 'theme-1',
              shape: 'round'
            }
          },
          spinner: {
            default: {
              color: 'primary',
              speed: 3
            }
          }
        }
      }
    })

    expectType<string>(merged.theme.components.button.default.color)
    expectType<string>(merged.theme.components.button.default.className)
    expectType<string>(merged.theme.components.button.default.shape)
    expectType<number>(merged.theme.components.button.default.size)

    expectType<string>(merged.theme.components.spinner.default.color)
    expectType<number>(merged.theme.components.spinner.default.speed)
  })

  it('should deep merge wth any empty source object', function () {
    const merged = deepMerge(emptyObj, obj1)
    expect(merged).toMatchObject({
      theme: {
        components: {
          button: {
            default: {
              color: 'primary',
              size: 'sm',
              className: 'theme-1'
            }
          }
        }
      }
    })

    expectType<string>(merged.theme.components.button.default.color)
    expectType<string>(merged.theme.components.button.default.size)
    expectType<string>(merged.theme.components.button.default.className)
  })

  it('should deep merge wth any empty destination object', function () {
    const merged = deepMerge(obj2, emptyObj)
    expect(merged).toMatchObject({
      theme: {
        components: {
          button: {
            default: {
              color: 'secondary',
              size: 2,
              shape: 'round'
            }
          },
          spinner: {
            default: {
              color: 'primary',
              speed: 3
            }
          }
        }
      }
    })

    expectType<string>(merged.theme.components.button.default.color)
    expectType<number>(merged.theme.components.button.default.size)
    expectType<string>(merged.theme.components.button.default.shape)

    expectType<string>(merged.theme.components.spinner.default.color)
    expectType<number>(merged.theme.components.spinner.default.speed)
  })

  it('should not filter out nullable values', function () {
    const merged = deepMerge(obj1, obj3)
    expect(merged).toMatchObject({
      theme: {
        components: {
          button: {
            default: {
              color: 'primary',
              size: 'sm',
              speed: 1,
              className: 'theme-1'
            }
          }
        }
      }
    })

    expectType<string>(merged.theme.components.button.default.color)
    expectType<string>(merged.theme.components.button.default.size)
    expectType<number>(merged.theme.components.button.default.speed)
    expectType<string>(merged.theme.components.button.default.className)
  })

  it('should merge with destination partial object', function () {
    const merged = deepMerge(obj4, obj5)

    expect(merged).toMatchObject({
      theme: {
        components: {
          button: {
            default: {
              color: 'secondary',
              size: 2,
              shape: 'round'
            }
          },
          spinner: {
            default: {
              color: 'secondary',
              speed: 5
            }
          }
        }
      }
    })

    expectType<string>(merged.theme.components.button.default.color)
    expectType<number>(merged.theme.components.button.default.size)
    expectType<string>(merged.theme.components.button.default.shape)
    expectType<string>(merged.theme.components.spinner.default.color)
    expectType<number>(merged.theme.components.spinner.default.speed)
  })

  it('should merge with source partial object', function () {
    const merged = deepMerge(obj5, obj4)

    expect(merged).toMatchObject({
      theme: {
        components: {
          button: {
            default: {
              color: 'secondary',
              size: 2,
              shape: 'round'
            }
          },
          spinner: {
            default: {
              color: 'primary',
              speed: 3
            }
          }
        }
      }
    })

    expectType<string>(merged.theme.components.button.default.color)
    expectType<number>(merged.theme.components.button.default.size)
    expectType<string>(merged.theme.components.button.default.shape)
    expectType<string>(merged.theme.components.spinner.default.color)
    expectType<number>(merged.theme.components.spinner.default.speed)
  })
})
