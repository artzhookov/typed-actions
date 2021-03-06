/* @flow */

import {
  init,
  test,
  update,
  union,
  inter,
  arity2,
  arity3,
  errorAction,
  errorMetaAction,
} from './actions'

/**
 * ActionCreator interface tests
 */

arity2(true, false)
/**
  * $ExpectError
  *
  * Incompatible arguments type
  */
arity2('true', 'false')

arity3(true, false, true)
/**
  * $ExpectError
  *
  * Incompatible arguments type
  */
arity3('true', 'false', 'true')

inter({ a: 1, b: 1 })
inter({ x: 1 })
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
inter({ a: 1, b: 1, x: 1 })

union(1)
union('1')
union(true)
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
union()
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
union(null)
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
union({ _: {} })

init()
init(undefined)
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
init(null)

test({ data: { nestedData: 'test' } })
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
test({ data: { nestedData: 1 } })
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
test({ data: {} })


update('test')
/**
 * $ExpectError
 *
 * Incompatible argument type
 */
update(1)

{
  /**
   * $ExpectError
   *
   * Incompatible argument type
   */
  errorAction(1)

  /**
   * $ExpectError
   *
   * Incompatible argument type
   */
  errorMetaAction(1)


  const err = errorAction('test')
  const errMeta = errorMetaAction('test');

  (err: {error: true, payload: string});
  /**
   * $ExpectError
   *
   * 'error' prop should be true
   */
  (err: {error: false, payload: string});

  (errMeta: {error: true, payload: string, meta: {someData: true}});
  /**
   * $ExpectError
   *
   * 'meta' prop should be {someData: true}
   */
  (errMeta: {error: true, payload: string, meta: {someData: false}})
}
