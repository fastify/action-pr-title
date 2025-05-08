import { test, TestContext } from 'node:test'
import { validateRegex } from '../../src/lib/validate-regex'

test('validateRegex is skipped if no regex is passed', (t: TestContext) => {
  t.plan(1)
  const pullRequest = {
    title: 'valid'
  }

  const core = {
    getInput: (value: string): string => {
      t.assert.deepStrictEqual(value, 'regex')
      return ''
    },
    setFailed: (message: string): void => {
      t.assert.fail(message)
    }
  }

  validateRegex(pullRequest, core)
})

test('validateRegex should pass valid title', (t: TestContext) => {
  t.plan(1)
  const pullRequest = {
    title: 'valid'
  }

  const core = {
    getInput: (value: string): string => {
      t.assert.deepStrictEqual(value, 'regex')
      return '/^valid$/'
    },
    setFailed: (message: string): void => {
      t.assert.fail(message)
    }
  }

  validateRegex(pullRequest, core)
})

test('validateRegex should call setFailed on invalid title', (t: TestContext) => {
  t.plan(2)
  const pullRequest = {
    title: 'invalid'
  }

  const core = {
    getInput: (value: string): string => {
      t.assert.deepStrictEqual(value, 'regex')
      return '/^valid$/'
    },
    setFailed: (message: string): void => {
      t.assert.deepStrictEqual(message, `Pull Request title "${pullRequest.title}" failed to pass match regex - /^valid$/`)
    }
  }

  validateRegex(pullRequest, core)
})
